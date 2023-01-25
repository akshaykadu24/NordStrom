import { useReducer } from 'react';
import { Button,Heading,Flex,Text ,Box} from '@chakra-ui/react';
import React from 'react'
import { increaseCartQuantity ,decreaseCartQuantity} from './Redux/cart.actions';
import { useDispatch, useSelector } from 'react-redux'

// const initialState = {count: 1};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

const Quantity = ({id,quantity}) => {
   // const [state, cdispatch] = useReducer(reducer, initialState);
   const cartProducts = useSelector((store)=>(store.cartManager.data))
    console.log(cartProducts);
  const dispatch = useDispatch()
  return (
    <Box>
       
        <Flex justifyContent="center" alignItems="center" gap="5px"> 
   
        <Button disabled={quantity==1} onClick={ () => dispatch(decreaseCartQuantity(id)) }>-</Button>

            <Text fontSize='xl' >{ quantity }</Text>

        <Button onClick={ () => dispatch(increaseCartQuantity(id)) } >+</Button>

   
             
    </Flex>
   

    </Box>
  
   
    
    
  )
}

export default Quantity


//disabled={ item.quantity === 1 } onClick={ () => dispatch(decreaseCartQuantity(item.id)) }
//onClick={ () => dispatch(increaseCartQuantity(item.id)) } m='2'
//fontSize='3xl' m='2'>{ item.quantity }