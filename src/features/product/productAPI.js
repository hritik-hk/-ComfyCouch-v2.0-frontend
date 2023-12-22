export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    const getAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/variant");

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
          const res = await fetch(`http://localhost:8080/product/${productID}/${variantID}`)
  
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

export async function fetchProductsByFilter(filter) {
  console.log(filter);
  let queryString = "";

  for (let key in filter) {
    for (let item of filter[key]) {
      queryString += `${key}=${item}&`;
    }
  }

  console.log(queryString);


  return new Promise((resolve, reject) => {
    const getProductsByFilter = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/variant?" + queryString
        );

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
    getProductsByFilter();
  });
}

export async function fetchCategories() {
  return new Promise((resolve, reject) => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/category");

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
        const response = await fetch("http://localhost:8080/color");

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
        const response = await fetch("http://localhost:8080/brand");

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
        const res = await fetch(`http://localhost:8080/variant/${productID}/${color}`);
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