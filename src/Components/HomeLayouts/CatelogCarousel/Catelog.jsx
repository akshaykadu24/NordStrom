import { Box, Grid, HStack, Image, Link, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
export const Catelog = ({ image, title, description, links }) => {

    return (
        <>
        <UnorderedList display={{ base: "none", sm: "block", md: "block", lg: "block" }} w={"100%"} m={"auto"}>

            <HStack w={"100%"} h={"100%"} justify={"flex-start"} align={"flex-start"} fontSize={{base:"13px", sm:"13px", md:"14px", lg:"15px"}} m={"auto"}>

                <Image pl={"3px"} src={image} w={"65%"} alt="catelogs" />

                <Box w={"35%"} pl={{base:"10px", sm:"10px", md:"15px", lg:"20px"}} textAlign={"left"} pt={{base:"10px", sm:"30px", md:"50px", lg:"80px"}}>
                    <Text fontSize={{base:"14px", sm:"15px", md:"18px", lg:"25px"}} fontWeight={"bold"} textAlign={"left"}>{title}</Text>
                    <Text textAlign={"left"}>{description}</Text>
                    <Box mt={{base:"10px", sm:"12px", md:"15px", lg:"20px"}}>
                        {
                            links?.map((link) => (
                                <Link textDecor={"underline"} m={"10px 10px 10px 0px"}>{link}</Link>
                            ))
                        }
                    </Box>
                </Box>

            </HStack>

        </UnorderedList>

        <UnorderedList display={{ base: "block", sm: "none", md: "none", lg: "none"}} w={"100%"} m={"auto"}>

            <Grid w={"100%"} templateRows={"repeat(2, auto)"}
            fontSize={"13px"}>

                <Image src={image} w={"100%"} alt="catelogs" />

                <Box w={"100%"} textAlign={"left"} pt={"10px"} pl={"1px"}>
                    <Text fontSize={"14px"} fontWeight={"bold"} textAlign={"left"}>{title}</Text>
                    <Text w={"98%"} textAlign={"left"}>{description}</Text>
                    <Box w={"98%"} mt={"10px"}>
                        {
                            links?.map((link, i) => (
                                <Link key={i} textDecor={"underline"} m={"10px 10px 10px 0px"}>{link}</Link>
                            ))
                        }
                    </Box>
                </Box>

            </Grid>

        </UnorderedList>
        </>
    )
}