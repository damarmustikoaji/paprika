# Automation Framework (Playwright Murni)

Automation testing web menggunakan **Playwright Murni** dengan arsitektur **Page Object Model (POM)**.
Framework ini meng-cover fitur login, cart management, checkout, dan registration pada aplikasi demo Sauce Demo.

## Overview
- Framework ini dibuat untuk mengotomasi test web e-commerce sederhana.
- Menggunakan Playwright dengan multi-browser support (chromium, firefox) dan dynamic configuration (HEADLESS, WORKERS, BROWSER).
- Semua test diorganisasi menggunakan Page Object Model (POM) untuk maintainability dan readability.

## Assumptions
- Test dijalankan pada staging/demo site https://www.saucedemo.com.
- User dan product data tersedia di data/users.json dan data/test_products.json.
- Browser dapat dijalankan headless atau headed sesuai konfigurasi.
- State awal aplikasi diasumsikan bersih (misal cart kosong) sebelum test dijalankan.
- Environment variables dikonfigurasi di .env atau Github Actions workflow.

## Challenges & Limitations
- Playwright di container CI/Github Actions membutuhkan HEADLESS = true untuk Linux agar browser bisa berjalan.
- Bergantung pada data statis (JSON), sehingga perubahan state di demo site dapat memengaruhi hasil test. Serta masih include didalam repository, jika ada perubahan harus melakukan commit.
- Registration page belum di implementasi di Sauce Demo.

## Requirements
- Node.js v16+
- npm
- Playwright browsers (`npx playwright install`)

## Installation & Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd <repo-folder>
cp .env.example .env
```

#### .env
```
BASE_URL=https://
TIMEOUT=20000
RETRIES=0
WORKERS=4
HEADLESS=true
```

### 2. Install Dependencies
```bash
npm install
```

## Running Tests

### Run all tests & cross browser & launch mode
```bash
npm run test
```

### Run specific test file
```bash
npm run test tests/login/login_valid.spec.ts
```

### Run headed browser
```bash
HEADLESS=true npm run test
```

### Run specific browser
```bash
BROWSER=chromium/firefox npm run test
```

### Run specific workers
```bash
WORKERS=3 npm run test
```

### Run specific tagging
```bash
BROWSER=chromium HEADLESS=false npm run test -- --grep @login
```

## Project Structure
```
├── pages/                         
│   ├── login.page.ts
│   └── .page.ts
│
├── tests/                         
│   ├── login-valid.spec.ts
│   └── .spec.ts                   
│
├── data/                          
│   └── users.json
│
├── utils/                         
│   └── helpers.ts
│
├── .env
├── package.json
├── playwright.config.ts
└── README.md
```

## Features
- Page Object Model (POM)
- Dynamic config: browser, headless, workers
- Multi-browser support
- Test tags
- Running on Github Action https://github.com/damarmustikoaji/paprika/actions/workflows/playwright.yml

## Reporting

### Generate HTML Report
```bash
npm run report
```

### Example
- /docs

## Github Action
- Workflows https://github.com/damarmustikoaji/paprika/actions/workflows/playwright.yml
- Run workflow
- Report artifact