export function updateUser(update) {
  return new Promise((resolve, reject) => {
    const updateUserAsync = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.177:3004/users/" + update.id,
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

export function fetchLoggedInUser(id) {
  return new Promise((resolve, reject) => {
    const fetchLoggedInUserAsync = async () => {
      try {
        const response = await fetch("http://192.168.0.177:3004/users/" + id);

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
    fetchLoggedInUserAsync();
  });
}
