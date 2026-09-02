# 🔔 DropBell

**DropBell** is a full-stack price tracking application that monitors product prices and automatically sends an email notification when the price drops.

🌐 **Live Demo:** [getdropbell.vercel.app](https://getdropbell.vercel.app)

## ✨ Features

* 🔗 Track products by simply pasting a product URL
* 🤖 Automatically extracts product name, price, currency, and image using **Firecrawl**
* 🔐 Secure authentication with **Supabase**
* 📊 Interactive price history charts
* 🔄 Automatic price monitoring using scheduled cron jobs
* 📧 Email notifications when a product's price drops
* 💰 Shows previous price, current price, and savings
* 🗑️ Add and remove tracked products from the dashboard

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
* **Backend:** Next.js Server Actions & API Routes
* **Database & Authentication:** Supabase
* **Web Scraping:** Firecrawl
* **Email Notifications:** Resend
* **Charts:** Recharts
* **Deployment:** Vercel

## ⚙️ How It Works

```text
User adds product URL
        ↓
Firecrawl extracts product details
        ↓
Product stored in Supabase
        ↓
Scheduled cron job checks latest price
        ↓
New price compared with previous price
        ↓
Price drops → Email notification 📧
```

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/nitindixit03/DropBell.git
cd DropBell
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and add the required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FIRECRAWL_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CRON_SECRET=
NEXT_PUBLIC_APP_URL=
```

Start the development server:

```bash
npm run dev
```

## 👨‍💻 Author

**Nitin Dixit**

---

⭐ If you like **DropBell**, consider giving the repository a star!
