import { galleryItemArray } from "./gallery-items.js";
console.log(galleryItemArray);

const masonGallery = document.getElementById("mason-gallery");
const cart = document.getElementById("cart");

function addToCart(title, srcset) {
  // Containers ------------------------------------------------------------------------------------
  // elements
  const cartItem = document.createElement("div");
  const cartItemQuantityContainer = document.createElement("div");
  const cartItemImageContainer = document.createElement("div");

  // classes
  cartItem.classList.add("cart-item");
  cartItemQuantityContainer.classList.add("cart-item-quantity-button-container");
  cartItemImageContainer.classList.add("cart-item-image-container");

  //components  ------------------------------------------------------------------------------------
  const cartItemTitle = document.createElement("h3");
  const cartItemImage = document.createElement("img");
  cartItemTitle.classList.add("cart-item-title");
  cartItemImage.classList.add("cart-item-image");
  cartItemTitle.textContent = "BLAHADFS";

  // Print Sizes ------------------------------------------------------------------------------------
  const printSizeOptions = [
    { value: "4x6", text: "8x10", price: 4.99 },
    { value: "5x7", text: "5x7", price: 4.99 },
    { value: "8x10", text: "8x10", price: 7.99 },
    { value: "11x14", text: "11x14", price: 9.99 },
    { value: "16x20", text: "16x20", price: 14.99 },
    { value: "20x24", text: "20x24", price: 19.99 },
    { value: "24x36", text: "24x36", price: 24.99 },
    { value: "30x40", text: "30x40", price: 29.99 },
    { value: "40x60", text: "40x60", price: 39.99 },
  ];

  const printSizeSelector = document.createElement("select");
  const printSizeSelectorContainer = document.createElement("label");
  printSizeSelectorContainer.classList.add("print-size-selector-container");
  printSizeSelectorContainer.textContent = "Print size: ";
  printSizeSelectorContainer.for = "print-size-selector";
  printSizeSelector.classList.add("print-size-selector");
  printSizeSelector.onchange = (e) => {
    console.log(e.target.value);
    console.log(e.target.options[e.target.selectedIndex].price);
    price = e.target.options[e.target.selectedIndex].price;
    cartItemTotal.textContent = `Total: $${(price * quantity).toFixed(2)} x${quantity}`;
  };

  printSizeOptions.forEach((option) => {
    const printSizeOption = document.createElement("option");
    printSizeOption.value = option.value;
    printSizeOption.price = option.price;
    printSizeOption.text = `${option.text} - $${option.price}`;
    printSizeSelector.add(printSizeOption);
  });

  printSizeSelectorContainer.appendChild(printSizeSelector);

  // ----------------------------------------------------------------------------------------------
  // Quantity ------------------------------------------------------------------------------------

  //quantity variables
  let quantity = 1;
  // let price = 4.99;
  let price = printSizeSelector.options[printSizeSelector.selectedIndex].price;

  //displays
  const cartItemTotal = document.createElement("p");
  cartItemTotal.classList.add("cart-item-total");
  cartItemTotal.textContent = `Total: $${price}  x${quantity}`;


  const cartItemQuantity = document.createElement("p");
  cartItemQuantity.classList.add("cart-item-quantity");
  cartItemQuantity.textContent = `${quantity}`;

  //buttons
  const cartItemQuantityUp = document.createElement("button");
  cartItemQuantityUp.classList.add("cart-item-quantity-up");
  cartItemQuantityUp.textContent = "+";

  const cartItemQuantityDown = document.createElement("button");
  cartItemQuantityDown.classList.add("cart-item-quantity-down");
  cartItemQuantityDown.textContent = "-";

  const cartItemRemove = document.createElement("button");
  cartItemRemove.classList.add("cart-item-remove");
  cartItemRemove.textContent = "X";

  //event listeners
  cartItemQuantityUp.addEventListener("click", () => {
    quantity++;
    cartItemQuantity.textContent = `${quantity}`;
    cartItemTotal.textContent = `Total: $${(price * quantity).toFixed(2)}  x${quantity}`;
    console.log(`quantity up: ${quantity} @cartItemQuantityUp`);
  });

  cartItemQuantityDown.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      cartItemQuantity.textContent = `${quantity}`;
      cartItemTotal.textContent = `Total: $${(price * quantity).toFixed(2)}  x${quantity}`;
      console.log(`quantity down: ${quantity} @cartItemQuantityDown`);
    } else {
      console.log(`quantity zero @cartItemQuantityDown`);
    }
  });

  cartItemRemove.addEventListener("click", function () {
    console.log("remove @cartItemRemove");
    cartItem.remove();
  });

  // classes
  cartItemQuantityUp.classList.add("cart-item-quantity-up");
  cartItemQuantityDown.classList.add("cart-item-quantity-down");
  cartItemRemove.classList.add("cart-item-remove");

  const cardItemQuantityLabel = document.createElement("label");
  cardItemQuantityLabel.classList.add("cart-item-quantity-label");
  cardItemQuantityLabel.textContent = "Quantity: ";
  
  cardItemQuantityLabel.for = "cart-item-quantity";


  //attach
  cartItemQuantityContainer.append(cardItemQuantityLabel, cartItemQuantityDown, cartItemQuantity, cartItemQuantityUp);
  // ----------------------------------------------------------------------------------------------
  // Image ------------------------------------------------------------------------------------
  cartItemTitle.classList.add("cart-item-title");
  cartItemImage.classList.add("cart-item-image");

  cartItemTitle.textContent = title;
  cartItemImage.srcset = srcset;
  cartItemImage.src = srcset.split(",")[0].trim();
  cartItemImage.alt = title;

  cartItemImageContainer.append(cartItemImage);
  // ----------------------------------------------------------------------------------------------

  cartItem.append(
    cartItemTitle,
    cartItemImageContainer,
    printSizeSelectorContainer,
    cartItemTotal,
    cartItemRemove,
    cartItemQuantityContainer
  );

  cart.appendChild(cartItem);
}

function makeMasonItem(type, title, subtitle, date, hqSrc, lqSrc, description) {
  //Containers ------------------------------------------------------------------------------------
  // elements
  const masonItem = document.createElement("div"); //container
  const masonItemImageContainer = document.createElement("div"); //image container
  const masonItemButtonContainer = document.createElement("div"); //button container
  const masonItemTextContainer = document.createElement("div"); //text container
  // classes
  masonItem.classList.add("mason-item");
  masonItemImageContainer.classList.add("mason-item-image-container");
  masonItemButtonContainer.classList.add("mason-item-button-container");
  masonItemTextContainer.classList.add("mason-item-text-container");

  // ----------------------------------------------------------------------------------------------

  //Item text cotent ------------------------------------------------------------------------------
  //elements
  const masonItemType = document.createElement("p"); //type
  const masonItemTitle = document.createElement("h3");
  const masonItemSubtitle = document.createElement("h4");
  const masonItemDate = document.createElement("p");
  const masonItemDescription = document.createElement("p");

  // classes
  masonItem.classList.add("mason-item", "mason-hide");
  masonItemType.classList.add("mason-item-type", "mason-hide");
  masonItemTitle.classList.add("mason-item-title", "mason-hide");
  masonItemSubtitle.classList.add("mason-item-subtitle", "mason-hide");
  masonItemDate.classList.add("mason-item-date", "mason-hide");
  masonItemDescription.classList.add("mason-item-description", "mason-hide");
  //text content
  masonItemType.textContent = type;
  masonItemTitle.textContent = title;
  masonItemSubtitle.textContent = subtitle;
  masonItemDate.textContent = date;
  masonItemDescription.textContent = description;

  //attach
  masonItemTextContainer.append(
    masonItemType,
    masonItemTitle,
    masonItemSubtitle,
    masonItemDate,
    masonItemImageContainer,
    masonItemDescription
  );
  masonItem.append(masonItemTextContainer);
  //  ----------------------------------------------------------------------------------------------

  //  Mason item image ------------------------------------------------------------------------------
  //elements
  const masonItemImage = document.createElement("img");
  //classes
  masonItemImage.classList.add("mason-item-image");

  //content
  masonItemImage.src = lqSrc;
  masonItemImage.srcset = `${lqSrc} 1x, ${hqSrc} 2x`;
  masonItemImage.alt = `${title}, ${subtitle}`;

  //attach
  masonItemImageContainer.append(masonItemImage);
  masonItem.append(masonItemImageContainer);
  //  ----------------------------------------------------------------------------------------------

  //  Mason item buttons ----------------------------------------------------------------------------
  //elements
  const masonItemAddToCardButton = document.createElement("button");
  const masonItemCloseButton = document.createElement("button");

  //classes
  masonItemAddToCardButton.classList.add(
    "mason-item-add-to-cart-button",
    "mason-button"
  );
  masonItemCloseButton.classList.add("mason-item-close-button", "mason-button");

  //content
  masonItemAddToCardButton.textContent = "Add to Cart";
  masonItemCloseButton.textContent = "X";

  //attach
  masonItem.append(masonItemAddToCardButton, masonItemCloseButton);

  //event listenrs
  masonItemAddToCardButton.addEventListener("click", (e) => {
    e.stopPropagation();

    const title = masonItemTitle.textContent;
    const srcset = masonItemImage.srcset;
    addToCart(title, srcset);

    removeActiveClass();
    console.log("add to cart");
  });

  masonItemCloseButton.addEventListener("click", (e) => {
    e.stopPropagation(); //prevents click on parent
    removeActiveClass();
    console.log("close");
  });

  // ----------------------------------------------------------------------------------------------

  // More stuff
  //Makes item active on click
  masonItem.addEventListener("click", (e) => {
    e.stopPropagation();
    addActiveClass();
  });

  const removeActiveClass = () => {
    masonItem.classList.remove("mason-item--active");
  };

  //Selects all mason items and removes active class from them, then attaches active class to clicked item
  const addActiveClass = () => {
    const allMasonItems = document.querySelectorAll(".mason-item");
    allMasonItems.forEach((item) => {
      item.classList.remove("mason-item--active");
    });
    masonItem.classList.add("mason-item--active");
    console.log("open");
  };

  return masonItem;
}

function addMasonItemsToGalleryFromArray(array) {
  array.forEach((item) => {
    const masonItem = makeMasonItem(
      item.type,
      item.title,
      item.subtitle,
      item.date,
      item.hqSrc,
      item.lqSrc,
      item.description
    );
    masonGallery.appendChild(masonItem);
  });
}

addMasonItemsToGalleryFromArray(galleryItemArray);
