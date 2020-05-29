function getProductImagePath(productId, imageId) {
  return `/products/${productId}/images/${imageId}`;
}

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchAndHandleErrors(path, opts) {
    const res = await fetch(this.baseUrl + path, opts);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  async fetchAndHandleErrorsJson(path, opts) {
    const res = await this.fetchAndHandleErrors(path, opts);
    return res.json();
  }

  async getProduct(productId) {
    return this.fetchAndHandleErrorsJson(`/products/${productId}`);
  }

  async getProducts() {
    return this.fetchAndHandleErrorsJson("/products");
  }

  async createNewProduct({ title, manufacturer, price, description, images }) {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("manufacturer", manufacturer);
    formData.append("price", price);
    formData.append("description", description);

    for (const image of images) {
      formData.append("images", image);
    }

    return this.fetchAndHandleErrorsJson("/products", {
      method: "POST",
      body: formData
    });
  }

  async getProductImage(productId, imageId) {
    const res = await this.fetchAndHandleErrors(getProductImagePath(productId, imageId));

    const contentType = res.headers.get("content-type");
    const stream = res.body;
    return {
      contentType,
      stream
    };
  }

  getProductImageUrl(productId, imageId) {
    return this.baseUrl + getProductImagePath(productId, imageId);
  }
}

const client = new Client("http://localhost:3000");

export default client;
