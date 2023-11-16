export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    const getAllProducts = async () => {
      try {
        const response = await fetch("http://192.168.0.177:3004/variants");

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

export async function fetchProductsByFilter(filter) {
  console.log(filter);
  let queryString = "";

  for (let key in filter) {
    for (let item of filter[key]) {
      queryString += `${key}=${item}&`;
    }
  }
  return new Promise((resolve, reject) => {
    const getProductsByFilter = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.177:3004/variants?" + queryString
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
        const response = await fetch("http://192.168.0.177:3004/categories");

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
        const response = await fetch("http://192.168.0.177:3004/colors");

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
        const response = await fetch("http://192.168.0.177:3004/brands");

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
