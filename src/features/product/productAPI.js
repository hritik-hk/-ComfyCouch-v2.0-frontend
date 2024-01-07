export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    const getAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/variant");

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        reject(err);
      }
    }
    getAllProducts();
  });
}

export function fetchProductById({productID,variantID}) {
    return new Promise((resolve, reject) => {
      const getProductById = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/product/${productID}/${variantID}`)
  
          if (res.ok) {
            const productDetail = await res.json();
            console.log(productDetail)
            resolve(productDetail);
          } else {
            throw new Error("Something went wrong");
          }
        } catch (err) {
          reject(err);
        }
      }
      getProductById();
    });
  }

export async function fetchProductsByFilter({filters,sort,pagination}) {
  console.log(filters,sort,pagination);
  let queryString = "";

  for (let key in filters) {
    for (let item of filters[key]) {
      queryString += `${key}=${item}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log(queryString);


  return new Promise((resolve, reject) => {
    const getProductsByFilter = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/variant?" + queryString
        );

        if (response.ok) {
          const items = await response.json();
          const totalItems = response.headers.get('X-Total-Count');
          resolve({items:items,totalItems:totalItems});
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        reject(err);
      }
    };
    getProductsByFilter();
  });
}

export async function fetchCategories() {
  return new Promise((resolve, reject) => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        reject(err);
      }
    };
    getCategories();
  });
}

export async function fetchColors() {
  return new Promise((resolve, reject) => {
    const getColors = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/color");

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        reject(err);
      }
    };
    getColors();
  });
}

export async function fetchBrands() {
  return new Promise((resolve, reject) => {
    const getBrands = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/brand");

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        reject(err);
      }
    };
    getBrands();
  });
}

export function fetchVariantIdByColor(productID,color) {
  return new Promise((resolve, reject) => {
    const getProductVariantByColor = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/variant/${productID}/${color}`);
        if (res.ok) {
          const variantID = await res.json();
          resolve(variantID);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        reject(err);
      }
    }
    getProductVariantByColor();
  });
}

export function updateProduct(update) {
  return new Promise((resolve, reject) => {
    const updateProductAsync = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/product/" + update.product_id,
          {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("something went wrong, try again");
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    updateProductAsync();
  });
}