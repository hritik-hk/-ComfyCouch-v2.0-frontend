import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addToCart, fetchItemsByUserId, updateCart,deleteInCart, resetCart } from "./cartAPI"


export const addToCartAsync= createAsyncThunk(
    'cart/addToCart',
    async (item)=>{
        const data = await addToCart(item)
        return data
    }
)


export const fetchItemsByUserIdAsync= createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userId)=>{
        const data = await fetchItemsByUserId(userId)
        return data
    }
)

export const updateCartAsync= createAsyncThunk(
    'cart/updateCart',
    async (update)=>{
        const data = await updateCart(update)
        return data
    }
)

export const deleteInCartAsync= createAsyncThunk(
    'cart/deleteInCart',
    async (update)=>{
        const data = await deleteInCart(update)
        return data
    }
)

export const resetCartAsync= createAsyncThunk(
    'cart/resetCart',
    async(userID)=>{
        const response=await resetCart(userID);
        return response;
    }
)

export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        status:'idle',
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addToCartAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(addToCartAsync.fulfilled,(state,action)=>{
            state.cartItems.push(action.payload)
            state.status='idle'
            state.error=null
        })
        .addCase(addToCartAsync.rejected,(state,action)=>{
            state.status='idle'
            state.error=action.error.message
        })
        .addCase(fetchItemsByUserIdAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
            state.cartItems=action.payload
            state.status='idle'
            state.error=null
        })
        .addCase(fetchItemsByUserIdAsync.rejected,(state,action)=>{
            state.status='idle'
            state.error=action.error.message
        })
        .addCase(updateCartAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(updateCartAsync.fulfilled,(state,action)=>{
            const index= state.cartItems.findIndex((item)=>item.id===action.payload.id)
            state.cartItems[index]=action.payload
            state.status='idle'
            state.error=null
        })
        .addCase(updateCartAsync.rejected,(state,action)=>{
            state.status='idle'
            state.error=action.error.message
        })
        .addCase(deleteInCartAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(deleteInCartAsync.fulfilled,(state,action)=>{
            state.cartItems=state.cartItems.filter((item)=>item.id!==action.payload)
            state.status='idle'
            state.error=null
        })
        .addCase(deleteInCartAsync.rejected,(state,action)=>{
            state.status='idle'
            state.error=action.error.message
        })
        .addCase(resetCartAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(resetCartAsync.fulfilled,(state)=>{
            state.status='idle'
            state.error=null
        })
        .addCase(resetCartAsync.rejected,(state,action)=>{
            state.status='idle'
            state.error=action.error.message
        })
    }
})

export default cartSlice.reducer

