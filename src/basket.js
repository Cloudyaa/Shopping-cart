class Basket {
  constructor() {
    // miejsce w ktorym bedzie zawartosc koszyka
    this.items = this.loadFromLocalStorage();
  }

  add(item) {
    // metoda add doda nam item do basketu
    this.items.push(item);
    this.saveToLocalStorage();
  }

  clear() {
    this.items.length = 0;
    this.saveToLocalStorage();
  }

  remove(no) {
    // metoda usuwajaca z tablicy 1 element  (delete)
    // start jest no - 1 bo mamy indeksy od 1 a nie od 0
    this.items.splice(no - 1, 1);
    // po tym jak usuniesz to zapisz koszyk
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    // dowolna nazwa pod którą schowamy localStorage ; zawartosc koszyka z konstruktra
    //                        v                              v
    localStorage.setItem('basket-items', JSON.stringify(this.items));
    localStorage.setItem('basket-counter', JSON.stringify(this.getBasketSummary().length));
  }

  loadFromLocalStorage() {
    const itemsJson = localStorage.getItem('basket-items');
    const counterJson = localStorage.getItem('basket-counter');

    if (itemsJson === null) {
      return []; // nic nie ma w lS wiec chcę zwrócić pustą tablicę - pusty koszyk
    }
    // odczyt z localStorage - parsujemy string na obiekt i zwracamy zawartosc zapisaną w lS
    return JSON.parse(itemsJson);

    if (counterJson === null) {
      return 0;
    }
    return JSON.parse(counterJson);
  }

  getTotalValue() {
    // suma koszyka
    return this.items.reduce((prev, product) => prev + product.price, 0);
  }

  getBasketSummary() {
    return this.items
      .map((product, i) => ({
        id: i + 1,
        text: `${i + 1} - ${product.name} - ${product.price.toFixed(2)} GBP.`,
      }));
  }
}

class Product {
  constructor(productName, productPrice) {
    this.name = productName;
    this.price = productPrice;
  }

  setNewPrice(newPrice) {
    this.price = newPrice;
  }
}
