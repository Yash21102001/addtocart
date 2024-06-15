// Array of product objects
const products = [
    {
      id: 1,
      name: "GBX-100-8",
      price: "899",
      image: ".\\assets\\img\\i1.jpg"
    },
    {
      id: 2,
      name: "GR-B300-1A4",
      price: "888",
      image: ".\\assets\\img\\i2.jpg"
    },
    {
      id: 3,
      name: "GR-B300-8A2",
      price: "789",
      image: ".\\assets\\img\\i3.jpg"
    },
    {
      id: 4,
      name: "GA-110MF-1A",
      price: "699",
      image: ".\\assets\\img\\i4.jpg"
    },
     {
      id: 5,
      name: "GA-B2100MF",
      price: "500",
      image: ".\\assets\\img\\i5.jpg"
    },
    {
      id: 6,
      name: "GA-700MF-1A",
      price: "780",
      image: ".\\assets\\img\\i6.jpg"
    },
    {
      id: 7,
      name: "GMA-S140VA-7A",
      price: "650",
      image: ".\\assets\\img\\i7.jpg"
    },
    {
      id: 8,
      name: "GA-2300-1A",
      price: "799",
      image: ".\\assets\\img\\i8.jpg"
    } 
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cart);
  
  // Render products on the index page
  if (document.getElementById("products")) {
    const productContainer = document.getElementById("products");
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = 'col-md-3 mb-4';
  
      productElement.innerHTML = `<div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-dark" onclick="addToCart(${product.id})">Add to Cart 🛒</button>
          </div>
        </div>`;
      productContainer.appendChild(productElement);
    });
  }
  
  // Render cart on cart page
  if (document.getElementById("my-cart")) {
    updateCart();
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id == productId)
    const cartItem = cart.find(item => item.id == productId)

    if (cartItem) {
        cartItem.quantity += 1
    } else {
        cart.push({...product, quantity: 1})
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    updateCartCount()
}
  
  // function updateCart() {
  //   const cartItemsContainer = document.getElementById("my-cart");
  //   const totalContainer = document.getElementById("total");
  
  //   if (cartItemsContainer && totalContainer) {
  //     cartItemsContainer.innerHTML = "";
  //     let total = 0;
  //     cart.forEach((product, index) => {
  //       const cartItem = document.createElement("li");
  //       cartItem.className = "list-group-item d-flex justify-content-between align-items-center";
  //       cartItem.innerHTML = `<div class="cart-item-details">
  //           <img src="${product.image}" alt="${product.name}" class="img-thumbnail mr-3" style="width: 50px;">
  //           <span>${product.name} - $${product.price}</span>
  //         </div>
  //         <button class="btn btn-dark" onclick="removeFromCart(${index})">Remove</button>`;
  //       cartItemsContainer.appendChild(cartItem);
  //       total += parseFloat(product.price);
  //     });
  //     totalContainer.innerText = `TOTAL: $${total.toFixed(2)}`;
  //   }
  // }
  
  function updateCart() {
    const cartItemsContainer = document.getElementById("my-cart")
    const totalContainer = document.getElementById("total")

    if (cartItemsContainer && totalContainer) {
        cartItemsContainer.innerHTML = ""
        let total = 0
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div")
            cartItem.className = "col-12 mb-3"
            cartItem.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex justify-content-between align-items-center p-2">
                        <img src="${product.image}" class="img-thumbnail mr-3" style="width: 100px;" alt="${product.name}">
                        <div>
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price} </p>
                        </div>
                        <div class="fw-bold fs-5">
                        x ${product.quantity}
                        </div>
                        <div>
                            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem)

            total += product.price * product.quantity;
        })
        totalContainer.innerText = `Total: $${total.toFixed(2)}`;
    }
}



  // function updateCartCount() {
  //   const cartCountElement = document.getElementById("cart-count");
  //   if (cartCountElement) {
  //     cartCountElement.innerText = cart.length;
  //   }
  // }

  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count")
    if (cartCountElement) {
        let totalCount = 0;
        cart.forEach(item => {
            totalCount += item.quantity;
        });
        cartCountElement.innerHTML = totalCount;
    }
}
  
  // function removeFromCart(index) {
  //   cart.splice(index, 1);
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   updateCart();
  //   updateCartCount();
  // }
  function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id == productId)

    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1
    } else {
        cart = cart.filter(product => product.id !== productId)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
    updateCartCount()
  }


  // Initial load
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    if (document.getElementById("my-cart")) {
      updateCart();
    }
  });
  