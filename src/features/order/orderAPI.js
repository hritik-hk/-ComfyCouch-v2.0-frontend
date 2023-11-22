export function createOrder(order){
    return new Promise((resolve, reject) => {
        const createOrderAsync = async () => {
          try {
            const response = await fetch(" http://192.168.0.177:3004/orders", {
              method: "POST",
              body: JSON.stringify(order),
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
        createOrderAsync();
      });
}