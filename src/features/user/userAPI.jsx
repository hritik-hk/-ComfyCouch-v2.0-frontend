export function updateUser(update) {
  return new Promise((resolve, reject) => {
    const updateUserAsync = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/",
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
        const response = await fetch("http://localhost:8080/user/own");

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
        const response = await fetch("http://localhost:8080/order/");

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
