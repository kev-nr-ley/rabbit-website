import { galleryItemArray } from "./gallery-items.js";

// Page elements -------------------------------------------------------------------
const shopCategories = document.querySelector(".shop-categories");
const shopItemContainer = document.getElementById("shop-item-container");
const shopCategoryHeader = document.getElementById("shop-category-header");
const categoryButtons = [...shopCategories.children];

const itemModal = document.getElementById("item-modal");
const cartModal = document.querySelector(".cart-modal");

// Item modal elements ------------------------------------------------------------
const itemModalCloseButton = document.getElementById("modal-close-button");
const itemSizeChange = document.getElementById("modal-print-size");
const modalImage = document.getElementById("modal-image");
const modalInfoTitle = document.getElementById("modal-info-title");
const modalInfoType = document.getElementById("modal-info-type");
const modalInfoYear = document.getElementById("modal-info-year");
const itemQuantitySubtract = document.getElementById("modal-quantity-minus");
const itemQuantity = document.getElementById("modal-quantity");
const itemQuantityAdd = document.getElementById("modal-quantity-plus");
const modalTotalPrice = document.getElementById("modal-total-price");
const itemAddToCartButton = document.getElementById("modal-add-item-to-cart");
// --------------------------------------------------------------------------------

// Cart modal elements ------------------------------------------------------------
const cartList = document.getElementById("cart-modal-list");
const cartItems = [...document.querySelectorAll(".cart-item")];
const cartModalOpenButton = document.getElementById("open-cart-modal");
const cartSubtotal = document.getElementById("cart-modal-total-subtotal");
const cartTax = document.getElementById("cart-modal-total-tax");
const cartTotal = document.getElementById("cart-modal-total-total");
const cartModalTotalCheckout = document.getElementById(
  "cart-modal-total-checkout"
);
// --------------------------------------------------------------------------------
// Page variables -----------------------------------------------------------------

//default values
var currentTotal = 0.0;
var currentQuantity = 0;
var currentPrintPrice = 0.0;
var currentPrintSize = null;
let currentCagtegory = "rabbit";
let cart = [];
const categoryArray = ["rabbit", "shoe", "camera", "portrait", "dragon"];
const printSizes = [
  {
    size: "8x10",
    price: 8.99,
  },
  {
    size: "11x14",
    price: 12.99,
  },
  {
    size: "16x20",
    price: 16.99,
  },
  {
    size: "20x24",
    price: 20.99,
  },
  {
    size: "24x36",
    price: 24.99,
  },
  {
    size: "30x40",
    price: 30.99,
  },
  {
    size: "36x48",
    price: 36.99,
  },
  {
    size: "40x60",
    price: 40.99,
  },
];

// Page functions -------------------------------------------------------------------
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(`@saveCartToLocalStorage: ${cart.length} items in cart`);
}

function loadCartFromLocalStorage() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  if (cartFromLocalStorage) {
    cart = cartFromLocalStorage;
  }
  console.log(`@loadCartFromLocalStorage: ${cart.length} items in cart`);
  return cartFromLocalStorage;
}

const renderAllShopItemsOfType = (type) => {
  galleryItemArray.forEach((item) => {
    if (item.type === type) {
      shopItemContainer.appendChild(
        makeShopItem(
          item.type,
          item.title,
          item.subtitle,
          item.date,
          item.hqSrc,
          item.lqSrc,
          item.description
        )
      );
    }
  });
  console.log(`@renderAllShopItemsOfType: ${type}`);
};

categoryButtons.forEach((categoryButton) => {
  categoryButton.addEventListener("click", (e) => {
    handleCategoryButton(e);
  });
});

const handleCategoryButton = (e) => {
  const button = e.target;
  const category = button.dataset.type;
  const categoryButtons = [...shopCategories.children];
  categoryButtons.forEach((categoryButton) => {
    categoryButton.classList.remove("active");
  });

  button.classList.add("active");
  shopCategoryHeader.innerHTML = `shop ${category} prints`;
  shopItemContainer.innerHTML = "";
  console.log(`@handleCategoryButton: ${category}`);
  renderAllShopItemsOfType(category);
};

const addShopItemToShop = (item) => {
  itemModal.classList.add("open");
  //set modal data from item
  modalImage.src = item.image;
  modalInfoTitle.innerHTML = item.title;
  modalInfoType.innerHTML = item.type;
  modalInfoYear.innerHTML = item.year;

  //set current values
  currentPrintPrice = printSizes[0].price;
  currentPrintSize = printSizes[0].size;
  currentQuantity = 1;
  currentTotal = currentPrintPrice * currentQuantity;

  itemQuantity.innerHTML = currentQuantity;
  itemSizeChange.innerHTML = "";
  modalTotalPrice.innerHTML = `$${currentTotal}`;

  //attach print sizes
  printSizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size.size;
    option.innerHTML = `${size.size} - $${size.price}`;
    itemSizeChange.appendChild(option);
  });
};

function makeShopItem(type, title, subtitle, date, hqSrc, lqSrc, description) {
  const shopItem = document.createElement("div");
  shopItem.classList.add("shop-item");
  shopItem.innerHTML = `
    <div class="shop-item-image-container">
    <img
      class="shop-item-image"
      src="${lqSrc}"
      alt="${title}"
      loading="lazy"
      />
  </div>

  <div class="shop-item-info-container">
    <h3 class="shop-item-title">${title}</h3>
    <p class="shop-item-type">${type}</p>
    <p class="shop-item-year">${date}</p>
  </div>
    `;

  shopItem.addEventListener("click", (e) => {
    handleShopItem(e);
  });
  return shopItem;
}
const handleShopItem = (e) => {
  // get item data
  const shopItem = e.target.closest(".shop-item");
  const shopItemTitle = shopItem.querySelector(".shop-item-title").textContent;
  const shopItemType = shopItem.querySelector(".shop-item-type").textContent;
  const shopItemYear = shopItem.querySelector(".shop-item-year").textContent;
  const shopItemImage = shopItem.querySelector(".shop-item-image").src;
  //make item object
  const item = {
    title: shopItemTitle,
    type: shopItemType,
    year: shopItemYear,
    image: shopItemImage,
  };

  console.log(`@handleShopItem: ${shopItemTitle}`);
  //open modal with item data
  addShopItemToShop(item);
};

const updateItemTotal = () => {
  currentTotal = (currentQuantity * currentPrintPrice).toFixed(2);
  modalTotalPrice.innerHTML = `$${currentTotal}`;
  console.log(`@updateItemTotal: ${currentTotal}`);
};
// ------------------------------------------------------------------------------

function itemModalStuff() {
  // Event Listeners & handlers ---------------------------------------------------

  //add item to cart
  itemAddToCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleItemAddToCart(e);
  });

  const handleItemAddToCart = (e) => {
    const modalData = {
      title: modalInfoTitle.textContent,
      type: modalInfoType.textContent,
      year: modalInfoYear.textContent,
      image: modalImage.src,
      printPrice: currentPrintPrice,
      printSize: currentPrintSize,
      quantity: currentQuantity,
      totalPrice: currentTotal,
    };

    itemAddToCart(modalData);
    console.log(`@handleItemAddToCart: ${cart.length} items in cart`);
    handleItemModalClose(e);
  };

  //reduce item quantity
  itemQuantitySubtract.addEventListener("click", (e) => {
    handleItemQuantitySubtract(e);
  });
  const handleItemQuantitySubtract = (e) => {
    if (currentQuantity > 1) {
      currentQuantity--;
      itemQuantity.innerHTML = currentQuantity;
    }
    console.log(`@handleItemQuantitySubtract: ${currentQuantity}`);
    updateItemTotal();
  };

  //increase item quantity
  itemQuantityAdd.addEventListener("click", (e) => {
    handleQuantityAdd(e);
  });
  const handleQuantityAdd = (e) => {
    currentQuantity++;
    itemQuantity.innerHTML = currentQuantity;
    console.log(`@handleQuantityAdd: ${currentQuantity}`);
    updateItemTotal();
  };

  //change items print size
  itemSizeChange.addEventListener("change", (e) => {
    handleItemSizeChange(e);
  });

  const handleItemSizeChange = (e) => {
    const size = e.target.value;
    const sizeObject = printSizes.find(
      (sizeObject) => sizeObject.size === size
    );
    currentPrintPrice = sizeObject.price;
    console.log(
      `@handleItemSizeChange: ${e.target.value} x $${currentPrintPrice}`
    );
    updateItemTotal();
  };

  itemModalCloseButton.addEventListener("click", (e) => {
    handleItemModalClose(e);
  });

  const handleItemModalClose = (e) => {
    console.log("@handleItemModalClose");
    itemModal.classList.remove("open");
  };
  // Helper functions --------------------------------------------------
  function itemAddToCart(item) {
    cart.push(item);
    saveCartToLocalStorage();
    console.log(`@itemAddToCart: ${item.title}`);
  }
  renderAllShopItemsOfType(currentCagtegory);
}

function cartModalStuff() {
  // Event Listeners & handlers ---------------------------------------------------

  const toggleCartModalOpen = () => {
    cartModal.classList.contains("open")
      ? cartModal.classList.remove("open")
      : cartModal.classList.add("open");
  };


  cartModalOpenButton.addEventListener("click", (e) => {
    console.log(`@cartModalOpenButton: ${cartItems.length} items in cart`);
    toggleCartModalOpen();
    renderCartItems();
    updateCartTotals();
  });

  const makeCartItem = (item) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="cart-item-left">
        <div class="cart-item-image-container">
          <img
          class="cart-item-image"
          src="${item.image}"
          alt="${item.title}" />
        </div>
    </div>

    <div class="cart-item-middle">
      <div class="cart-item-info-container">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-type">${item.type}</p>
        <p class="cart-item-year">${item.year}</p>
      </div>
    </div>

    <div class="cart-item-right">
      <div class="cart-item-selection-container">
        <p class="cart-item-print-size">Print Size: ${item.printSize}</p>
        <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
        <p class="cart-item-total-price">$${item.totalPrice}</p>
    </div>

      <button class="cart-modal-remove-button">
     &times;
      </button>

    </div>


    `;
    return cartItem;
  };

  const addRemoveButtonToCartItems = () => {
    const cartRemoveButtons = [
      ...document.querySelectorAll(".cart-modal-remove-button"),
    ];

    cartRemoveButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        handleCartItemRemove(e);
        updateCartTotals();
      });
    });
  };

  const handleCartItemRemove = (e) => {
    const cartItem = e.target.closest(".cart-item");
    const cartItemTitle =
      cartItem.querySelector(".cart-item-title").textContent;
    const cartItemIndex = cart.findIndex(
      (item) => item.title === cartItemTitle
    );
    cart.splice(cartItemIndex, 1);
    renderCartItems();
    updateCartTotals();
    saveCartToLocalStorage();
    console.log(`@handleCartItemRemove: ${cartItemTitle} removed`);
  };

  const renderCartItems = () => {
    cartList.innerHTML = "";
    cart.forEach((item) => {
      cartList.appendChild(makeCartItem(item));
    });
    addRemoveButtonToCartItems();
  };

  const updateCartTotals = () => {
    let subtotal = Number(0);
    cart.forEach((item) => {
      subtotal += Number(item.totalPrice);
    });

    subtotal = parseFloat(subtotal).toFixed(2);
    const tax = parseFloat(subtotal * 0.07).toFixed(2);
    const total = parseFloat(subtotal + tax).toFixed(2);
    cartSubtotal.innerHTML = `$${subtotal}`;
    cartTax.innerHTML = `$${tax}`;
    cartTotal.innerHTML = `$${total}`;
  };

  cartModalTotalCheckout.addEventListener('click', (e) => {
    handleCartCheckout();
  });
  

  const handleCartCheckout = () => {
    console.log("@handleCartCheckout");
    cart = [];
    updateCartTotals();
    saveCartToLocalStorage();
    closeCartModal();
    renderCartItems();
  };

  renderCartItems();
}

// Initialize
const init = () => {
  loadCartFromLocalStorage ? loadCartFromLocalStorage() : null;
  itemModalStuff();
  cartModalStuff();
};

init();
