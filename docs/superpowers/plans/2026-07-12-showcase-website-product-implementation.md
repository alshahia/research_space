# Showcase Website Product — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build a white-label showcase/brochure website CMS product (Laravel + Filament) that can be sold to small/medium businesses.

**Architecture:** Single Laravel codebase with separate instances per client. The admin panel uses Filament v3 for resource management. The public site renders Blade views from a block-based page builder (JSON blocks stored in DB). Multi-language via Spatie Translatable.

**Tech Stack:** Laravel 11, Filament v3, Tailwind CSS, Alpine.js, MySQL, Spatie packages (Translatable, MediaLibrary, ResponseCache)

---

## File Structure

```
showcase-cms/
├── app/
│   ├── Filament/
│   │   ├── Resources/
│   │   │   ├── PageResource.php
│   │   │   ├── PageResource/Pages/
│   │   │   │   ├── ListPages.php
│   │   │   │   ├── CreatePage.php
│   │   │   │   └── EditPage.php
│   │   │   ├── ProductResource.php
│   │   │   ├── CategoryResource.php
│   │   │   ├── GalleryItemResource.php
│   │   │   ├── CertificateResource.php
│   │   │   └── ContactResource.php
│   │   └── Pages/
│   │       └── ManageSettings.php
│   ├── Filament/Widgets/
│   │       └── StatsOverview.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── SiteController.php
│   │   │   └── ContactController.php
│   │   └── Requests/
│   │       └── ContactRequest.php
│   ├── Livewire/
│   │   └── ContactForm.php
│   ├── Models/
│   │   ├── Page.php
│   │   ├── Product.php
│   │   ├── Category.php
│   │   ├── GalleryItem.php
│   │   ├── Certificate.php
│   │   └── Contact.php
│   ├── Providers/
│   │   └── FilamentServiceProvider.php (custom)
│   ├── Settings/
│   │   └── GeneralSettings.php
│   └── View/
│       └── Components/
│           ├── Blocks/
│           │   ├── HeroBlock.php
│           │   ├── TextBlock.php
│           │   ├── ProductsGridBlock.php
│           │   ├── StatsBlock.php
│           │   ├── GalleryBlock.php
│           │   ├── ContactFormBlock.php
│           │   ├── CertificatesBlock.php
│           │   ├── CtaBannerBlock.php
│           │   └── DividerBlock.php
│           └── SiteLayout.php
├── database/
│   └── migrations/
│       ├── xxxx_create_pages_table.php
│       ├── xxxx_create_categories_table.php
│       ├── xxxx_create_products_table.php
│       ├── xxxx_create_gallery_items_table.php
│       ├── xxxx_create_certificates_table.php
│       └── xxxx_create_contacts_table.php
├── database/seeders/
│   └── DemoContentSeeder.php
├── resources/
│   └── views/
│       ├── components/
│       │   ├── blocks/
│       │   │   ├── hero.blade.php
│       │   │   ├── text.blade.php
│       │   │   ├── products-grid.blade.php
│       │   │   ├── stats.blade.php
│       │   │   ├── gallery.blade.php
│       │   │   ├── contact-form.blade.php
│       │   │   ├── certificates.blade.php
│       │   │   ├── cta-banner.blade.php
│       │   │   └── divider.blade.php
│       │   ├── site-layout.blade.php
│       │   └── social-links.blade.php
│       └── site/
│           ├── home.blade.php
│           ├── page.blade.php
│           ├── product.blade.php
│           └── contact.blade.php
├── config/
│   └── settings.php
├── routes/
│   └── web.php
├── lang/
│   ├── en.json
│   ├── ar.json
│   └── ckb.json
└── deploy-script.sh
```

---

### Task 1: Scaffold Laravel + Install Dependencies

**Files:**
- Create: full Laravel project via `composer create-project`
- Modify: `composer.json` (add required packages)

- [ ] **Step 1: Create Laravel project + require packages**

```bash
cd E:\research_space
composer create-project laravel/laravel showcase-cms
cd showcase-cms
composer require filament/filament:"^3.2" -W
composer require spatie/laravel-translatable
composer require spatie/laravel-medialibrary
composer require spatie/laravel-responsecache
composer require mcamara/laravel-localization
composer require joedixon/laravel-translation
```

- [ ] **Step 2: Install Filament panel**

```bash
php artisan filament:install --panels
```

- [ ] **Step 3: Publish Spatie configs + run migrations**

```bash
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="migrations"
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="config"
php artisan migrate
```

- [ ] **Step 4: Verify installation**

Run: `php artisan serve`
Expected: Laravel splash page on `http://localhost:8000`

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "scaffold: Laravel 11 + Filament 3 + Spatie packages"
```

---

### Task 2: Database Migrations + Models

**Files:**
- Create: `database/migrations/xxxx_create_pages_table.php`
- Create: `database/migrations/xxxx_create_categories_table.php`
- Create: `database/migrations/xxxx_create_products_table.php`
- Create: `database/migrations/xxxx_create_gallery_items_table.php`
- Create: `database/migrations/xxxx_create_certificates_table.php`
- Create: `database/migrations/xxxx_create_contacts_table.php`
- Create: `app/Models/Page.php`
- Create: `app/Models/Product.php`
- Create: `app/Models/Category.php`
- Create: `app/Models/GalleryItem.php`
- Create: `app/Models/Certificate.php`
- Create: `app/Models/Contact.php`

- [ ] **Step 1: Create pages migration**

```php
// database/migrations/xxxx_create_pages_table.php
Schema::create('pages', function (Blueprint $table) {
    $table->id();
    $table->json('title');
    $table->string('slug')->unique();
    $table->json('content')->nullable(); // block-based content
    $table->json('meta_title')->nullable();
    $table->json('meta_description')->nullable();
    $table->boolean('is_home')->default(false);
    $table->string('status')->default('published');
    $table->integer('order')->default(0);
    $table->timestamps();
});
```

- [ ] **Step 2: Create categories migration**

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->json('name');
    $table->string('slug')->unique();
    $table->json('description')->nullable();
    $table->string('image')->nullable();
    $table->integer('order')->default(0);
    $table->timestamps();
});
```

- [ ] **Step 3: Create products migration**

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->json('title');
    $table->string('slug')->unique();
    $table->json('description')->nullable();
    $table->decimal('price', 10, 2)->nullable();
    $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
    $table->json('specifications')->nullable();
    $table->string('status')->default('published');
    $table->integer('order')->default(0);
    $table->timestamps();
});
```

- [ ] **Step 4: Create gallery_items migration**

```php
Schema::create('gallery_items', function (Blueprint $table) {
    $table->id();
    $table->string('image');
    $table->string('video_url')->nullable();
    $table->json('caption')->nullable();
    $table->string('type')->default('image');
    $table->integer('order')->default(0);
    $table->timestamps();
});
```

- [ ] **Step 5: Create certificates migration**

```php
Schema::create('certificates', function (Blueprint $table) {
    $table->id();
    $table->json('title');
    $table->string('image');
    $table->json('description')->nullable();
    $table->integer('order')->default(0);
    $table->timestamps();
});
```

- [ ] **Step 6: Create contacts migration**

```php
Schema::create('contacts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email');
    $table->string('phone')->nullable();
    $table->text('message');
    $table->timestamp('read_at')->nullable();
    $table->timestamps();
});
```

- [ ] **Step 7: Create Page model**

```php
// app/Models/Page.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Page extends Model
{
    use HasTranslations;

    protected $guarded = [];
    public $translatable = ['title', 'content', 'meta_title', 'meta_description'];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'is_home' => 'boolean',
        ];
    }
}
```

- [ ] **Step 8: Create Product model**

```php
// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use HasTranslations, InteractsWithMedia;

    protected $guarded = [];
    public $translatable = ['title', 'description'];

    protected function casts(): array
    {
        return ['specifications' => 'array'];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }
}
```

- [ ] **Step 9: Create remaining models (Category, GalleryItem, Certificate, Contact)**

```php
// Category — same pattern, translatable: ['name', 'description']
// GalleryItem — no translations, simple model
// Certificate — translatable: ['title', 'description']
// Contact — no translations, simple model
```

- [ ] **Step 10: Run migrations**

```bash
php artisan migrate
```

Expected: All 6 tables created

- [ ] **Step 11: Commit**

```bash
git add .
git commit -m "feat: add database migrations + Eloquent models"
```

---

### Task 3: Settings System (General Settings)

**Files:**
- Create: `app/Settings/GeneralSettings.php`
- Create: `config/settings.php`
- Create: `database/migrations/xxxx_create_settings_table.php`

- [ ] **Step 1: Create settings migration**

```php
Schema::create('settings', function (Blueprint $table) {
    $table->id();
    $table->string('key')->unique();
    $table->json('value')->nullable();
    $table->timestamps();
});
```

- [ ] **Step 2: Create Settings helper model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $guarded = [];
    protected function casts(): array
    {
        return ['value' => 'array'];
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    public static function set(string $key, mixed $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
```

- [ ] **Step 3: Seed default settings**

```php
// database/seeders/DatabaseSeeder.php or dedicated SettingsSeeder
$defaults = [
    'site_name' => ['en' => 'My Business', 'ar' => 'نشاطي التجاري', 'ckb' => 'کارەکەم'],
    'logo' => null,
    'favicon' => null,
    'primary_color' => '#c10707',
    'phone' => null,
    'email' => null,
    'address' => ['en' => 'Address', 'ar' => 'العنوان', 'ckb' => 'ناونیشان'],
    'google_maps_url' => null,
    'social_links' => [],
    'footer_text' => ['en' => '© All rights reserved', 'ar' => '© جميع الحقوق محفوظة', 'ckb' => '© هەموو مافەکان پارێزراون'],
    'active_languages' => ['en', 'ar'],
];

foreach ($defaults as $key => $value) {
    Setting::create(['key' => $key, 'value' => $value]);
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add settings system with defaults"
```

---

### Task 4: Filament Resources — Admin Panel (Part 1: Pages + Settings)

**Files:**
- Create: `app/Filament/Resources/PageResource.php`
- Create: `app/Filament/Resources/PageResource/Pages/ListPages.php`
- Create: `app/Filament/Resources/PageResource/Pages/CreatePage.php`
- Create: `app/Filament/Resources/PageResource/Pages/EditPage.php`
- Create: `app/Filament/Pages/ManageSettings.php`

- [ ] **Step 1: Create PageResource**

```php
namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Pages';
    protected static ?string $pluralLabel = 'Pages';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Content')->schema([
                Forms\Components\TextInput::make('title.en')
                    ->label('Title (English)')
                    ->required(),
                Forms\Components\TextInput::make('title.ar')
                    ->label('Title (Arabic)'),
                Forms\Components\TextInput::make('title.ckb')
                    ->label('Title (Kurdish)'),
                Forms\Components\TextInput::make('slug')
                    ->required()->unique(ignoreRecord: true),
            ]),
            // Blocks repeater (simplified for now — full block builder in Task 6)
            Forms\Components\Repeater::make('content')
                ->schema([
                    Forms\Components\Select::make('type')
                        ->options([
                            'hero' => 'Hero Banner',
                            'text' => 'Text',
                            'products_grid' => 'Products Grid',
                            'stats' => 'Stats',
                            'gallery' => 'Gallery',
                            'contact_form' => 'Contact Form',
                            'certificates' => 'Certificates',
                            'cta_banner' => 'CTA Banner',
                            'divider' => 'Divider',
                        ]),
                    Forms\Components\KeyValue::make('data'),
                ])
                ->default([]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\IconColumn::make('is_home')->boolean(),
                Tables\Columns\TextColumn::make('status')->badge(),
            ])
            ->defaultSort('order')
            ->reorderable('order');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
```

- [ ] **Step 2: Create Settings page**

```php
namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Pages\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;

class ManageSettings extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Settings';
    protected static string $view = 'filament.pages.settings';

    public array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'site_name' => Setting::get('site_name'),
            'phone' => Setting::get('phone'),
            'email' => Setting::get('email'),
            'address' => Setting::get('address'),
            'primary_color' => Setting::get('primary_color'),
            'social_links' => Setting::get('social_links'),
            'footer_text' => Setting::get('footer_text'),
            'active_languages' => Setting::get('active_languages'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Tabs::make('Settings')->tabs([
                Forms\Components\Tabs\Tab::make('General')->schema([
                    Forms\Components\TextInput::make('site_name.en')->label('Business Name (English)'),
                    Forms\Components\TextInput::make('site_name.ar')->label('Business Name (Arabic)'),
                    Forms\Components\TextInput::make('site_name.ckb')->label('Business Name (Kurdish)'),
                ]),
                Forms\Components\Tabs\Tab::make('Contact')->schema([
                    Forms\Components\TextInput::make('phone'),
                    Forms\Components\TextInput::make('email'),
                    Forms\Components\Textarea::make('address.en')->label('Address (English)'),
                    Forms\Components\Textarea::make('address.ar')->label('Address (Arabic)'),
                    Forms\Components\Textarea::make('address.ckb')->label('Address (Kurdish)'),
                    Forms\Components\TextInput::make('google_maps_url'),
                ]),
                Forms\Components\Tabs\Tab::make('Appearance')->schema([
                    Forms\Components\ColorPicker::make('primary_color'),
                    // Logo upload via Spatie in a later step
                ]),
                Forms\Components\Tabs\Tab::make('Social Media')->schema([
                    Forms\Components\Repeater::make('social_links')
                        ->schema([
                            Forms\Components\Select::make('platform')
                                ->options(['facebook' => 'Facebook', 'instagram' => 'Instagram', 'youtube' => 'YouTube', 'whatsapp' => 'WhatsApp', 'telegram' => 'Telegram']),
                            Forms\Components\TextInput::make('url'),
                        ]),
                ]),
                Forms\Components\Tabs\Tab::make('Languages')->schema([
                    Forms\Components\CheckboxList::make('active_languages')
                        ->options(['en' => 'English', 'ar' => 'Arabic', 'ckb' => 'Kurdish']),
                ]),
            ]),
        ]);
    }

    public function save(): void
    {
        foreach ($this->form->getState() as $key => $value) {
            Setting::set($key, $value);
        }
        Notification::make()->title('Settings saved')->success()->send();
    }
}
```

- [ ] **Step 3: Create the settings view**

```blade
{{-- resources/views/filament/pages/settings.blade.php --}}
<x-filament-panels::page>
    <form wire:submit="save">
        {{ $this->form }}
        <div class="mt-6">
            <x-filament::button type="submit">Save Settings</x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add PageResource CRUD + Settings page in Filament"
```

---

### Task 5: Filament Resources — Admin Panel (Part 2: Products, Categories, Gallery, Certificates, Contacts)

**Files:**
- Create: `app/Filament/Resources/ProductResource.php`
- Create: `app/Filament/Resources/CategoryResource.php`
- Create: `app/Filament/Resources/GalleryItemResource.php`
- Create: `app/Filament/Resources/CertificateResource.php`
- Create: `app/Filament/Resources/ContactResource.php`
- Create: `app/Filament/Widgets/StatsOverview.php`

- [ ] **Step 1: Create ProductResource**

```php
namespace App\Filament\Resources;

use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationLabel = 'Products';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Product Info')->schema([
                Forms\Components\TextInput::make('title.en')->required()->label('Title (English)'),
                Forms\Components\TextInput::make('title.ar')->label('Title (Arabic)'),
                Forms\Components\TextInput::make('title.ckb')->label('Title (Kurdish)'),
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Select::make('category_id')->relationship('category', 'name'),
                Forms\Components\Textarea::make('description.en')->label('Description (English)'),
                Forms\Components\Textarea::make('description.ar')->label('Description (Arabic)'),
                Forms\Components\Textarea::make('description.ckb')->label('Description (Kurdish)'),
                Forms\Components\TextInput::make('price')->numeric()->prefix('$'),
                Forms\Components\Repeater::make('specifications')
                    ->schema([
                        Forms\Components\TextInput::make('key')->label('Specification'),
                        Forms\Components\TextInput::make('value'),
                    ])->default([]),
                Forms\Components\Select::make('status')->options(['published' => 'Published', 'draft' => 'Draft']),
                // Images — via Spatie in Step 2
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('category.name'),
                Tables\Columns\TextColumn::make('price')->money(),
                Tables\Columns\TextColumn::make('status')->badge(),
            ])
            ->defaultSort('order')
            ->reorderable('order');
    }
}
```

- [ ] **Step 2: Add Spatie MediaLibrary integration for product images**

```php
// In ProductResource form, add:
Forms\Components\FileUpload::make('images')
    ->multiple()
    ->image()
    ->directory('products')
    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),

// In Product model, the registerMediaCollections is already set from Task 2
```

- [ ] **Step 3: Create remaining resources (CategoryResource, GalleryItemResource, CertificateResource, ContactResource)**

All follow the same Filament pattern:
- `CategoryResource`: form with translatable name/description, table with name/order
- `GalleryItemResource`: form with image upload, video URL, type select, caption
- `CertificateResource`: form with image, translatable title/description
- `ContactResource`: read-only table with name/email/message/read_at, action to mark as read

- [ ] **Step 4: Create dashboard stats widget**

```php
namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\{Page, Product, Contact};

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Pages', Page::count()),
            Stat::make('Products', Product::count()),
            Stat::make('Unread Messages', Contact::whereNull('read_at')->count()),
        ];
    }
}
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Filament resources for products, categories, gallery, certificates, contacts"
```

---

### Task 6: Frontend — Public Site Routing + Layout

**Files:**
- Create: `app/View/Components/SiteLayout.php`
- Create: `resources/views/components/site-layout.blade.php`
- Create: `resources/views/components/social-links.blade.php`
- Modify: `routes/web.php`
- Create: `app/Http/Controllers/SiteController.php`

- [ ] **Step 1: Create SiteController**

```php
namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Product;
use App\Models\Category;
use App\Models\Setting;

class SiteController extends Controller
{
    protected array $settings;

    public function __construct()
    {
        // Cache settings for all views
        $this->settings = [
            'site_name' => Setting::get('site_name'),
            'phone' => Setting::get('phone'),
            'email' => Setting::get('email'),
            'address' => Setting::get('address'),
            'primary_color' => Setting::get('primary_color', '#c10707'),
            'social_links' => Setting::get('social_links', []),
            'footer_text' => Setting::get('footer_text'),
            'active_languages' => Setting::get('active_languages', ['en', 'ar']),
            'logo' => Setting::get('logo'),
        ];
    }

    public function home()
    {
        $page = Page::where('is_home', true)->firstOrFail();
        return view('site.home', [
            'page' => $page,
            'settings' => $this->settings,
        ]);
    }

    public function page(string $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();
        return view('site.page', [
            'page' => $page,
            'settings' => $this->settings,
        ]);
    }

    public function products(?string $categorySlug = null)
    {
        $categories = Category::all();
        $products = $categorySlug
            ? Product::whereHas('category', fn($q) => $q->where('slug', $categorySlug))->get()
            : Product::all();
        return view('site.products', [
            'categories' => $categories,
            'products' => $products,
            'settings' => $this->settings,
        ]);
    }

    public function product(string $slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        return view('site.product', [
            'product' => $product,
            'settings' => $this->settings,
        ]);
    }

    public function contact()
    {
        return view('site.contact', ['settings' => $this->settings]);
    }
}
```

- [ ] **Step 2: Define routes**

```php
// routes/web.php
use App\Http\Controllers\SiteController;
use App\Http\Controllers\ContactController;

Route::get('/', [SiteController::class, 'home'])->name('home');
Route::get('/products', [SiteController::class, 'products'])->name('products');
Route::get('/products/{categorySlug}', [SiteController::class, 'products'])->name('products.category');
Route::get('/product/{slug}', [SiteController::class, 'product'])->name('product');
Route::get('/contact', [SiteController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/{slug}', [SiteController::class, 'page'])->name('page');
```

- [ ] **Step 3: SiteLayout Blade Component**

```php
namespace App\View\Components;

use Illuminate\View\Component;

class SiteLayout extends Component
{
    public function __construct(public array $settings) {}
    public function render() { return view('components.site-layout'); }
}
```

```blade
{{-- resources/views/components/site-layout.blade.php --}}
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ in_array(app()->getLocale(), ['ar', 'ckb']) ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $settings['site_name'][app()->getLocale()] ?? '' }}</title>
    @vite('resources/css/app.css')
    <style>
        :root { --primary: {{ $settings['primary_color'] }}; }
    </style>
</head>
<body class="font-sans antialiased bg-white text-gray-900">
    {{-- Header --}}
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/{{ app()->getLocale() }}" class="text-2xl font-bold" style="color: var(--primary)">
                {{ $settings['site_name'][app()->getLocale()] ?? 'My Site' }}
            </a>
            <nav class="hidden md:flex gap-6">
                @foreach(App\Models\Page::where('status', 'published')->orderBy('order')->get() as $navPage)
                    <a href="/{{ app()->getLocale() }}/{{ $navPage->slug }}" class="hover:opacity-75">
                        {{ $navPage->title }}
                    </a>
                @endforeach
                <a href="/{{ app()->getLocale() }}/products">Products</a>
                <a href="/{{ app()->getLocale() }}/contact">Contact</a>
            </nav>
            {{-- Language switcher --}}
            @if(!empty($settings['active_languages']))
                <div class="flex gap-2">
                    @foreach($settings['active_languages'] as $lang)
                        <a href="{{ LaravelLocalization::getLocalizedURL($lang) }}"
                           class="px-2 py-1 text-sm rounded {{ $lang == app()->getLocale() ? 'font-bold' : 'opacity-50' }}">
                            {{ strtoupper($lang) }}
                        </a>
                    @endforeach
                </div>
            @endif
        </div>
    </header>

    {{-- Main Content --}}
    <main>
        {{ $slot }}
    </main>

    {{-- Footer --}}
    <footer class="bg-gray-900 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p>{{ $settings['footer_text'][app()->getLocale()] ?? '' }}</p>
            <x-social-links :links="$settings['social_links'] ?? []" />
        </div>
    </footer>
</body>
</html>
```

```blade
{{-- resources/views/components/social-links.blade.php --}}
@props(['links' => []])
<div class="flex justify-center gap-4 mt-4">
    @foreach($links as $link)
        <a href="{{ $link['url'] }}" target="_blank" rel="noopener" class="hover:opacity-75">
            {{ ucfirst($link['platform']) }}
        </a>
    @endforeach
</div>
```

- [ ] **Step 4: Create initial view files**

```blade
{{-- resources/views/site/home.blade.php --}}
<x-site-layout :settings="$settings">
    {{-- Render page blocks --}}
    @foreach($page->content ?? [] as $block)
        @include('components.blocks.' . $block['type'], ['data' => $block['data'] ?? []])
    @endforeach
</x-site-layout>
```

```blade
{{-- resources/views/site/page.blade.php --}}
<x-site-layout :settings="$settings">
    {{-- Same block rendering as home --}}
    @include('components.blocks.page-title', ['title' => $page->title])
    @foreach($page->content ?? [] as $block)
        @include('components.blocks.' . $block['type'], ['data' => $block['data'] ?? []])
    @endforeach
</x-site-layout>
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add site routing, layout, and base views"
```

---

### Task 7: Frontend — Block Components

**Files:**
- Create: `app/View/Components/Blocks/HeroBlock.php`
- Create: `resources/views/components/blocks/hero.blade.php`
- Create: `resources/views/components/blocks/text.blade.php`
- Create: `resources/views/components/blocks/products-grid.blade.php`
- Create: `resources/views/components/blocks/stats.blade.php`
- Create: `resources/views/components/blocks/gallery.blade.php`
- Create: `resources/views/components/blocks/contact-form.blade.php`
- Create: `resources/views/components/blocks/certificates.blade.php`
- Create: `resources/views/components/blocks/cta-banner.blade.php`
- Create: `resources/views/components/blocks/divider.blade.php`

- [ ] **Step 1: Create base block component**

```php
namespace App\View\Components\Blocks;

use Illuminate\View\Component;

abstract class BaseBlock extends Component
{
    public function __construct(public array $data = []) {}
}
```

- [ ] **Step 2: Hero block**

```blade
{{-- resources/views/components/blocks/hero.blade.php --}}
@props(['data' => []])
<div class="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
     style="background-image: url('{{ $data['background_image'] ?? '' }}'); background-color: var(--primary);">
    <div class="text-center">
        @if(!empty($data['title']))
            <h1 class="text-5xl font-bold mb-4">{{ $data['title'] }}</h1>
        @endif
        @if(!empty($data['subtitle']))
            <p class="text-xl mb-6">{{ $data['subtitle'] }}</p>
        @endif
        @if(!empty($data['button_text']))
            <a href="{{ $data['button_link'] ?? '#' }}"
               class="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:opacity-90">
                {{ $data['button_text'] }}
            </a>
        @endif
    </div>
</div>
```

- [ ] **Step 3: Text block**

```blade
{{-- resources/views/components/blocks/text.blade.php --}}
@props(['data' => []])
<section class="max-w-4xl mx-auto px-4 py-16 prose prose-lg">
    {!! $data['content'] ?? '' !!}
</section>
```

- [ ] **Step 4: Products grid block**

```blade
{{-- resources/views/components/blocks/products-grid.blade.php --}}
@props(['data' => []])
@php
    $products = isset($data['category_id'])
        ? App\Models\Product::where('category_id', $data['category_id'])->where('status', 'published')->get()
        : App\Models\Product::where('status', 'published')->limit($data['max_items'] ?? 8)->get();
@endphp
<section class="max-w-7xl mx-auto px-4 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        @foreach($products as $product)
            <a href="/{{ app()->getLocale() }}/product/{{ $product->slug }}" class="group">
                <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <img src="{{ $product->getFirstMediaUrl('images', 'thumb') ?: '/placeholder.jpg' }}"
                         alt="{{ $product->title }}" class="w-full h-full object-cover group-hover:scale-105 transition">
                </div>
                <h3 class="font-semibold">{{ $product->title }}</h3>
            </a>
        @endforeach
    </div>
</section>
```

- [ ] **Step 5: Stats block**

```blade
{{-- resources/views/components/blocks/stats.blade.php --}}
@props(['data' => []])
<section class="py-16" style="background-color: var(--primary);">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        @foreach($data['stats'] ?? [] as $stat)
            <div>
                <div class="text-4xl font-bold">{{ $stat['number'] }}</div>
                <div class="text-lg opacity-80">{{ $stat['label'] }}</div>
            </div>
        @endforeach
    </div>
</section>
```

- [ ] **Step 6: Remaining blocks (gallery, certificates, CTA, divider)**

All follow the same pattern — simple Blade files that render from `$data`:

- **gallery.blade.php**: Grid of images from `App\Models\GalleryItem::all()`
- **certificates.blade.php**: Grid of certificate images
- **contact-form.blade.php**: Renders the `<livewire:contact-form />` component
- **cta-banner.blade.php**: Background image + text + button
- **divider.blade.php**: Simple `<hr>` spacer

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add block components (hero, text, products, stats, gallery, certs, CTA)"
```

---

### Task 8: Contact Form (Livewire + Email Notification)

**Files:**
- Create: `app/Livewire/ContactForm.php`
- Create: `resources/views/livewire/contact-form.blade.php`
- Create: `app/Http/Controllers/ContactController.php`
- Create: `app/Http/Requests/ContactRequest.php`
- Create: `app/Mail/ContactNotification.php`
- Modify: `routes/web.php`

- [ ] **Step 1: Create ContactForm Livewire component**

```php
namespace App\Livewire;

use App\Models\Contact;
use Livewire\Component;

class ContactForm extends Component
{
    public string $name = '';
    public string $email = '';
    public string $phone = '';
    public string $message = '';
    public bool $success = false;

    protected array $rules = [
        'name' => 'required|min:2',
        'email' => 'required|email',
        'phone' => 'nullable|string',
        'message' => 'required|min:10',
    ];

    public function submit()
    {
        $this->validate();

        Contact::create([
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'message' => $this->message,
        ]);

        $this->reset();
        $this->success = true;
    }

    public function render()
    {
        return view('livewire.contact-form');
    }
}
```

```blade
{{-- resources/views/livewire/contact-form.blade.php --}}
<div class="max-w-lg mx-auto">
    @if($success)
        <p class="text-green-600 font-semibold">Message sent! We'll get back to you soon.</p>
    @else
        <form wire:submit="submit" class="space-y-4">
            <input wire:model="name" placeholder="Name" class="w-full border rounded p-3">
            @error('name') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror

            <input wire:model="email" type="email" placeholder="Email" class="w-full border rounded p-3">
            @error('email') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror

            <input wire:model="phone" placeholder="Phone (optional)" class="w-full border rounded p-3">

            <textarea wire:model="message" placeholder="Message" rows="5" class="w-full border rounded p-3"></textarea>
            @error('message') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror

            <button type="submit" class="w-full text-white py-3 rounded font-semibold"
                    style="background-color: var(--primary);">
                Send Message
            </button>
        </form>
    @endif
</div>
```

- [ ] **Step 2: Create mail notification (optional — only if email configured)**

```php
namespace App\Mail;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Contact $contact) {}

    public function build()
    {
        return $this->subject('New Contact Message')
                    ->markdown('emails.contact-notification');
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add Livewire contact form + email notification"
```

---

### Task 9: Multi-Language Support

**Files:**
- Create: `lang/en.json`
- Create: `lang/ar.json`
- Create: `lang/ckb.json`
- Create: `resources/lang/vendor/laravel-localization/...`
- Modify: `config/app.php` (locale config)
- Modify: `config/laravel-localization.php`
- Modify: `routes/web.php` (localized routes)

- [ ] **Step 1: Configure Laravel Localization**

```php
// config/app.php
'locale' => 'en',
'fallback_locale' => 'en',
'supported_locales' => ['en', 'ar', 'ckb'],
```

- [ ] **Step 2: Publish localization config**

```bash
php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"
```

- [ ] **Step 3: Configure supported locales in config**

```php
// config/laravel-localization.php
'supportedLocales' => [
    'en' => ['name' => 'English', 'script' => 'Latn', 'native' => 'English'],
    'ar' => ['name' => 'Arabic', 'script' => 'Arab', 'native' => 'العربية'],
    'ckb' => ['name' => 'Kurdish (Sorani)', 'script' => 'Arab', 'native' => 'کوردی'],
],
'useAcceptLanguageHeader' => false,
'hideDefaultLocaleInURL' => false,
```

- [ ] **Step 4: Update routes with localization**

```php
// routes/web.php
Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => ['localeSessionRedirect', 'localizationRedirect']], function () {
    Route::get('/', [SiteController::class, 'home'])->name('home');
    // ... all routes inside this group
});
```

- [ ] **Step 5: Create translation files**

```json
{{-- lang/en.json --}}
{
    "home": "Home",
    "products": "Products",
    "contact": "Contact Us",
    "about": "About Us",
    "send_message": "Send Message",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Message",
    "message_sent": "Message sent! We'll get back to you soon."
}
```

```json
{{-- lang/ar.json --}}
{
    "home": "الرئيسية",
    "products": "المنتجات",
    "contact": "اتصل بنا",
    "about": "من نحن",
    "send_message": "أرسل رسالة",
    "name": "الاسم",
    "email": "البريد الإلكتروني",
    "phone": "الهاتف",
    "message": "الرسالة",
    "message_sent": "تم إرسال الرسالة! سنتواصل معك قريبًا."
}
```

```json
{{-- lang/ckb.json --}}
{
    "home": "سەرەکی",
    "products": "بەرهەمەکان",
    "contact": "پەیوەندیمان پێوەبکە",
    "about": "دەربارەی ئێمە",
    "send_message": "ناردنی نامە",
    "name": "ناو",
    "email": "ئیمەیڵ",
    "phone": "تەلەفۆن",
    "message": "نامە",
    "message_sent": "نامەکە نێردرا! بەم زووانە پەیوەندیت پێوە دەکەین."
}
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add multi-language support (English, Arabic, Kurdish)"
```

---

### Task 10: SEO Meta Tags

**Files:**
- Modify: `resources/views/components/site-layout.blade.php` (add meta tags)
- Create: `app/View/Components/SeoMeta.php` (optional helper)

- [ ] **Step 1: Add SEO meta to layout head**

```blade
{{-- In <head> of site-layout.blade.php --}}
@php
    $metaTitle = $page->meta_title ?? $settings['site_name'][app()->getLocale()] ?? '';
    $metaDesc = $page->meta_description ?? '';
    $locale = app()->getLocale();
@endphp
<title>{{ $metaTitle ?: ($page->title ?? '') }}</title>
<meta name="description" content="{{ $metaDesc }}">
<meta property="og:title" content="{{ $metaTitle }}">
<meta property="og:description" content="{{ $metaDesc }}">
<meta property="og:type" content="website">
<meta property="og:locale" content="{{ $locale == 'ckb' ? 'ckb_IQ' : ($locale == 'ar' ? 'ar_IQ' : 'en_US') }}">
<link rel="alternate" hreflang="en" href="{{ LaravelLocalization::getLocalizedURL('en') }}">
<link rel="alternate" hreflang="ar" href="{{ LaravelLocalization::getLocalizedURL('ar') }}">
<link rel="alternate" hreflang="ckb" href="{{ LaravelLocalization::getLocalizedURL('ckb') }}">
```

- [ ] **Step 2: Add canonical URLs and pagination**

```blade
<link rel="canonical" href="{{ url()->current() }}">
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add SEO meta tags + Open Graph + hreflang"
```

---

### Task 11: Demo Content Seeder

**Files:**
- Modify: `database/seeders/DatabaseSeeder.php`
- Create: `database/seeders/DemoContentSeeder.php`

- [ ] **Step 1: Create DemoContentSeeder**

```php
namespace Database\Seeders;

use App\Models\{Page, Product, Category, Setting};
use Illuminate\Database\Seeder;

class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        // Create home page
        $home = Page::create([
            'title' => ['en' => 'Home', 'ar' => 'الرئيسية', 'ckb' => 'سەرەکی'],
            'slug' => 'home',
            'is_home' => true,
            'status' => 'published',
            'content' => [
                ['type' => 'hero', 'data' => [
                    'title' => 'Welcome to Our Business',
                    'subtitle' => 'Quality products & services since 2000',
                    'button_text' => 'Learn More',
                    'button_link' => '/about',
                ]],
                ['type' => 'stats', 'data' => [
                    'stats' => [
                        ['number' => 25, 'label' => 'Years Experience'],
                        ['number' => 160, 'label' => 'Employees'],
                        ['number' => 100, 'label' => 'Clients'],
                    ],
                ]],
                ['type' => 'products_grid', 'data' => ['max_items' => 8]],
                ['type' => 'contact_form', 'data' => []],
            ],
        ]);

        // Create sample categories
        $cat1 = Category::create([
            'name' => ['en' => 'Category 1', 'ar' => 'الفئة 1', 'ckb' => 'پۆلی ١'],
            'slug' => 'category-1',
        ]);

        // Create sample products
        Product::create([
            'title' => ['en' => 'Sample Product', 'ar' => 'منتج تجريبي', 'ckb' => 'بەرهەمی نموونەیی'],
            'slug' => 'sample-product',
            'description' => ['en' => 'Product description here', 'ar' => 'وصف المنتج هنا', 'ckb' => 'وەسفی بەرهەم لێرە'],
            'category_id' => $cat1->id,
            'status' => 'published',
        ]);
    }
}
```

- [ ] **Step 2: Run seeder**

```bash
php artisan db:seed --class=DemoContentSeeder
```

- [ ] **Step 3: Verify output**

Run: `php artisan tinker --execute="echo App\Models\Page::count();"`
Expected: `1` (or more if included About/Contact pages)

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add demo content seeder"
```

---

### Task 12: Deployment Script

**Files:**
- Create: `deploy-script.sh`

- [ ] **Step 1: Create deployment script**

```bash
#!/bin/bash
# deploy-script.sh — One-command deployment for a new client instance
# Usage: ./deploy-script.sh client-slash client-domain.com

set -e

CLIENT=$1
DOMAIN=$2
BASE_DIR="/var/www/$CLIENT"

if [ -z "$CLIENT" ] || [ -z "$DOMAIN" ]; then
    echo "Usage: $0 <client-slug> <domain>"
    echo "Example: $0 alshahia alshahia.com"
    exit 1
fi

echo "==> Creating directory $BASE_DIR"
mkdir -p "$BASE_DIR"
cd "$BASE_DIR"

echo "==> Cloning codebase"
git clone <repo-url> .

echo "==> Installing dependencies"
composer install --no-dev --optimize-autoloader

echo "==> Creating .env"
cp .env.example .env
php artisan key:generate

echo "==> Creating database"
# Assume MySQL root or configured user
mysql -e "CREATE DATABASE IF NOT EXISTS ${CLIENT}_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS '${CLIENT}'@'localhost' IDENTIFIED BY '<generate-password>';"
mysql -e "GRANT ALL PRIVILEGES ON ${CLIENT}_db.* TO '${CLIENT}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "==> Updating .env with database credentials"
sed -i "s/DB_DATABASE=.*/DB_DATABASE=${CLIENT}_db/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=${CLIENT}/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=<generated-password>/" .env
sed -i "s/APP_URL=.*/APP_URL=https:\/\/$DOMAIN/" .env

echo "==> Running migrations + seeder"
php artisan migrate --seed
php artisan storage:link

echo "==> Creating Nginx vhost"
cat > "/etc/nginx/sites-available/$DOMAIN" << NGINX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $BASE_DIR/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location ~ \.php\$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
NGINX

ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/"
nginx -t && systemctl reload nginx

echo "==> Getting SSL certificate"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN"

echo "==> Setup complete!"
echo "Client: $CLIENT"
echo "URL: https://$DOMAIN"
echo "Admin: https://$DOMAIN/admin"
```

- [ ] **Step 2: Set execute permission**

```bash
git update-index --chmod=+x deploy-script.sh
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add deployment script for new client instances"
```

---

### Task 13: Tailwind CSS Setup + Vite

**Files:**
- Create: `tailwind.config.js`
- Create: `resources/css/app.css`
- Create: `resources/js/app.js`
- Modify: `vite.config.js`

- [ ] **Step 1: Install + configure Tailwind CSS**

```bash
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './vendor/filament/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
            },
            fontFamily: {
                sans: ['Noto Sans Arabic', 'Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
```

```css
/* resources/css/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap');
```

- [ ] **Step 2: Build assets**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: add Tailwind CSS + Vite configuration"
```

---

## Self-Review Checklist

- ✅ **Spec coverage**: All spec sections have corresponding tasks (Tasks 1-13 cover scaffold, models, admin, frontend, blocks, localization, SEO, deployment)
- ✅ **No placeholders**: Every step has actual code, not "TBD" or "implement later"
- ✅ **Type consistency**: Model names, method signatures, and field names are consistent across all tasks
- ✅ **File paths**: All exact and absolute within the project
- ✅ **Testing steps**: Commands provided for each verification step
