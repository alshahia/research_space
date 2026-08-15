# Reference: Pattern Examples from Working Codebase

This document shows real patterns extracted from a working project. Use these as templates when building new features.

---

## 1. Page with CRUD, Modal, and Confirm Delete

```tsx
import React, { useEffect, useState } from 'react';
import { api, SomeType, cn, playNotificationSound } from '../lib/utils';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import ConfirmModal from '../components/ConfirmModal';

export default function MyPage() {
  const [items, setItems] = useState<SomeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editItem, setEditItem] = useState<SomeType | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setItems(await api.getItems()); }
    catch (e) { console.error('Error:', e); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (editItem?.id) { await api.deleteItem(editItem.id); setIsConfirmOpen(false); loadData(); }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amin-blue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900">العناصر</h1>
        <button onClick={() => { setEditItem(null); setIsModalOpen(true); }} className="amin-btn-primary flex items-center gap-2">
          <Plus size={18} /> إضافة جديد
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Package size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">لا توجد عناصر بعد</p>
          <p className="text-sm">قم بإضافة عنصر جديد للبدء</p>
        </div>
      ) : (
        <div className="amin-card divide-y divide-slate-100">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-400">{item.code}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditItem(item); setIsModalOpen(true); }} className="p-2 bg-blue-50 text-amin-blue rounded-lg hover:bg-blue-100 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => { setEditItem(item); setIsConfirmOpen(true); }} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete} title="تأكيد الحذف" message="هل أنت متأكد من رغبتك في الحذف؟" type="danger" />
    </div>
  );
}
```

## 2. Modal with Form

```tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const MyModal = ({ isOpen, onClose, onSave, initialData }: MyModalProps) => {
  const [formData, setFormData] = useState({ name: '', code: '' });

  useEffect(() => {
    if (initialData?.id) setFormData({ name: initialData.name || '', code: initialData.code || '' });
    else setFormData({ name: '', code: '' });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900">{initialData?.id ? 'تعديل' : 'إضافة جديد'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">الاسم</label>
            <input type="text" className="amin-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">الكود</label>
            <input type="text" className="amin-input" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
          </div>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="amin-btn-secondary text-sm px-6">إلغاء</button>
          <button onClick={() => onSave(formData)} className="amin-btn-primary text-sm px-6">حفظ</button>
        </div>
      </motion.div>
    </div>
  );
};

export default MyModal;
```

## 3. API Module (WatermelonDB)

```ts
import { database } from '../../db';
import { Q } from '@nozbe/watermelondb';
import { logCreate, logUpdate, logDelete } from '../audit';

export async function getItems(): Promise<ItemType[]> {
  const records = await database.get('items').query().fetch();
  return records.map(r => ({ ...r._raw, id: r.id })) as any;
}

export async function createItem(data: Partial<ItemType>) {
  const record = await database.write(async () => {
    return await database.get('items').create((r: any) => {
      r.name = data.name;
      r.code = data.code;
    });
  });
  logCreate('Item', record.id);
  return { ...record._raw, id: record.id } as ItemType;
}

export async function updateItem(id: string, data: Partial<ItemType>) {
  const record = await database.get('items').find(id);
  const updated = await database.write(async () => {
    return await record.update((r: any) => {
      if (data.name) r.name = data.name;
      if (data.code) r.code = data.code;
    });
  });
  logUpdate('Item', id, JSON.stringify(data));
  return { ...updated._raw, id: updated.id } as ItemType;
}

export async function deleteItem(id: string) {
  const record = await database.get('items').find(id);
  await database.write(async () => { await record.markAsDeleted(); });
  logDelete('Item', id);
  return true;
}
```

## 4. Sidebar Layout Navigation

The sidebar uses `NavLink` for active state detection, grouped sections with toggle, and a mobile overlay:

```tsx
const SidebarItem = ({ to, icon, label, onClick, isSubItem }: SidebarItemProps) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
      isSubItem && "pr-10 py-2",
      isActive ? "bg-blue-50 text-amin-blue" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);
```

## 5. Animation Patterns

```tsx
import { motion, AnimatePresence } from 'motion/react';

// Entry animation
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>

// Hover effect
<motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>

// Staggered children
{items.map((item, idx) => (
  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
))}

// Modal enter/exit with AnimatePresence
<AnimatePresence>
  {isOpen && (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
    </motion.div>
  )}
</AnimatePresence>
```

## 6. WatermelonDB Model

```ts
import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Item extends Model {
  static table = 'items';

  @text('name') name!: string;
  @text('code') code!: string;
  @field('quantity') quantity!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
```

## 7. Schema Definition

```ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'items',
      columns: [
        { name: 'code', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number', isIndexed: true },
      ],
    }),
  ],
});
```

## 8. Migration Example

```ts
import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'new_table',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'created_at', type: 'number' },
            { name: 'updated_at', type: 'number', isIndexed: true },
          ],
        }),
        addColumns({
          table: 'items',
          columns: [
            { name: 'description', type: 'string', isOptional: true },
          ],
        }),
      ],
    },
  ],
});
```

## 9. Notification Context Pattern

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

const NotificationContext = createContext<any>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (n: Notification) => setNotifications(prev => [n, ...prev].slice(0, 50));
  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
```

## 10. Settings Context Pattern

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, AppSettings, DEFAULT_SETTINGS } from '../lib/utils';

const SettingsContext = createContext<any>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(console.error);
  }, []);

  const updateSettings = async (newSettings: AppSettings) => {
    await api.saveSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
```

## 11. Auto-Backup Pattern (Web + Native)

```ts
export async function tryAutoBackup(): Promise<void> {
  const interval = getAutoBackupInterval();
  if (interval <= 0) return;
  if (Date.now() - getLastBackup() < interval * 3600000) return;

  const data = await gatherBackupData();
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const filename = `backup_${new Date().toISOString().split('T')[0]}.json`;

  if (Capacitor.isNativePlatform()) {
    const { Filesystem, Directory } = await import('@capacitor/filesystem');
    await Filesystem.writeFile({ path: `backups/${filename}`, data: await blobToBase64(blob), directory: Directory.Documents });
  } else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  setLastBackup();
}
```

## 12. cn() Utility

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
