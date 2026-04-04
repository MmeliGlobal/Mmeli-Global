// ==================== GLOBAL VARIABLES (same as before) ====================
// ... (keep all your existing global variables and category data unchanged)
// Only the displayHomeProducts function and renderProductBatch are new.

function displayHomeProducts(products) {
  const container = document.getElementById("productsContainer");
  if (!container) return;
  container.innerHTML = "";
  
  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }
  
  // Show first batch immediately
  const firstBatch = products.slice(0, 8);
  renderProductBatch(firstBatch, container);
  
  // Render remaining in chunks
  if (products.length > 8) {
    const remaining = products.slice(8);
    let index = 0;
    const chunkSize = 8;
    function renderNextChunk() {
      const chunk = remaining.slice(index, index + chunkSize);
      renderProductBatch(chunk, container);
      index += chunkSize;
      if (index < remaining.length) {
        setTimeout(renderNextChunk, 50);
      }
    }
    setTimeout(renderNextChunk, 100);
  }
}

function renderProductBatch(products, container) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("data-product-id", product.id);
    card.onclick = () => openProductById(product.id);
    
    // Use a smaller thumbnail if possible (add ?width=300 to Imgur URLs)
    let imgUrl = product.mainImage;
    if (imgUrl.includes('i.imgur.com') && !imgUrl.includes('?')) {
      imgUrl += '?width=300';
    }
    
    card.innerHTML = `
      <img src="${imgUrl}" alt="${product.name}" loading="lazy" decoding="async" fetchpriority="low">
      <div class="product-info">
        <div class="product-name">${escapeHtml(product.name)}</div>
        <div class="product-price">$${product.price}</div>
      </div>
    `;
    container.appendChild(card);
    
    // Add loaded class to remove skeleton
    const img = card.querySelector('img');
    img.classList.add('loading');
    img.onload = () => img.classList.remove('loading');
  });
}
