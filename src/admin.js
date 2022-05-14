const addProductForm = document.querySelector('.form-add-product');
const nameInput = document.querySelector('[name="product-name"]');
const priceInput = document.querySelector('[name="product-price"]');
const countInput = document.querySelector('[name="product-count"]');
const classInput = document.querySelector('[name="product-class"]');
const imgSrcInput = document.querySelector('[name="product-img-src"]');
const productsUl = document.querySelector('.product-list');
const btnToggleAdmin = document.querySelector('.toggle-admin');
const adminSection = document.querySelector('.admin-add-product');
const btnToggleBasket = document.querySelector('.toggle-basket');
const basketSection = document.querySelector('.basket');


const saveProductsToLocalStorage = (name, price, count, className, imgSrc) => {
    // druga metoda - inna niż w przypadku koszyka
    // jesli trafi na wartosc nullową to zwróci pustą tablicę
    // a jeśli nie jest null to zrobi parse i poda to co w lS
    const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];

    // dodanie nowego produktu jako ostani elemnt tablicy
    // to niżej to to samo co to:
    // oldProductsList.push({
    //  name: name,
    //  price: price,
    // });
    productsList.push({name, price, count, className, imgSrc});
    localStorage.setItem('shop-products', JSON.stringify(productsList));

}

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
    newProductPrice.classList.add('product-info','product-price');

    newDiv.style.backgroundImage = `url("${imgSrc}")`;

    // dodanie class='add-to-basket' w <button>
    newBtn.classList.add('add-to-basket');

    // dodanie class='add-to-basket' w <button>
    newBtn.classList.add('add-to-basket');
    // dodanie data-name=' ' w <button>
    newBtn.dataset.name = name;
    // dodanie data-price=' ' w <button>, zmiana na string bo dataset przechowuje dane jako stringi
    newBtn.dataset.price = String(price);
    // obsluga nowego przycisku
    newBtn.addEventListener('click', addToBasket);

    newProductName.innerText = name;
    newProductPrice.innerHTML = `&#163; ${price.toFixed(2)} / ${count}`;
    newBtn.innerText = 'Add';

    // dodanie nowego <p> i <button> w <li>
    newLi.appendChild(newDiv);
    newDiv.appendChild(newProductName);
    newDiv.appendChild(newProductPrice);
    newDiv.appendChild(newBtn);
    // dodanie nowego <li> do listy produktów
    productsUl.appendChild(newLi);

}

// obsłuż wysłanie formularza do dodania produktu
const handleAddProductFormSubmit = event => {

    // zablokowanie domyslnego dzialania przegladarki czyli wylaczenie zeby formularz się przesyłał po kliknięciu lub enter
    event.preventDefault();

    // pobranie wartosci z przeslanego formularza
    const nameFromInput = nameInput.value;
    const priceFromInput = Number(priceInput.value);
    const countFromInput = countInput.value;
    const classFromInput = classInput.value;
    const imgSrcFromInput = imgSrcInput.value;

    addProductToShop(nameFromInput, priceFromInput, countFromInput, classFromInput, imgSrcFromInput);
    saveProductsToLocalStorage(nameFromInput, priceFromInput, countFromInput, classFromInput, imgSrcFromInput);
}

const loadProductsFromLocalStorage = () => {
    const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];

    // for const product (destrukturyzacja)
    for (const {name, price, count, className, imgSrc} of productsList) {
        addProductToShop(name, price, count, className, imgSrc);
    }

}

// przycisk dodania produktu do sklepu
addProductForm.addEventListener('submit', handleAddProductFormSubmit    );

const toggleBasket = () => {
    const basketVisibility = basketSection.classList.toggle('hidden');
    if (basketVisibility){
        btnToggleBasket.innerText = 'Show basket';
    } else {
        btnToggleBasket.innerText = 'Hide basket';
    }
}

 btnToggleBasket.addEventListener('click', toggleBasket);

// przycisk on/off admin-mode
btnToggleAdmin.addEventListener('click', () => {
    const isAdminMode = adminSection.classList.toggle('hidden');
    if(isAdminMode) {
        btnToggleAdmin.innerText = 'Turn on admin mode';
        btnToggleAdmin.removeAttribute('href');
    } else {
        btnToggleAdmin.innerText = 'Turn off admin mode';
        btnToggleAdmin.setAttribute('href','#admin-mode');

    }
});

loadProductsFromLocalStorage();
