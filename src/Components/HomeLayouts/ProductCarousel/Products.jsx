import { Box, HStack, Spacer, Stack, Text, UnorderedList, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import SingleProduct from '../../../Pages/SingleProduct'
export const Products = ({props}) => {
    const { title, brand, variant_mrp, variant_price, images } = props
    const navigate = useNavigate()

    const singleProductData = (prod) => {
        navigate({ pathname: '/SingleProduct' }, { state: prod })
    } 
    

    return (
        
        <Box w={"220px"} h={"380px"} p={"10px"} m={"auto"} onClick={()=>{singleProductData(props)}} >

            <Stack justify={"space-between"} w={"100%"} h={"100%"} fontSize={"13px"} >

                <img src={images[0]} width={"100%"} alt="demo" />

                <Text textAlign={"left"}>{title}</Text>
                <Text textAlign={"left"} fontWeight={"500"}>{brand}</Text>

                <HStack>
                    <Text color={"green"} fontWeight={"500"} textAlign={"left"}>INR ₹{variant_price}</Text>
                    <Text color={"red"} fontWeight={"500"} textDecor={"line-through"} textAlign={"left"}>₹{variant_mrp}</Text>
                </HStack>

            </Stack>

        </Box>
    )
}