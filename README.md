# Company Social Media Hub

A Next.js application that allows each company to have their social media links with redirect functionality and QR code generation.

## Features

- 🏢 Multi-company support with unique slugs
- 🔗 Social media link management per company
- 📱 QR code generation for easy sharing
- 🎨 Modern, responsive UI with dark mode support
- ⚡ Fast navigation with Next.js App Router

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
qr-app/
├── app/
│   ├── company/
│   │   └── [slug]/
│   │       └── page.tsx      # Company profile page
│   ├── api/
│   │   └── redirect/
│   │       └── [slug]/
│   │           └── route.ts  # Redirect API route
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── data/
│   └── companies.json        # Company data
├── lib/
│   └── companies.ts          # Company utility functions
└── types/
    └── company.ts            # TypeScript types
```

## Adding Companies

Edit `data/companies.json` to add or modify companies:

```json
{
  "companies": [
    {
      "id": "unique-id",
      "name": "Company Name",
      "slug": "company-slug",
      "description": "Company description",
      "logo": "🎨",
      "socialMedia": [
        {
          "platform": "Instagram",
          "url": "https://instagram.com/company",
          "icon": "📷"
        }
      ]
    }
  ]
}
```

## Usage

1. Visit the home page to see all companies
2. Click on a company to view their social media links
3. Click any social media link to open it in a new tab
4. Use the QR code to share the company page

## Technologies

- Next.js 16
- React 19
- TypeScript 5.7
- Tailwind CSS 3.4
- QRCode.react

