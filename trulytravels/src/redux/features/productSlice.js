import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import productsData from '../../data/productData';
import Swal from 'sweetalert2';


export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: productsData,
    allUniqueCategory : [...new Set(productsData.map(category => category.category))],
    allUniqueTag : [...new Set(productsData.map(tag => tag.tag))],
    specificProduct:productsData[0],

    addToBooking: typeof window !== 'undefined' && localStorage.getItem('addToBooking') ?
    JSON.parse(localStorage.getItem('addToBooking')) : [],

    wishlist:typeof window !== 'undefined' && localStorage.getItem('addToWishList') ? 
    JSON.parse(localStorage.getItem('addToWishList')) : [],
  },
  reducers: {
    // specificProduct
    specificItem:(state,{payload}) => {
      state.specificProduct = state.products.find(product => product.id === payload)
    },
    // addToProduct
    addToProduct: (state, { payload }) => {
      const itemIndex = state.addToBooking.findIndex((item) => item.id === payload.id);
      if (itemIndex >= 0) {
        state.addToBooking[itemIndex].bookingQuantity += 1
        toast.info('Increase Product Quantity', {
          position: 'top-left'
        })
      }
      else {
        const tempProduct = { ...payload, bookingQuantity: 1 };
        state.addToBooking.push(tempProduct)
        toast.success(`${payload.title} added to booking`, {
          position: 'top-left'
        })
      }

      localStorage.setItem('addToBooking', JSON.stringify(state.addToBooking))
    },
    // removeProduct
    removeProduct: (state, { payload }) => {
      state.addToBooking = state.addToBooking.filter((booking) => booking.id !== payload);
      toast.error(`remove from your booking`, {
        position: 'top-left'
      })

      localStorage.setItem('addToBooking', JSON.stringify(state.addToBooking))
    },
    // decreaseCart
    decreaseCart: (state, { payload }) => {
      const itemIndexNumber = state.addToBooking.findIndex(bookingItem => bookingItem.id === payload.id);


      if (state.addToBooking[itemIndexNumber].bookingQuantity > 1) {
        state.addToBooking[itemIndexNumber].bookingQuantity -= 1

        toast.error(`Decreased booking quantity`, {
          position: 'top-left'
        })
      }

      else if (state.addToBooking[itemIndexNumber].bookingQuantity === 1) {
        state.addToBooking = state.addToBooking.filter((booking) => booking.id !== payload.id);
        toast.error(`${payload.title} remove from booking`, {
          position: 'top-left'
        })
      }

      localStorage.setItem('addToBooking', JSON.stringify(state.addToBooking))

    },

    // clear booking
    clearCart:(state,action) => {
      state.addToBooking = [];
      localStorage.setItem('addToBooking', JSON.stringify(state.addToBooking))
    },
    // add wish list product
    addToWishList:(state,{payload}) => {
      state.wishlist.push(payload);
      Swal.fire({
        icon: 'success',
        title: `${payload.title} `,
        text: 'addedd to your wishlist', 
     })
     localStorage.setItem('addToWishList', JSON.stringify(state.wishlist))
    },
    // remove wishlist product
    removeWishListProduct:(state,{payload}) => {
      state.wishlist = state.wishlist.filter(product => product.id !== payload.id);
      toast.error(`${payload.title} remove from your wishlist`, {
        position: 'top-left'
      })

    localStorage.setItem('addToWishList', JSON.stringify(state.wishlist))
    }

  },
})

// Action creators are generated for each case reducer function
export const { addToProduct, removeProduct, decreaseCart,specificItem,clearCart,addToWishList,removeWishListProduct } = productSlice.actions;

export const selectCartProduct = (state) => state.products.addToBooking;
export default productSlice.reducer;