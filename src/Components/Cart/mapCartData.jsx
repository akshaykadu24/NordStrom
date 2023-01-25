import { Select, Box, Heading, HStack, Img, SimpleGrid, Spacer, Button, Flex, Text, useToast, Grid, VStack, Stack, } from '@chakra-ui/react'
import React, { useEffect, useState,useReducer } from 'react'
import Quantity from './quantity'




const MapCartData = ({Products,handleRemove}) => {
 
 const toast = useToast()

  


  return (
   
    <Box width="100%">{
     
       Products.map((prod)=>{
            return   <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 70% 30%)", lg: "repeat(2, 70% 30%)" }} key={prod.id} m={"20px 0px"}>

            <HStack>
              <Img height="200px" width="150px" src={prod.images[0]} alt="product image" />
              <Box>
                <Text marginBottom="8px" textAlign="left" fontSize="sm" fontWeight="bold">{prod.title}</Text>
                <Text textAlign="left" fontSize="sm"><span >Color:</span> {prod.actual_color}</Text>
                <Text textAlign="left" fontSize="sm"><span >Brand:</span> {prod.brand}</Text>
                <Text textAlign="left" fontSize="sm"><span>Size:</span> {prod.size}</Text>
                <HStack marginTop="7px">
                  <Text textAlign="left" color="red" textDecoration="line-through"><span >MRP:</span> ₹{prod.variant_mrp}</Text>
                  <Spacer />
                  <Text textAlign="left" color="green"><span >Offer Price:</span> ₹{prod.variant_price}</Text>
                </HStack>
              </Box>
            </HStack>

            <Grid m={"20px 0"} templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)" }} pl={"20px"}>
              <Stack justify={"center"} align={"flex-start"}>
                <Quantity quantity={prod.qty} id={prod.id} />
              </Stack>
              <Stack justify={"center"} align={"flex-start"}>
                <Button colorScheme={"red"} onClick={() =>{
               handleRemove(prod.id)
               toast({
                title: '"Item Removed From Cart Successfully."',
                status: 'success',
                position:"top-right",
                duration: 9000,
                isClosable: true,
              })
                }}>Remove</Button>
              </Stack>
            </Grid>
          </Grid>
                  })}

       
      
    </Box>
   
  )
}

export default MapCartData