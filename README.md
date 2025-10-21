# 🛍️ Classic Cotton T-Shirt – Shopify-Style Product Page

A fully responsive, feature-rich **Shopify-inspired product page** built using **HTML, CSS, and vanilla JavaScript**.  
This project mimics the layout and interactivity of a real e-commerce product page, focusing on responsiveness, usability, and clean structure — all without external libraries.

---

## 📋 Overview

The **Classic Cotton T-Shirt** product page demonstrates a complete modern storefront layout built from scratch.  
It includes essential Shopify-style features such as an interactive image gallery, variant selectors, size chart modal, color comparison, bundle suggestions, and a recommendation carousel.  

All assets are stored locally for faster loading and offline functionality.  
The page is fully responsive across mobile, tablet, and desktop.

---

## ✨ Features Implemented

### 🖼️ Product Image Gallery
- Main product image with clickable thumbnails.
- Thumbnails update the main image dynamically.
- Smooth horizontal scrolling for thumbnail overflow.

### 📏 Size Chart Modal
- “Size Chart” button triggers a popup modal.
- Modal includes a detailed size table.
- Closes via ❌ button, overlay click, or **ESC** key.

### 🎨 Product Variants
- Color options shown as interactive swatches.
- Size options selectable via buttons (XS–XXL).
- Active state highlights current selections.

### 🎨 Compare Colours Popup
- “Compare Colours” button opens a modal view.
- Allows selecting multiple swatches to compare side-by-side.

### 🛒 Product Bundle Suggestion
- “Frequently Bought Together” bundle below the main section.
- Shows individual and total prices.
- Includes single “Add Bundle to Cart” button.

### 👕 Pair Well With Section
- Scrollable row of complementary products like **jeans, denim jacket, leather bag,** and **backpack**.
- Each item includes image, name, price, and “Add to Cart” button.
- Mobile-friendly horizontal scroll interaction.

### 📑 Tabbed Product Information
- Three interactive tabs:
  - Description  
  - Product Information  
  - Shipping Details  
- Smooth tab switching via JavaScript only.

### 🧾 Related Products Grid
- 4-item grid showing related items with optional badges:
  - “New”, “Popular”, and “Sale”.
- Fully responsive using CSS Grid.

---

## 🧱 Folder Structure

```bash

shopify-product-page/
│
├── assets/
│ ├── tshirt_main.jpeg
│ ├── tshirt_thumbnail2.jpeg
│ ├── tshirt_thumbnail3.jpeg
│ ├── tshirt_thumbnail4.jpeg
│ ├── tshirt_thumbnail5.jpeg
│ ├── slimfit_jeans.jpeg
│ ├── canvas_sneakers.jpeg
│ ├── denim_jacket.jpeg
│ ├── leather_bag.jpeg
│ └── canvas_backpack.jpeg
│
├── css/
│ └── styles.css
│
├── js/
│ └── main.js
│
└── index.html

```


---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopify-product-page.git
   ```
2. **Navigate to the project folder**
   ```bash
   cd shopify-product-page
   ```
3. **Open the page**

   Double-click index.html, or

   Run a simple local server (recommended):
   
   ```bash
   npx live-server
   ```
   or

   ```bash
   python -m http.server
   ```

   The page will open in your browser — fully responsive and functional.

## 🧠 Technologies Used

- HTML5 – semantic structure

- CSS3 – flexbox/grid layout, animations, responsiveness

- JavaScript (ES6) – modals, image switching, tabs, interactions

## 👤 Author

Neil Landge
Front-End Developer | Web Design Enthusiast
📧 neillandge5@gmail.com

## 🔗 GitHub
https://github.com/NeilLandge
