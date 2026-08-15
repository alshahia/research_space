# Showcase Website Product — Design Document

**Date:** 2026-07-12
**Status:** Draft
**Version:** 0.1

---

## 1. Overview

A **white-label showcase website product** built on Laravel + Filament, designed to be sold to small and medium businesses (restaurants, factories, shops, salons, clinics, etc.) as a complete brochure/showcase website with a built-in CMS.

### Product model
- **License fee** (one-time): $200–500 per client (includes installation + demo content setup)
- **Hosting + maintenance** (recurring): $15–25/month per client
- **Code**: Single codebase deployed as separate instances, one per client

---

## 2. Pages & Features

| Page | Content |
|---|---|
| **Home** | Hero slider, brief intro, products/services grid, stats (years, clients, employees), CTA to contact |
| **About** | Business story, images, mission/vision, team (optional) |
| **Products / Services** | Filterable catalog with categories, each item has: images, description, optional price/size/specifications |
| **Gallery** | Image + video grid |
| **Certificates / Awards** | Certifications and licenses with images |
| **Activity / News** | (Optional) Posts or updates from the business |
| **Contact** | Contact form, Google Maps embed, phone, email, address |
| **Extra static pages** | Created by client via admin panel (unlimited) |

### Every page supports:
- SEO meta (title, description, Open Graph)
- Full RTL support (Arabic, Kurdish)

### Global features:
- **Multi-language**: Arabic, English, Kurdish (configurable per client)
- **Social links**: Instagram, Facebook, YouTube, WhatsApp, Telegram, etc. — configured from Settings
- **Responsive design** (Tailwind CSS)
- **Fast loading** (Blade templates, no heavy page builders)

---

## 3. Data Model

### Tables

**`pages`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| title | json | Translated (en/ar/ckb) |
| slug | string | Unique per language |
| content | json | Array of blocks (see Page Builder below) |
| meta_title | json | Translated, nullable |
| meta_description | json | Translated, nullable |
| is_home | boolean | Only one home page |
| status | enum | published / draft |
| order | integer | For menu ordering |
| created_at / updated_at | timestamps | |

**`categories`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| name | json | Translated |
| slug | string | Unique |
| description | json | Translated, nullable |
| image | string | Nullable |
| order | integer | |

**`products`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| title | json | Translated |
| slug | string | Unique |
| description | json | Translated |
| price | decimal | Nullable (optional) |
| category_id | foreignId | FK to categories |
| specifications | json | Key-value pairs: `[{key: "Weight", value: "800g"}]` |
| images | json | Array of image paths (via Spatie Media Library) |
| status | enum | published / draft |
| order | integer | |

**`gallery_items`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| image | string | |
| video_url | string | Nullable |
| caption | json | Translated, nullable |
| type | enum | image / video |
| order | integer | |

**`certificates`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| title | json | Translated |
| image | string | |
| description | json | Translated, nullable |
| order | integer | |

**`settings`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| key | string | Unique |
| value | json | Flexible value storage |

Settings keys: `site_name`, `logo`, `favicon`, `primary_color`, `phone`, `email`, `address`, `google_maps_url`, `social_links`, `languages`, `footer_text`

**`contacts`**
| Column | Type | Notes |
|---|---|---|
| id | bigint | PK |
| name | string | |
| email | string | |
| phone | string | Nullable |
| message | text | |
| read_at | timestamp | Nullable |

---

## 4. Page Builder (Block System)

Each page's `content` field stores an array of typed blocks. The frontend renders them sequentially.

### Block types

| Block Type | Fields |
|---|---|
| `hero` | background_image, title, subtitle, button_text, button_link |
| `text` | content (HTML / rich text) |
| `image_grid` | images[], columns (2/3/4) |
| `products_grid` | category_id (or "all"), max_items |
| `stats` | stats[]: { number, label, icon? } |
| `gallery` | (displays all gallery items) |
| `contact_form` | (renders the contact form) |
| `certificates` | (displays all certificates) |
| `video` | url, caption |
| `divider` | (spacer / separator) |
| `cta_banner` | background_image, text, button_text, button_link |

### Admin experience (Filament)
- Drag-and-drop reordering of blocks
- Each block has its own form fields (dynamic, based on type)
- Preview inline or in a new tab

---

## 5. Admin Panel (Filament Resources)

| Resource | Features |
|---|---|
| **Dashboard** | Widgets: total products, unread messages, quick stats |
| **Pages** | CRUD, block-based editor, homepage toggle, menu order |
| **Products** | CRUD, image upload (multiple), category select, specification builder (repeater), status toggle |
| **Categories** | CRUD, icon/image upload |
| **Gallery** | Image upload with dropzone, video URL, drag-to-reorder |
| **Certificates** | Image upload, title, description |
| **Contact Messages** | Read/unread filter, reply modal (optional), export |
| **Menu Builder** | Reorder pages, add external links (custom label + URL) |
| **Settings** | Tabbed form: General, Contact, Social Media, Appearance (colors, logo), Languages |
| **Languages** | Toggle on/off for supported languages |

---

## 6. Multi-languages

Using `spatie/laravel-translatable`:
- Key fields (title, description, content, etc.) store JSON: `{"en": "value", "ar": "قيمة", "ckb": "نرخ"}`
- Frontend reads from URL prefix: `example.com/en/`, `example.com/ar/`, `example.com/ckb/`
- Route macro for localized slugs
- Fallback: if a translation is missing, show default language

### Language switcher
Dropdown in the site header. Client can enable/disable languages from Settings.

---

## 7. Frontend Architecture

### Stack
- **Templating**: Laravel Blade
- **Styling**: Tailwind CSS (custom build per client via config)
- **Interactivity**: Alpine.js (lightweight, dropdowns, tabs, modals)
- **Icons**: Blade SVG icons or Heroicons

### Theme customization (per client)
- `primary_color` → Tailwind config + CSS variables
- `logo` → from Settings
- `fonts` → configurable from Settings (Google Fonts URL)

### Performance
- Blade views cached (`php artisan view:cache`)
- Public pages cached via `spatie/laravel-responsecache` (optional)
- Images served via Spatie Media Library with conversions (thumbnails, responsive sizes)

---

## 8. Multi-tenancy Strategy

**Separate instances model** — every client gets:
- A dedicated directory on the server
- A dedicated MySQL database
- Environment-specific `.env`

### Provisioning flow for a new client:
```bash
# As a script or manual steps:
git clone <repo> /var/www/<client-slug>/
cd /var/www/<client-slug>/
composer install --no-dev
cp .env.example .env
# Edit .env: DB_DATABASE, DB_USER, DB_PASSWORD, APP_URL, APP_NAME
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan filament:user  # Create admin account
# Create Nginx vhost + SSL via Certbot
```

### Central management
- Optional: A **master dashboard** that lists all client sites, checks health, and shows disk usage
- Optional: `php artisan client:update` — pull latest code and run migrations for all sites

---

## 9. Deployment & Hosting

### Recommended server spec (for up to 20 sites)
- **VPS**: $20–40/month (Hetzner CCX13 or DigitalOcean Premium)
- **OS**: Ubuntu 22.04 LTS
- **Web server**: Nginx + PHP 8.2 FPM
- **Database**: MariaDB / MySQL 8
- **PHP extensions**: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, GD, Imagick
- **SSL**: Let's Encrypt (Certbot, auto-renewal)
- **Queue**: Supervisor (for email queue, image conversions)

### Monitoring
- Basic: Uptime check (Pingdom / UptimeRobot free tier)
- Per-site: Laravel log rotation + simple health endpoint

---

## 10. Pricing Model (Recommended)

| Component | Price | Type |
|---|---|---|
| License + Installation | $300–500 | One-time |
| Hosting + Maintenance | $20–25/month | Recurring |
| Custom design work | $100–300 | One-time (per request) |
| SSL + Domain management | $20/year | Pass-through |

### Projected revenue at 15 clients:
- **Setup:** 15 × $400 = $6,000 (one-time)
- **Monthly:** 15 × $20 = $300/month → $3,600/year
- **Year 1 total:** ~$9,600

---

## 11. What's NOT included (scope boundaries)

- ❌ No e-commerce / shopping cart
- ❌ No online payments
- ❌ No booking/reservation system (could be future add-on)
- ❌ No user registration for site visitors
- ❌ No blog / news system with complex workflows (simple Activity/News section if needed)
- ❌ No multi-tenant SaaS dashboard (separate instances only)

---

## 12. Technology Stack Summary

| Layer | Technology |
|---|---|
| Backend Framework | Laravel 11+ |
| Admin Panel | Filament v3 |
| Frontend | Blade + Tailwind CSS + Alpine.js |
| Database | MySQL / MariaDB |
| File Storage | Local (S3 optional) |
| Image Handling | Spatie Laravel MediaLibrary |
| Translations | Spatie Laravel Translatable |
| Localization | mcamara/laravel-localization |
| Server | Ubuntu + Nginx + PHP 8.2 FPM |
| Cache | Laravel Cache (file/redis) + Response Cache |

---

## 13. Next Steps

1. ✅ Design approved
2. 🔲 Build the Laravel + Filament base project
3. 🔲 Implement data models + migrations
4. 🔲 Build Filament resources (admin panel)
5. 🔲 Build frontend Blade components + Tailwind theme
6. 🔲 Implement block-based page builder
7. 🔲 Implement multi-language system
8. 🔲 Add SEO meta fields
9. 🔲 Create provisioning script
10. 🔲 Test with demo content
11. 🔲 Package as product (installation guide + scripts)
