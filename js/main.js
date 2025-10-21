// ==================== IMAGE GALLERY HANDLER ====================
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage');

function updateMainImage(src) {
    if (src) mainImage.src = src;
}

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function () {
        const newImage = this.getAttribute('data-image');
        updateMainImage(newImage);
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});



// ==================== COLOUR SWATCH HANDLER ====================
const colourSwatches = document.querySelectorAll('.colour-swatches .swatch');
const selectedColourText = document.getElementById('selectedColour');

colourSwatches.forEach((swatch, index) => {
    swatch.addEventListener('click', function () {
        const colourName = this.getAttribute('data-colour');

        // Update UI
        colourSwatches.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        selectedColourText.textContent = colourName;

        // Change gallery main image and highlight matching thumbnail
        const newThumb = thumbnails[index % thumbnails.length];
        if (newThumb) {
            updateMainImage(newThumb.getAttribute('data-image'));
            thumbnails.forEach(t => t.classList.remove('active'));
            newThumb.classList.add('active');
        }

        // Store colour selection
        saveSelection({ colour: colourName });
    });
});

// ==================== SIZE BUTTON HANDLER ====================
const sizeButtons = document.querySelectorAll('.size-btn');
const selectedSizeText = document.getElementById('selectedSize');

sizeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const sizeName = this.getAttribute('data-size');
        sizeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSizeText.textContent = sizeName;

        saveSelection({ size: sizeName });
    });
});

// ==================== SIZE CHART MODAL ====================
const sizeChartBtn = document.getElementById('sizeChartBtn');
const sizeChartModal = document.getElementById('sizeChartModal');
const closeSizeChart = document.getElementById('closeSizeChart');

sizeChartBtn.addEventListener('click', () => openModal(sizeChartModal));
closeSizeChart.addEventListener('click', () => closeModal(sizeChartModal));
sizeChartModal.addEventListener('click', e => {
    if (e.target === sizeChartModal) closeModal(sizeChartModal);
});

// ==================== COMPARE COLOURS MODAL ====================
const compareBtn = document.getElementById('compareColoursBtn');
const compareModal = document.getElementById('compareModal');
const closeCompare = document.getElementById('closeCompare');
const compareSwatches = document.querySelectorAll('.compare-swatch');
const comparePreview = document.getElementById('comparePreview');

compareBtn.addEventListener('click', () => openModal(compareModal));
closeCompare.addEventListener('click', () => closeModal(compareModal));
compareModal.addEventListener('click', e => {
    if (e.target === compareModal) closeModal(compareModal);
});

compareSwatches.forEach(swatch => {
    const checkbox = swatch.querySelector('.compare-checkbox');
    swatch.addEventListener('click', e => {
        if (e.target !== checkbox) checkbox.checked = !checkbox.checked;
        updateComparePreview();
    });
    checkbox.addEventListener('change', updateComparePreview);
});

function updateComparePreview() {
    const selectedSwatches = Array.from(compareSwatches).filter(s =>
        s.querySelector('.compare-checkbox').checked
    );

    comparePreview.innerHTML = '';

    if (selectedSwatches.length === 0) {
        comparePreview.innerHTML = '<p style="color:#999;text-align:center;">Select colours to compare</p>';
        return;
    }

    selectedSwatches.forEach(swatch => {
        const colourName = swatch.getAttribute('data-colour');
        const colourDiv = swatch.querySelector('.compare-colour');
        const preview = document.createElement('div');
        preview.className = 'compare-preview-item';
        preview.innerHTML = `
            <div class="compare-preview-colour" 
                style="background:${colourDiv.style.backgroundColor};${colourDiv.style.border ? `border:${colourDiv.style.border}` : ''}">
            </div>
            <div class="compare-preview-name">${colourName}</div>
        `;
        comparePreview.appendChild(preview);
    });
}

// ==================== TAB HANDLER ====================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ==================== ESCAPE KEY FOR MODALS ====================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal(sizeChartModal);
        closeModal(compareModal);
    }
});

// ==================== HORIZONTAL SCROLL FOR PAIR PRODUCTS ====================
const pairProducts = document.getElementById('pairProducts');
if (pairProducts) {
    let isDown = false, startX, scrollLeft;
    pairProducts.addEventListener('mousedown', e => {
        isDown = true;
        pairProducts.classList.add('grabbing');
        startX = e.pageX - pairProducts.offsetLeft;
        scrollLeft = pairProducts.scrollLeft;
    });
    pairProducts.addEventListener('mouseleave', () => { isDown = false; pairProducts.classList.remove('grabbing'); });
    pairProducts.addEventListener('mouseup', () => { isDown = false; pairProducts.classList.remove('grabbing'); });
    pairProducts.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - pairProducts.offsetLeft;
        const walk = (x - startX) * 2;
        pairProducts.scrollLeft = scrollLeft - walk;
    });
}

// ==================== RESTORE SELECTIONS ON PAGE LOAD ====================
window.addEventListener('DOMContentLoaded', () => {
    const stored = getStoredSelection();

    if (stored.colour) {
        const match = Array.from(colourSwatches).find(s => s.dataset.colour === stored.colour);
        if (match) match.click();
    }

    if (stored.size) {
        const match = Array.from(sizeButtons).find(b => b.dataset.size === stored.size);
        if (match) match.click();
    }
});

// ==================== ADD TO CART ANIMATION + VARIANT FEEDBACK ====================
const addToCartButtons = document.querySelectorAll('.btn-primary, .btn-small, .btn-bundle');

addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const selection = getStoredSelection();
        const productName = document.querySelector('.product-title')?.textContent || 'Product';

        console.log(`Added to cart → ${productName} | Colour: ${selection.colour || 'Default'} | Size: ${selection.size || 'N/A'}`);

        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.background = '#4caf50';
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1500);
    });
});

// Bundle calculation (compute totals from item price elements or JS data)
(function computeBundle() {
    // if you have bundle item price nodes, parse them; otherwise you can hardcode as below
    const bundleItems = [
        { name: 'Classic Cotton T-Shirt', price: 899 },
        { name: 'Slim Fit Jeans', price: 1899 },
        { name: 'Canvas Sneakers', price: 2499 }
    ];
    const itemsTotal = bundleItems.reduce((s, it) => s + it.price, 0);
    const bundlePrice = Math.round(itemsTotal * 0.85); // e.g., 15% off
    const totalEl = document.querySelector('.bundle-total'); // adjust selector to your markup
    const originalEl = document.querySelector('.bundle-original'); // adjust selector
    if (originalEl) originalEl.textContent = `₹${itemsTotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `₹${bundlePrice.toLocaleString()}`;
})();


// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// ==================== IMAGE ZOOM ON HOVER ====================
const zoomContainer = document.querySelector('.main-image-container');
const zoomImage = document.getElementById('mainImage');

if (zoomContainer && zoomImage) {
    zoomContainer.style.overflow = 'hidden';
    zoomContainer.style.position = 'relative';

    zoomContainer.addEventListener('mousemove', e => {
        const rect = zoomContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        zoomImage.style.transformOrigin = `${x}% ${y}%`;
        zoomImage.style.transform = 'scale(1.6)';
    });

    zoomContainer.addEventListener('mouseleave', () => {
        zoomImage.style.transform = 'scale(1)';
    });
}


// ==================== UTILITY FUNCTIONS ====================
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function saveSelection(data) {
    try {
        const stored = JSON.parse(localStorage.getItem('productSelection') || '{}');
        localStorage.setItem('productSelection', JSON.stringify({ ...stored, ...data }));
    } catch {
        console.warn('localStorage not available');
    }
}

function getStoredSelection() {
    try {
        return JSON.parse(localStorage.getItem('productSelection') || '{}');
    } catch {
        return {};
    }
}

