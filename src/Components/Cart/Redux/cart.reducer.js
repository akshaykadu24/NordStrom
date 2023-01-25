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

const initalState = {

    loading: false,
    error: false,
    data: [],
  

  
};
export const cartReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case GET_CART_ITEMS_LOADING: {
      return { ...state,   loading: true, error: false,  };
    }
    case GET_CART_ITEMS_SUCCESS: {
      console.log(payload);
      return { ...state, loading: false,data: payload,};
    }
    case GET_CART_ITEMS_ERROR: {
      return { ...state,loading: false, error: true,  };
    
     
    }
    case Increment:{
     
        return{
          ...state,
          data: state.data.map((item) => item.id === payload ? { ...item, qty: item.qty + 1 } : item)
        }
     
     
      
    }

    case Decrement:{
      return{
        ...state,
        data: state.data.map((item) => item.id === payload ? { ...item, qty: item.qty - 1 } : item)
      }
    }

   
    case ADD_ITEM_TO_CART_LOADING: {
      return { ...state,   loading: true, error: false };
    }
    case ADD_ITEM_TO_CART_SUCCESS: {
      return {
        ...state,
        data:[...state.data, payload],
         loading: false ,
      };
    }
    case ADD_ITEM_TO_CART_ERROR: {
      return {
         ...state,  
         loading: false, 
         error: true 
        };
    }

    // case UPDATE_CART_ITEMS_LOADING: {
    //   return { ...state, updateinit: { loading: true, error: false } };
    // }
    // case UPDATE_CART_ITEMS_SUCCESS: {
    //   const uitems = state.data.map((cI) => {
    //     if (cI.id === payload.id) {
    //       return payload;
    //     } else return cI;
    //   });
    //   return { ...state, data: uitems, updateinit: { loading: false } };
    // }
    // case UPDATE_CART_ITEMS_ERROR: {
    //   return { ...state, updateinit: { loading: false, error: true } };
    // }
    case REMOVE_CART_ITEMS_LOADING: {
      return { ...state, loading: true, error: false  };
    }
    case REMOVE_CART_ITEMS_SUCCESS: {
      const uitems = state.data.filter((cI) => cI.id !== payload);
      return { ...state, data: uitems,  loading: false } };
    
    case REMOVE_CART_ITEMS_ERROR: {
      return { ...state,  loading: false, error: true  };
    }
    default: {
      return state;
    }
  }
};
