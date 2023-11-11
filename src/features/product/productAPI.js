export async function fetchAllProducts(){
        const response= await fetch('http://192.168.0.177:3004/products')
        if(response.status){
            const data= response.json()
            return data
        }
        else{
            return new Error("some error occurred")
        }

}