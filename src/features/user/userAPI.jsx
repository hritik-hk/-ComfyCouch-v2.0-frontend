export function updateUser(update) {
  return new Promise((resolve, reject) => {
    const updateUserAsync = async () => {
      try {
        const response = await fetch(
          "/api/user/",
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
        console.log(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    updateUserAsync();
  });
}

export function fetchLoggedInUser() {
  return new Promise((resolve, reject) => {
    const fetchLoggedInUserAsync = async () => {
      try {
        const response = await fetch("/api/user/own");

        if (!response.ok) {
          throw new Error("something went wrong, try again");
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    fetchLoggedInUserAsync();
  });
}

export function fetchLoggedInUserOrders() {
  return new Promise((resolve,reject) =>{
    const fetchLoggedInUserOrdersAsync = async () => {
      try {
        const response = await fetch("/api/order/");

        if (!response.ok) {
          throw new Error("something went wrong, try again");
        }
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    fetchLoggedInUserOrdersAsync();
  }
  );
}
