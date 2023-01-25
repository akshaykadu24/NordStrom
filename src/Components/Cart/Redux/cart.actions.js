// Cart Actions here
// Cart Actions here
import axios from "axios";

import {
  GET_CART_ITEMS_LOADING,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  ADD_ITEM_TO_CART_LOADING,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_ERROR,
  // UPDATE_CART_ITEMS_LOADING,
  // UPDATE_CART_ITEMS_SUCCESS,
  // UPDATE_CART_ITEMS_ERROR,
  REMOVE_CART_ITEMS_LOADING,
  REMOVE_CART_ITEMS_SUCCESS,
  REMOVE_CART_ITEMS_ERROR,
  Increment,
  Decrement
} from "./cart.types";

export const fetchProducts = async (disptach) => {
  disptach({ type: GET_CART_ITEMS_LOADING });
  return axios.get("https://nord-stom-data.vercel.app/Cartitems")
    .then((res) => {
      console.log(res.data);
      return disptach({ type: GET_CART_ITEMS_SUCCESS, payload: res.data });
    })
    .catch(() => disptach({ type: GET_CART_ITEMS_ERROR }));
};

export const additem = (cartInfo) => async(dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_LOADING });
  return axios.post("https://nord-stom-data.vercel.app/Cartitems", { ...cartInfo })
    .then((res) => {
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: res.data });
    })
    .catch(() => dispatch({ type: ADD_ITEM_TO_CART_ERROR }));
};

export const removeItem = (cartId) =>async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEMS_LOADING });
  return axios
    .delete(`https://nord-stom-data.vercel.app/Cartitems/${cartId}`)
    .then((r) => {
      console.log(r)
      dispatch({ type: REMOVE_CART_ITEMS_SUCCESS, payload: r });
    })
    .catch(() => dispatch({ type: REMOVE_CART_ITEMS_ERROR }));
};

// export const updateitem = (cartId, update) => (dispatch) => {
//   dispatch({ type: UPDATE_CART_ITEMS_LOADING });
//   return axios
//     .patch(`https://nord-stom-data.vercel.app/Cartitems/${cartId}`, {
//       ...update,
//     })
//     .then(({ data }) => {
//       dispatch({ type: UPDATE_CART_ITEMS_SUCCESS, payload: data });
//     })
//     .catch(() => dispatch({ type: UPDATE_CART_ITEMS_ERROR }));
// };


export const increaseCartQuantity = (id) => ({
  type: Increment,
  payload: id
});

      
export const decreaseCartQuantity = (id) => ({
  type: Decrement,
  payload: id
});