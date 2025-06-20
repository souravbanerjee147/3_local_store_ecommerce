const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');

const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-description');

let cart = [];
const formatter = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'USD',
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cart-item">
        <span class="item-name">${item.name}</span>
        <div class="quantity-controls">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </div>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });
  totalDisplay.textContent = formatter.format(total);

  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index);
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1);
      }
      updateCart();
    });
  });

  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index);
      cart[idx].quantity++;
      updateCart();
    });
  });
}

// Toggle cart modal
const cartModal = document.getElementById('cart-modal');
document.getElementById('cart-toggle').addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});
document.getElementById('close-cart').addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Fetch products from the server and display them
fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <img src="${product.imageURL}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${formatter.format(product.price)}</p>
        <p class="desc">${product.description}</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;

      const btn = div.querySelector('.add-to-cart-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const existing = cart.find(p => p.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        btn.textContent = 'Added'; // Permanently change to "Added"
        btn.disabled = true; // Optional: disable the button to prevent re-adding
        btn.classList.add('added'); // Optional: for styling (you can style .added in CSS)
        updateCart();
      });

      div.addEventListener('click', () => {
        modalImage.src = product.imageURL;
        modalTitle.textContent = product.name;
        modalPrice.textContent = formatter.format(product.price);
        modalDesc.textContent = product.description;
        modal.classList.remove('hidden');
      });

      productList.appendChild(div);
    });
  });

  // Redirect to payment on Buy Now click
document.getElementById('buy-now-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Replace with your real payment URL later
  window.location.href = 'https://example-payment-portal.com/checkout';
});


closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

document.getElementById('buy-now-btn').addEventListener('click', () => {
  window.location.href = '/payment.html';
});

