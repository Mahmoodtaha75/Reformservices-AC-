// Security Features
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) {
      event.preventDefault();
    }
  });
  
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("mousedown", (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
  });
  
  document.addEventListener("selectstart", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("copy", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("cut", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("paste", (event) => {
    event.preventDefault();
  });
  
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === 'v') {
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === 'x') {
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const serviceButtons = document.querySelectorAll(".grid-container button");
    const targetSections = {
      "Services": document.querySelector(".AC-services"),
      "Repair and Gas refill": document.querySelector(".AC-repair-and-gas-refill"),
      "Installation": document.querySelector(".Installation"),
      "uninstallation": document.querySelector(".uninstallation")
    };
  
    serviceButtons.forEach(button => {
      button.addEventListener("click", () => {
        const serviceName = button.querySelector('span.small-span').textContent.trim().replace(/\s+/g, ' ');
        const targetSection = targetSections[serviceName];
  
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  });
  
  // Slideshow Logic
  const slides = document.querySelectorAll('.slide');
  let currentSlideIndex = 0;
  
  function showNextSlide() {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
  }
  
  setInterval(showNextSlide, 3000);
  
  // Cart Logic
  let cart = [];
  function addToCart(name, qty, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({ name, qty, price });
    }
    updateCartDisplay();
    showAddedToCartMessage();
  }
  
  function showAddedToCartMessage() {
    const messageElement = document.getElementById('added-to-cart-message');
    messageElement.style.display = 'block';
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 2000); // hide the message after 2 seconds
  }
  
  function updateCartDisplay() {
    const cartList = document.getElementById('cart-items-list');
    const mobileCartList = document.getElementById('mobile-cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const mobileCartTotal = document.getElementById('mobile-cart-total');
    const cartCount = document.querySelector('.cart-count');
    const visitingCharges = 219;
  
    const cartHTML = cart.map((item, index) => `
      <div class="flex justify-between items-center mb-2">
        <span>${item.name}</span>
        <div class="flex items-center">
          <button class="qty-btn cart-btn" onclick="updateQuantity(${index}, -1)">-</button>
          <span class="mx-2">${item.qty}</span>
          <button class="qty-btn cart-btn" onclick="updateQuantity(${index}, 1)">+</button>
          <span class="ml-2">₹${item.price * item.qty}</span>
          <button onclick="removeItem(${index})" class="ml-2 text-red-500">&times;</button>
        </div>
      </div>
  `).join('');
  
    // Update cart count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  
    // Update both desktop and mobile carts
    [cartList, mobileCartList].forEach(list => {
      if (list) {
        list.innerHTML = cartHTML;
        if (cart.length > 0) {
          list.innerHTML += `
            <div class="flex justify-between mt-4">
              <span>Visiting Charges</span>
              <span>₹${visitingCharges}</span>
            </div>
          `;
        }
      }
    });
  
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) + (cart.length > 0 ? visitingCharges : 0);
  
    // Update both desktop and mobile totals
    [cartTotal, mobileCartTotal].forEach(totalElement => {
      if (totalElement) {
        totalElement.textContent = `Total: ₹${total}`;
      }
    });
  }
  
  function clearCart() {
    cart = [];
    updateCartDisplay();
  }
  
  function sendToWhatsApp() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    const whatsappForm = document.getElementById('whatsapp-form');
    const overlay = document.getElementById('overlay');
  
    // Update the services textarea
    const servicesTextarea = document.getElementById('services');
    const servicesText = cart.map(item =>
      `${item.name} x ${item.qty} - ₹${item.price * item.qty}`
    ).join('\n') + `\nVisiting Charges: ₹219\nTotal: ₹${cart.reduce((total, item) => total + (item.price * item.qty), 0) + 219}`;
    servicesTextarea.value = servicesText;
  
    // Show the form and overlay
    whatsappForm.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('no-scroll');
  }
  
  // Event listeners for both desktop and mobile WhatsApp buttons
  document.getElementById('whatsapp-button').addEventListener('click', sendToWhatsApp);
  document.getElementById('mobile-whatsapp-button').addEventListener('click', sendToWhatsApp);
  
  // Send WhatsApp message button click handler
  document.getElementById('send-whatsapp-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const services = document.getElementById('services').value;
  
    if (!name || !phone || !address) {
      alert('Please fill in all required fields');
      return;
    }
  
    const message = `Name: ${name}\nPhone: ${phone}\nEmail:${email}\nAddress: ${address}\n\nServices Selected:\n${services}`;
    const whatsappUrl = `https://wa.me/916363758384?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  
    // Close the form after sending
    closeWhatsAppForm();
  });
  
  // Function to close WhatsApp form
  function closeWhatsAppForm() {
    const whatsappForm = document.getElementById('whatsapp-form');
    const overlay = document.getElementById('overlay');
    whatsappForm.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
  
  // Close button event listener
  document.getElementById('close-btn').addEventListener('click', closeWhatsAppForm);
  
  // Close form when clicking overlay
  document.getElementById('overlay').addEventListener('click', closeWhatsAppForm);
  
  // Previous JavaScript code remains the same
  const whatsappButton = document.getElementById('whatsapp-button');
  whatsappButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    const whatsappForm = document.getElementById('whatsapp-form');
    whatsappForm.classList.add('show');
    document.body.classList.add('no-scroll');
  });
  
  document.addEventListener('click', (e) => {
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm.style.display === 'block' && !whatsappForm.contains(e.target) && e.target !== whatsappButton) {
      whatsappForm.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  });
  
  // Initial cart display
  updateCartDisplay();
  
  // Add these new functions for mobile responsiveness
  function toggleMobileCart() {
    const mobileCart = document.querySelector('.mobile-cart');
    const overlay = document.querySelector('.mobile-overlay');
  
    if (mobileCart.classList.contains('active')) {
      mobileCart.classList.remove('active');
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll');
    } else {
      mobileCart.classList.add('active');
      overlay.style.display = 'block';
      document.body.classList.add('no-scroll');
    }
  }
  
  function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
  }
  
  // Close mobile cart when clicking outside
  document.addEventListener('click', (e) => {
    const mobileCart = document.querySelector('.mobile-cart');
    const mobileCartIcon = document.querySelector('.mobile-cart-icon');
  
    if (!mobileCart.contains(e.target) && !mobileCartIcon.contains(e.target) && !e.target.classList.contains('cart-btn')) {
      mobileCart.classList.remove('active');
      document.querySelector('.mobile-overlay').style.display = 'none';
    }
  });
  
  // Initialize the display
  updateCartDisplay();
  
  function updateQuantity(index, quantity) {
    if (quantity > 0) {
      cart[index].qty += 1;
    } else if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    }
    updateCartDisplay();
  }
  
  function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }
  
  const closeForm = document.querySelector('.close-form');
  
  closeForm.addEventListener('click', () => {
    const whatsappForm = document.getElementById('whatsapp-form');
    whatsappForm.style.display = 'none';
    document.body.classList.remove('no-scroll');
  });