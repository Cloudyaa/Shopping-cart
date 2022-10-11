const addProductForm = document.querySelector('.form-add-product');
const nameInput = document.querySelector('[name="product-name"]');
const priceInput = document.querySelector('[name="product-price"]');
const countInput = document.querySelector('[name="product-count"]');
const classInput = document.querySelector('[name="product-class"]');
const imgSrcInput = document.querySelector('[name="product-img-src"]');
const productsUl = document.querySelector('.product-list');
const btnToggleAdmin = document.querySelector('.toggle-admin');
const adminSection = document.querySelector('.admin-add-product');

const saveProductsToLocalStorage = (name, price, count, className, imgSrc) => {

  // if null then return empty []
  const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];

  // oldProductsList.push({
  //  name: name,
  //  price: price,
  // });
  productsList.push({
    name, price, count, className, imgSrc,
  });
  localStorage.setItem('shop-products', JSON.stringify(productsList));
};

const addProductToShop = (name, price, count, className, imgSrc) => {
  const newLi = document.createElement('li');
  const newProductName = document.createElement('p');
  const newProductPrice = document.createElement('p');
  const newDiv = document.createElement('div');
  const newBtn = document.createElement('button');

  newLi.classList.add('item-name');
  newDiv.classList.add('image');
  newDiv.classList.add(className);
  newProductName.classList.add('product-info');
  newProductPrice.classList.add('product-info', 'product-price');

  newDiv.style.backgroundImage = `url("${imgSrc}")`;

  newBtn.classList.add('add-to-basket');

  newBtn.dataset.name = name;
  // dataset stores data as strings thats why its converted
  newBtn.dataset.price = String(price);

  newBtn.addEventListener('click', addToBasket);

  newProductName.innerText = name;
  newProductPrice.innerHTML = `&#163; ${price.toFixed(2)} / ${count}`;
  newBtn.innerText = 'Add';

  // add new <p> and <li>
  newLi.appendChild(newDiv);
  newDiv.appendChild(newProductName);
  newDiv.appendChild(newProductPrice);
  newDiv.appendChild(newBtn);
  productsUl.appendChild(newLi);
};

const handleAddProductFormSubmit = event => {
  event.preventDefault();
  const nameFromInput = nameInput.value;
  const priceFromInput = Number(priceInput.value);
  const countFromInput = countInput.value;
  const classFromInput = classInput.value;
  const imgSrcFromInput = imgSrcInput.value;

  addProductToShop(nameFromInput, priceFromInput, countFromInput, classFromInput, imgSrcFromInput);
  saveProductsToLocalStorage(nameFromInput, priceFromInput, countFromInput, classFromInput, imgSrcFromInput);
};

const loadProductsFromLocalStorage = () => {
  const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];

  for (const {
    name, price, count, className, imgSrc,
  } of productsList) {
    addProductToShop(name, price, count, className, imgSrc);
  }
};


addProductForm.addEventListener('submit', handleAddProductFormSubmit);


btnToggleAdmin.addEventListener('click', () => {
  const isAdminMode = adminSection.classList.toggle('hidden');
  if (isAdminMode) {
    btnToggleAdmin.innerText = 'Turn on admin mode';
    btnToggleAdmin.removeAttribute('href');
  } else {
    btnToggleAdmin.innerText = 'Turn off admin mode';
    btnToggleAdmin.setAttribute('href', '#admin-mode');
  }
});

loadProductsFromLocalStorage();
