class Basket {
  constructor() {
    this.items = this.loadFromLocalStorage();
  }

  add(item) {
    this.items.push(item);
    this.saveToLocalStorage();
  }

  clear() {
    this.items.length = 0;
    this.saveToLocalStorage();
  }

  remove(no) {
    //  no - 1 caused by indexes from 1, not 0
    this.items.splice(no - 1, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('basket-items', JSON.stringify(this.items));
    localStorage.setItem('basket-counter', JSON.stringify(this.getBasketSummary().length));
  }

  loadFromLocalStorage() {
    const itemsJson = localStorage.getItem('basket-items');
    const counterJson = localStorage.getItem('basket-counter');

    if (itemsJson === null) {
      return [];
    }

    return JSON.parse(itemsJson);

    if (counterJson === null) {
      return 0;
    }
    return JSON.parse(counterJson);
  }

  getTotalValue() {
    // basket total
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
