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


export function checkUser(loginData){
    return new Promise((resolve,reject)=>{
        const checkUserAsync= async()=>{
            try{
                const response= await fetch("http://localhost:8080/auth/login",{
                    method:"POST",
                    body:JSON.stringify(loginData),
                    headers:{'content-type':'application/json'}
                })

                const data= await response.json();

                if(!response.ok){
                    const message= data.error || 'something went wrong, try again';
                    throw new Error(message);
                }
                
                resolve(data);
            }
            catch(error){
                reject(error)
            }
        }
        checkUserAsync()
    })
}


export function signOut(userId){
    return new Promise((resolve,reject)=>{
        const signOutAsync= async()=>{
            try{
                //backend work, just testing front-end here
                resolve('success, userId:'+userId)
            }
            catch(error){
                reject(error)
            }
        }
        signOutAsync()
    })
}