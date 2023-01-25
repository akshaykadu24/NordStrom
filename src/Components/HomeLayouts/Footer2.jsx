import { Box, HStack, Text, UnorderedList } from "@chakra-ui/react"

export const Footer2 = () => {
    return (
        <HStack w={"95%"} justify={"space-between"} align={"center"} bg={"#f9f9f9"}>
                <HStack m={"auto"}>
                    <UnorderedList display={{base:"none", sm:"block", md:"block", lg:"block"}}>
                    <Text color={"#4A5568"} fontSize={"14px"} textAlign={"end"} p={"10px 20px"} >Privacy</Text>
                    </UnorderedList>
                    <UnorderedList display={{base:"none", sm:"none", md:"none", lg:"block"}}>
                    <Text color={"#4A5568"} fontSize={"14px"} textAlign={"end"} p={"10px 20px"} >Do Not Sell My Personal Information</Text>
                    </UnorderedList>
                    <UnorderedList display={{base:"none", sm:"block", md:"block", lg:"block"}}>
                    <Text color={"#4A5568"} fontSize={"14px"} textAlign={"end"} p={"10px 20px"} >Terms & Conditions</Text>
                    </UnorderedList>
                    <UnorderedList display={{base:"none", sm:"none", md:"none", lg:"block"}}>
                    <Text color={"#4A5568"} fontSize={"14px"} textAlign={"end"} p={"10px 20px"} >Interest-Based Ads</Text>
                    </UnorderedList>
                    <UnorderedList display={{base:"block", sm:"block", md:"block", lg:"block"}}>
                    <Text color={"#4A5568"} fontSize={"14px"} textAlign={"end"} p={"10px 20px"} >©2022 Nordstrom, Inc.</Text>
                    </UnorderedList>
                </HStack>

        </HStack>
    )
}