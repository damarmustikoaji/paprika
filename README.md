# Playwright Automation Project (Pure Playwright + POM)

Automation testing project menggunakan **Playwright murni** dengan arsitektur **Page Object Model (POM)**.  
Mencakup Web UI automation dengan struktur kode yang bersih, modular, dan mudah diperluas.

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
BROWSER=chromium HEADLESS=false npm run test -- --grep @logintest
```

## Project Structure
```
├── pages/                         
│   ├── login_page.ts
│   ├── inventory_page.ts
│   ├── cart_page.ts
│   ├── checkout_step_one_page.ts
│   ├── checkout_step_two_page.ts
│   └── checkout_complete_page.ts
│
├── tests/                         
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
- Running on Github Action

## Reporting

### Generate HTML Report
```bash
npm run report
npx playwright show-report
```
