export function createUser(userData){
    return new Promise((resolve,reject)=>{
        const createUserAsync= async()=>{
            try{
                const response= await fetch('http://192.168.0.177:3004/users',{
                    method:'POST',
                    body:JSON.stringify(userData),
                    headers:{'content-type':'application/json'}
                })
                if(!response.ok){
                    throw new Error('something went wrong')
                }
                const data= await response.json()
                resolve(data)
            }
            catch(error){
                reject(error)
            }
        }
        createUserAsync()
    })
}