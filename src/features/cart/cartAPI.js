export function addToCart(item) {
  return new Promise((resolve, reject) => {
    const addToCartAsync = async () => {
      try {
        const response = await fetch("http://localhost:8080/cart", {
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

export function fetchItemsByUserId() {
  return new Promise((resolve, reject) => {
    const fetchItemsByUserIdAsync = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/cart"
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
    fetchItemsByUserIdAsync();
  });
}

export function updateCart(update) {
  return new Promise((resolve, reject) => {
    const updateCartAsync = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/cart/" + update.id,
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
    updateCartAsync();
  });
}

export function deleteInCart(itemId) {
  return new Promise((resolve, reject) => {
    const deleteInCartAsync = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/cart/" + itemId,
          {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("something went wrong, try again");
        }
        resolve(itemId);
      } catch (error) {
        reject(error);
      }
    };
    deleteInCartAsync();
  });
}

export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise((resolve, reject) => {
    const resetCartAsync = async () => {
      try {
        const response = await fetchItemsByUserId();
        const items = response;

        for (let item of items) {
          await deleteInCart(item.id);
        }
        resolve({ status: "success" });
      } catch (err) {
        reject(err);
      }
    };
    resetCartAsync();
  });
}
