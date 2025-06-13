# METRIJKS 🎨

Explore and curate your own virtual exhibition drawn from two of the world’s greatest museum collections:  
**The Metropolitan Museum of Art** and the **Rijksmuseum**.

Live site: 👉 [metrijks.vercel.app](https://metrijks.vercel.app)

---

## 🖼 About the Project

**METRIJKS** is a minimalist, ambient web application that allows users to:

- Search for artworks from the MET and Rijksmuseum APIs
- Sort and filter results by title, source, and relevance
- Curate a personal collection by saving favorite works
- View detailed metadata for each artwork
- Enjoy subtle animated UI elements and responsive design

The project is built using **React + Vite**, with **Tailwind CSS** for styling, and is hosted via **Vercel**.

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/MGough22/metrijks.git
cd metrijks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```bash
touch .env
```

Paste the following inside:

```env
VITE_RIJKS_KEY=your_rijksmuseum_api_key_here
```

You can [get an API key here](https://www.rijksmuseum.nl/en/register) if you don't already have one.

> ⚠️ This file is ignored by Git and **must not** be committed.

### 4. Run the development server

```bash
npm run dev
```

---

## 🛠 Tech Stack

- ⚡️ **Vite** – blazing-fast dev server
- 🧬 **React** – component-driven UI
- 🌬 **Tailwind CSS** – utility-first styling
- 🌐 **Rijksmuseum & MET APIs** – public cultural data
- 🌑 **Vercel** – hosting and CI/CD

### 👀 Live Demo

Check it out at:  
🔗 [https://metrijks.vercel.app](https://metrijks.vercel.app)
