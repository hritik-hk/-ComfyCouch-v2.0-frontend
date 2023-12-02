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


export function checkUser(userData){
    return new Promise((resolve,reject)=>{
        const checkUserAsync= async()=>{
            try{
                const {email,password}=userData

                const response= await fetch('http://192.168.0.177:3004/users?email='+email)

                if(!response.ok){
                    throw new Error('something went wrong, try again')
                }
                const data= await response.json()

                //only for testing frontend
                if(data.length){
                    if(password===data[0].password){
                        resolve(data[0])
                    }else{
                        reject('wrong credentials')
                    }
                }
                else{
                    reject('wrong credentials')
                }
            
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