import { setLocalStorage } from "./utils.mjs";

export class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage(this.productId, this.product);
  }

  async renderProductDetails() {
    const productDetails = await this.dataSource.findProductById(this.productId);
    this.product = productDetails;
    setLocalStorage(this.productId, this.product)

    const html = `
      <h3>${this.product.Brand.Name}</h3>

      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.NameWithoutBrand}"
      />

      <p class="product-card__price">${this.product.ListPrice}</p>

      <p class="product__color">${this.product.Colors[0].ColorName}</p>

      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
      </div>
    `
  }
}