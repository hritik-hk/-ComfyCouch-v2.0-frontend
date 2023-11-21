import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addToCart, fetchItemsByUserId } from "./cartAPI"


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
    }
})

export default cartSlice.reducer

