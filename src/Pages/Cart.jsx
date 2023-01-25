import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Heading,
  GridItem,
  Flex,
  Text,
  UnorderedList,
  Input,
  Image,
  useToast,
  VStack,
  HStack,
  Stack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchProducts,
  removeItem,
} from "../Components/Cart/Redux/cart.actions";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import MapCartData from "../Components/Cart/mapCartData";
import Discount from "./Discount.jpg";
import payimg from "./payimg.png"
import { render } from "@testing-library/react";




function Summary({
  subTotal,
  discount,
  tax,
  onEnterPromoCode,
  checkPromoCode,
}) {
  const total = subTotal - discount + tax;

  return (
    <section className="container">
      <Box>
        <VStack>
          <HStack w={"100%"} justify={"space-between"} align={"center"}>
            <Text>Subtotal</Text> <Text fontWeight={"bold"} letterSpacing={"2px"}>₹{subTotal}</Text>
          </HStack>
          {discount > 0 && (
            <HStack w={"100%"} justify={"space-between"} align={"center"}>
              <Text>Discount</Text> <Text fontWeight={"bold"} letterSpacing={"2px"}>₹{discount}</Text>
            </HStack>
          )}

          <HStack w={"100%"} justify={"space-between"} align={"center"}>
            <Text>Tax</Text> <Text fontWeight={"bold"} letterSpacing={"2px"}>{tax}%</Text>
          </HStack>
          <HStack w={"100%"} justify={"space-between"} align={"center"}>
            <Text>Total</Text> <Text fontWeight={"bold"} letterSpacing={"2px"}>₹{total}</Text>
          </HStack>
        </VStack>

        <VStack>
          <Input
            placeholder="Apply Promocode"
            type="text"
            onChange={onEnterPromoCode}
          />
          <Button w={"100%"} onClick={checkPromoCode}>Apply</Button>
        </VStack>
      </Box>
    </section>
  );
}

const Cart = () => {
  const [promoCode, setPromoCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);
const [count,setCount] = useState(0);
  const cartProducts = useSelector((store) => store.cartManager.data);

  const toast = useToast()

  const dispatch = useDispatch();

  console.log(cartProducts);
  useEffect(() => {
    dispatch(fetchProducts);
    console.log("render")

  }, [count]);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    setCount(prev=>prev+1);
setTimeout(()=>{
  dispatch(fetchProducts);

},1000)  
  };

  const subTotal = cartProducts.reduce((tot, item) => {
    return tot + item.variant_price * item.qty;
  }, 0);

  const discount = (subTotal * discountPercent) / 100;

  const PROMOTIONS = [
    {
      code: "MASAI50",
      discount: "50%",
    },
    {
      code: "MASAI40",
      discount: "40%",
    },
    {
      code: "MASAI30",
      discount: "30%",
    },
  ];

  const TAX = 5;

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const checkPromoCode = () => {
    for (var i = 0; i < PROMOTIONS.length; i++) {
      if (promoCode === PROMOTIONS[i].code) {
        setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace("%", "")));

        return;
      }
    }

    toast({
      title: 'Coupon Not Valid.',
      description: "Please enter valide coupon code",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top"
    });
  };

 
  return (
    <>
      <Navbar />


      <Box w={"100%"} m={"auto"} >

        <Grid m={"auto"} w="95%" templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 70% 30%)", lg: "repeat(2, 70% 30%)" }} p={"20px 0px"}>

          {(cartProducts.length==0)?  <Box>
            <Heading mb={"20px"}>Your Nordstrom Cart is empty.</Heading>

              <Button p={"5px 0px"} w={"100%"} colorScheme={"green"}>
               <NavLink to="/Products">Continue For Shoping</NavLink>
           </Button>


             </Box>:

          
          <Box>
            <MapCartData Products={cartProducts} handleRemove={handleRemove} />
          </Box>}

          <UnorderedList display={{ base: "none", sm: "none", md: "block", lg: "block" }} >
            <VStack h={"100%"} w={"100%"} justify={"center"} align={"center"}>
              <Image width="100%" src={Discount} />
            </VStack>
          </UnorderedList>

        </Grid>

        <hr style={{ border: "1px solid gray", margin: "auto", width: "95%" }} />

        <Grid m={"auto"} w="95%" templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} p={"20px 0px"}>
          <Box pt={"10px"} mb={"20px"} fontSize={{base:"16px", sm:"15px", md:"16px", lg:"18px"}}>
            <Text fontSize={{base:"17px", sm:"17px", md:"17px", lg:"18px"}} textAlign="left" fontWeight={"bold"}>Accepted Payment Methods</Text>
            <HStack m={"5px 0"}>
              <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/04/Regalia-HDFC.png.webp" style={{ width: "10%", height: "100%"}}></Image>
              <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/simplysave-credit-card.jpg.webp" style={{ width: "10%", height: "100%", marginLeft: "10px" }}></Image>
              <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/ICICI-Coral-Contactless-Card.jpg.webp" style={{ width: "10%", height: "100%", marginLeft: "10px" }}></Image>
              <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/11/222.png.webp" style={{ width: "10%", height: "100%", marginLeft: "10px" }}></Image>
              <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Citi-Cash-Back-Credit-Card.jpg.webp" style={{ width: "10%", height: "100%", marginLeft: "10px" }}></Image>
              <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/YES-Prosperity-Rewards-Plus.jpg.webp" style={{ width: "10%", height: "100%", marginLeft: "10px" }}></Image>
            </HStack>
            <Text textAlign="left">Need help? Call 1.888.282.6060 or chat with us</Text>
            <Text textAlign="left">Shipping internationally?</Text>
          </Box>
          
          <Box>
          <Stack w={"100%"} m={"auto"} pt={"10px"}>
            <Heading size={"md"} textAlign="center">Order Summary</Heading>

            <Summary
              subTotal={subTotal}
              discount={discount}
              tax={TAX}
              onEnterPromoCode={onEnterPromoCode}
              checkPromoCode={checkPromoCode}
            />
            <Button p={"5px 0px"} w={"100%"} colorScheme={"green"}>
              <NavLink to="/Checkout">Checkout</NavLink>
            </Button>
          </Stack>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
