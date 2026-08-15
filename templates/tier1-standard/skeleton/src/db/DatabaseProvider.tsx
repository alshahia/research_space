// src/db/DatabaseProvider.tsx — Tier 1 standard skeleton
// ponytail: storage-adapter pattern. The provider exposes a sink seam; the spine
// ships a no-op stub. Tier2-saas-bundle wires Drizzle + Postgres here.
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { consoleAuditSink, type AuditSink } from "../lib/audit";

export interface DatabaseAdapter {
  // ponytail: storage-adapter interface. Concrete impls (Drizzle, WatermelonDB
  // opt-in, in-memory test) implement this. The spine ships the in-memory stub.
  write<T>(table: string, row: T): Promise<{ id: string }>;
  read<T>(table: string, id: string): Promise<T | null>;
  list<T>(table: string): Promise<T[]>;
}

export interface DatabaseContextValue {
  adapter: DatabaseAdapter;
  audit: AuditSink;
}

const defaultValue: DatabaseContextValue = {
  // ponytail: in-memory stub for the spine. No network, no Drizzle. Tier2 swaps
  // in the real adapter.
  adapter: {
    async write() {
      return { id: crypto.randomUUID() };
    },
    async read() {
      return null;
    },
    async list() {
      return [];
    },
  },
  audit: consoleAuditSink,
};

const DatabaseContext = createContext<DatabaseContextValue>(defaultValue);

export interface DatabaseProviderProps {
  children: ReactNode;
  adapter?: DatabaseAdapter;
  audit?: AuditSink;
}

export function DatabaseProvider({
  children,
  adapter,
  audit,
}: DatabaseProviderProps): ReactNode {
  const value = useMemo<DatabaseContextValue>(
    () => ({ adapter: adapter ?? defaultValue.adapter, audit: audit ?? defaultValue.audit }),
    [adapter, audit],
  );
  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}

export function useDatabase(): DatabaseContextValue {
  return useContext(DatabaseContext);
}
