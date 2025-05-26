# ✈️ Flight Status Checker

A responsive, multilingual web app that allows users to check the status of any flight by its number and date. Built with React, it features internationalization, mobile-friendly calendar input, and real-time data via [aviationstack.com](https://aviationstack.com/).

![Mobile Preview](/public/mobile-preview.png)

---

## 🔧 Tech Stack

- ⚛️ React + Vite
- 🌍 i18next (internationalization)
- 📅 react-datepicker (with localization)
- 🌐 aviationstack API
- 🎨 CSS3 + variables + media queries
- 📱 Fully responsive (mobile-first)

---

## 🚀 Features

- 🔍 Search for a flight by flight number and date
- 🗓 Interactive mobile-friendly calendar with automatic locale
- 🌐 Language switcher (🇳🇴 NO, 🇬🇧 EN, 🇺🇦 UA)
- 📡 API integration via `.env` config
- ⚙️ Live deployment on Vercel or Netlify

---

## 🛠 Installation

```bash
git clone https://github.com/your-username/flight-status-app.git
cd flight-status-app
npm install
```

## ⚙️ Environment Setup

Create a .env file at the root with your aviationstack API key:
```bash
VITE_API_KEY=your_api_key_here
```

## 🧪 Run Locally
Then open http://localhost:5173 in your browser.
```bash
npm run dev
```

## 🌍 Deployment
Recommended: Vercel or Netlify

* Push your project to GitHub.
* Link the repo in Vercel.
* Add VITE_API_KEY in Settings → Environment Variables.

## 📁 Project Structure
```bash
├── src/
│   ├── api/aviationAPI.js         # API logic
│   ├── component/PlaneSpinner.jsx # Loading animation
│   ├── i18n/                      # Translations
│   ├── App.jsx                    # Main app component
│   └── App.css                    # Mobile-first responsive styles
├── .env                           # API key
├── index.html
└── README.md
```

## 🌐 Example Usage
1. Enter flight number (e.g., WF101)
2. Select date (default is today)
3. Click Search Flight

The app will return:

* Flight status (landed, cancelled, delayed)
* Destination airport
* Gate
* Date of departure

## 📄 License
MIT © 2025 [@tobolovskaya]
```bash

---

Would you like me to generate this file and add a `.gitignore`, `.env.example`, and Vercel configuration too?
```



