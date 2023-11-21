export function addToCart(item) {
  return new Promise((resolve, reject) => {
    const addToCartAsync = async () => {
      try {
        const response = await fetch(" http://192.168.0.177:3004/cart", {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("something went wrong, try again");
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    addToCartAsync();
  });
}


export function fetchItemsByUserId(userId) {
  return new Promise((resolve, reject) => {
    const fetchItemsByUserIdAsync = async () => {
      try {
        const response = await fetch("http://192.168.0.177:3004/cart?userID="+userId)
        if (!response.ok) {
          throw new Error("something went wrong, try again");
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    fetchItemsByUserIdAsync();
  });
}



