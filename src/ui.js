const btnAddToBasket = document.querySelectorAll('[data-name]');
const basketUl = document.querySelector('.basket-list');
const btnCheckOut = document.querySelector('.btn-buy-all');
const btnToggleBasket = document.querySelector('.toggle-basket');
const basketSection = document.querySelector('.basket');
const productsCounterInfo = document.querySelector('.products-counter-info');

// utworzenie obiektu koszyka
const basket = new Basket();

// usuwanie produktu z koszyka po wyszukaniu jego ID
const removeItem = event => {
  const id = Number(event.target.dataset.id);
  basket.remove(id);
  createBasket();
};

const createBasket = () => {
  if (localStorage.getItem('basket-items') === null) {
    basketUl.innerHTML = 'Your basket is empty';
  } else {
    basketUl.innerHTML = '';
  }

  for (const oneProductInfo of basket.getBasketSummary()) {
    const { text, id } = oneProductInfo; // destrukturyzacja obiektu

    const newLi = document.createElement('li'); // utworzy sie w HTML <li>
    // dzieki destrukturyzacji mozna zapisac skrótowo
    newLi.innerText = text; // oneProductInfo.text;
    newLi.addEventListener('click', removeItem);
    newLi.dataset.id = id; // oneProductInfo.id;
    basketUl.appendChild(newLi);
  }

  const basketTotalValue = basket.getTotalValue();
  btnCheckOut.innerHTML = `Your total is &#163;${basketTotalValue.toFixed(2)}.<br> Click here to check out.`;

  btnCheckOut.disabled = basketTotalValue === 0;

  // Pojawienie się informacji o ilości produktów w koszyku
  const productsCounter = basket.getBasketSummary().length;
  if (localStorage.getItem('basket-counter') === null) {
    productsCounterInfo.innerText = '0';
  } else {
    productsCounterInfo.innerText = productsCounter;
  }
};

const addToBasket = event => {
  // pobranie nazwy produktu z html data-name
  const { name } = event.target.dataset;
  // pobranie ceny produktu z html data-price
  const price = Number(event.target.dataset.price);

  // utworzenie obiektu nowego produktu za kazdym kliknieciem w button
  const newProduct = new Product(name, price);

  // dodawanie produktu do koszyka
  basket.add(newProduct);

  createBasket();
};

const checkOut = () => {
  alert(`You have bought food worth of ${basket.getTotalValue().toFixed(2)}GBP. You filthy animal!!`);
  basket.clear();
  createBasket();
  basketUl.innerHTML = 'Your basket is empty';
};

// petla aby dzialalo dla kazdego buttonu
for (const btn of btnAddToBasket) {
  btn.addEventListener('click', addToBasket);
}

btnCheckOut.addEventListener('click', checkOut);

// button show/hide basket
const toggleBasket = () => {
  const basketVisibility = basketSection.classList.toggle('hidden');
  if (basketVisibility) {
    btnToggleBasket.innerText = 'Show basket';
  } else {
    btnToggleBasket.innerText = 'Hide basket';
  }
};

btnToggleBasket.addEventListener('click', toggleBasket);

createBasket();
