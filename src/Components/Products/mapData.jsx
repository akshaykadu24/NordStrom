import { Box, Grid, Heading, HStack, Image, Img, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SingleProduct from '../../Pages/SingleProduct'

const MapData = ({ Products, data }) => {
  const filterdData_Or_OriginalData = data.length != 0 ? data : Products
  const navigate = useNavigate()
  const singleProductData = (prod) => {
    navigate({ pathname: '/SingleProduct' }, { state: prod })
  }




  return (


    <SimpleGrid columns={[1, 2, 3, 4]} width="100%" >
      {
        filterdData_Or_OriginalData.map((prod) => {
          return (
            <Box  m={"10px"} onClick={() => { singleProductData(prod) }} key={prod.id} style={{ fontFamily: "'Noto Sans', sans-serif", boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px", paddingBottom: "10px" }}>

              <Stack justify={"space-between"} w={"100%"} h={"100%"} fontSize={"13px"} >

                <Image src={prod.images[0]} width={"100%"} alt="demo" />
                <Box width="95%" paddingLeft={5} >
                  <Box>
                    <Text textAlign={"left"}>{prod.title}</Text>
                    <Text textAlign={"left"} fontWeight={"600"}>{prod.brand}</Text>
                    {/* <Text textAlign="left" style={{color:'grey'}}><span style={{color:'grey',fontWeight:'bold'}}>Color:</span> {prod.actual_color}</Text> */}
                    <Text textAlign="left" style={{ color: 'grey' }}><span style={{ color: 'grey', fontWeight: 'bold' }}>Size:</span> {prod.size}</Text>
                  </Box>
                  <HStack>
                    <Text color={"green"} fontWeight={"600"} fontSize={"15px"} textAlign={"left"}>INR ₹{prod.variant_price}</Text>
                    <Text color={"red"} fontWeight={"600"} textDecor={"line-through"} textAlign={"left"}>₹{prod.variant_mrp}</Text>
                  </HStack>
                </Box>
              </Stack>
            </Box>
          )
        })
      }
    </SimpleGrid>


  )
}

export default MapData