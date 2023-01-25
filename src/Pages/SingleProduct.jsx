import { Alert, Box, Button, Grid, Heading, HStack, Image, Show, SimpleGrid, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { additem } from '../Components/Cart/Redux/cart.actions'
import Navbar from '../Components/Navbar/Navbar'
import ProductImage from '../Components/SingleProduct/ProductImage'

const SingleProduct = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const toast = useToast()
    const [img, setImg] = useState(location.state.images[0])
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    // console.log(location.state.images[0])


    return (
        <>
            <Navbar />
            <Box padding="2%">
                {/* <SimpleGrid columns={[1, 1, 2, 2]}> */}


                <Box>

                    <Show breakpoint='(min-width: 767px)'>
                        <Grid templateColumns={"repeat(2, 50% 50%)"}>
                            <HStack  height="450px">
                                <Box height="100%">

                                    <ProductImage img={img} />
                                </Box>

                                <Stack  w={"24%"} justify="space-between" align="center" height="100%">
                                    <Box width="80px">
                                        <Image  onClick={() => setImg(location.state.images[1])} width="100%" src={location.state.images[1]} />
                                    </Box>
                                    <Box width="80px">
                                        <Image onClick={() => setImg(location.state.images[2])} width="100%" src={location.state.images[2]} />
                                    </Box>
                                    <Box width="80px">
                                        <Image onClick={() => setImg(location.state.images[3])} width="100%" src={location.state.images[3]} />
                                    </Box>
                                    <Box width="80px">
                                        <Image onClick={() => setImg(location.state.images[4])} width="100%" src={location.state.images[4]} />
                                    </Box>
                                </Stack>

                            </HStack>

                            <Box  w={"90%"} h={"380px"} p={"10px"} m={"auto"}>

                                <Stack justify={"space-between"} w={"100%"} fontSize={"16px"} >

                                    <Heading size="md" textAlign={"left"} >{location.state.title}</Heading>
                                    <Text textAlign={"left"} fontWeight={"500"}>{location.state.brand}</Text><br />
                                    <Button backgroundColor="#eeefef" _hover="none" textAlign={"left"} width="90px" >{location.state.ideal_for}</Button><br />

                                    <HStack>
                                        <Text color={"green"} fontWeight={"500"} fontSize={"23px"} textAlign={"left"}>INR ₹{location.state.variant_price}</Text>
                                        <Text color={"red"} fontWeight={"500"} fontSize={"20px"} textDecor={"line-through"} textAlign={"left"}>₹{location.state.variant_mrp}</Text>
                                    </HStack><br />
                                    <HStack>
                                        {
                                            sizes.map((el) => el == location.state.size ? <Button > {location.state.size}</Button> : <Button disabled > {el}</Button>
                                            )
                                        }
                                    </HStack><br />
                                    <HStack>
                                        <Text textAlign={"left"} fontWeight={"500"}>Color  </Text>
                                        <Button backgroundColor={location.state.actual_color} ></Button>
                                    </HStack><br />
                                    <Button colorScheme="teal" width="100%" 
                                    onClick={() =>{ 
                                        dispatch(additem(location.state, location.state.qty = 1))
                                        toast({
                                            title: '"Item Added Into Cart Successfully."',
                                            status: 'success',
                                            position:"top-right",
                                            duration: 9000,
                                            isClosable: true,
                                          })
                                    }} >Add to Cart</Button>
                                </Stack>

                            </Box>
                        </Grid>
                    </Show>

                    {/* ---------------------------------------Mobile-------------------------------------- ----------*/}

                    <Show breakpoint='(max-width: 767px)'>
                        <Box>
                            <Box marginBottom="10px">

                                <ProductImage img={img} />
                            </Box>
                            <Box>
                                <HStack>
                                    <Image onClick={() => setImg(location.state.images[1])} width="24%" src={location.state.images[1]} />
                                    <Image onClick={() => setImg(location.state.images[2])} width="24%" src={location.state.images[2]} />
                                    <Image onClick={() => setImg(location.state.images[3])} width="24%" src={location.state.images[3]} />
                                    <Image onClick={() => setImg(location.state.images[4])} width="24%" src={location.state.images[4]} />
                                </HStack>
                            </Box>
                        </Box>
                        <Box w={"100%"} h={"380px"} pt={"10px"} m={"auto"}>

                            <Stack justify={"space-between"} w={"100%"} fontSize={"16px"} >

                                <Heading size="md" textAlign={"left"} >{location.state.title}</Heading>
                                <Text textAlign={"left"} fontWeight={"500"}>{location.state.brand}</Text>
                                <Button backgroundColor="#eeefef" _hover="none" textAlign={"left"} width="90px" >{location.state.ideal_for}</Button><br />

                                <HStack>
                                    <Text color={"green"} fontWeight={"500"} fontSize={"23px"} textAlign={"left"}>INR ₹{location.state.variant_price}</Text>
                                    <Text color={"red"} fontWeight={"500"} fontSize={"20px"} textDecor={"line-through"} textAlign={"left"}>₹{location.state.variant_mrp}</Text>
                                </HStack><br />
                                <HStack>
                                    {
                                        sizes.map((el) => el == location.state.size ? <Button > {location.state.size}</Button> : <Button disabled > {el}</Button>
                                        )
                                    }
                                </HStack><br />
                                <HStack>
                                    <Text textAlign={"left"} fontWeight={"500"}>Color  </Text>
                                    <Button backgroundColor={location.state.actual_color} ></Button>
                                </HStack><br />
                                <Button colorScheme="teal" width="100%" 
                                    onClick={() =>{ 
                                        dispatch(additem(location.state, location.state.qty = 1))
                                        toast({
                                            title: '"Item Added Into Cart Successfully."',
                                            status: 'success',
                                            position:"top-right",
                                            duration: 9000,
                                            isClosable: true,
                                          })
                                    }} >Add to Cart</Button>
                             </Stack>

                        </Box>
                    </Show>
                </Box>
                {/* </SimpleGrid> */}
            </Box>
        </>
    )
}

export default SingleProduct