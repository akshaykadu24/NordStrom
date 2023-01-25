import { Box, Grid, HStack, Image, Link, Stack, Text, UnorderedList, VStack } from '@chakra-ui/react'
import React from 'react'
export const Type = ({ image, type }) => {

    return (
        <>
            <UnorderedList w={"100%"} m={"auto"}>

                <VStack w={"100%"} justify={"space-between"} fontSize={"13px"} m={"auto"} h={{base: "550px", sm: "150px", md: "200px", lg: "300px"}}>

                    <Image src={image} w={"100%"} alt="catelogs" />

                    <Text mb={"15px"} fontSize={{ base: "18px", sm: "13px", md: "14px", lg: "18px" }} fontWeight={"bold"} textAlign={"left"}>{type}</Text>
                        

                </VStack>

            </UnorderedList>
        </>
    )
}