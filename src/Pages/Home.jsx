import { Image } from '@chakra-ui/image'
import { Box, Grid, HStack, Link, Stack, Text, UnorderedList, VStack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BannerCarousel } from '../Components/HomeLayouts/BannerCarousel/BannerCarousel'
import BannerSlider from '../Components/HomeLayouts/BannerSlider'
import { CatelogCarousel } from '../Components/HomeLayouts/CatelogCarousel/CatelogCarousel'
import { Footer } from '../Components/HomeLayouts/Footer'
import { Gift2Carousel } from '../Components/HomeLayouts/Gift2Carousel/Gift2Carousel'
import { Gift3Carousel } from '../Components/HomeLayouts/Gift3Carousel/Gift3Carousel'
import { GiftCarousel } from '../Components/HomeLayouts/GiftCarousel/GiftCarousel'
import { MultiItemCarousel } from '../Components/HomeLayouts/MultiItemCarousel'
import { ProductCarousel } from '../Components/HomeLayouts/ProductCarousel/ProductCarousel'
import { TypeCarousel } from '../Components/HomeLayouts/TypeCarousel/TypeCarousel'
import Navbar from '../Components/Navbar/Navbar'
import { getProductsData } from '../Components/Products/redux/products.action'


const Gifts1 = [
  { image: "/Homepage/gift1.PNG", title: "Our Editor's Guide to Dressing for the Holidays", links: "Read More" },
  { image: "/Homepage/gift2.PNG", title: "Holiday Gifts from Black-Owned Brands to Buy Now", links: "Read More" },
  { image: "/Homepage/gift3.PNG", title: "Holiday Tradition & Nostalgia with Leslie Odom Jr. & Family", links: "Read More" }
];

const Gifts2 = [
  { image: "/Homepage/gift4.PNG", title: "The Gift of Choice", description: "Get them what they really want with a Nordstrom Gift Card.", links: ["Gift Cards & eGift Cards"] },
  { image: "/Homepage/gift5.PNG", title: "Gift Wrapping", description: "We make it easy with festive options. Shop in store or online to see your choices.", links: ["Learn More"] },
  { image: "/Homepage/gift6.PNG", title: "Make Memories Together", description: "Festivities are in full swing with events like Santa Greetings, Holiday Breakfasts, Letters to Santa, virtual livestreams and more.", links: ["Explore Events"] },
  { image: "/Homepage/gift7.PNG", title: "Free Style Help—in Stores or Online", description: "Get festive fashion advice from our stylists.", links: ["Learn More", "Book an Appointment"] }
];

const type = [
  { image: "/Homepage/type1.PNG", type: "Women" },
  { image: "/Homepage/type2.PNG", type: "Men" },
  { image: "/Homepage/type3.PNG", type: "Kids" },
  { image: "/Homepage/type4.PNG", type: "Home" },
  { image: "/Homepage/type5.PNG", type: "Beauty & Fragrance" },
  { image: "/Homepage/type6.PNG", type: "Designer" }
];

const Gifts3 = [
  { image: "/Homepage/gift8.PNG", type: "Stocking Stuffers" },
  { image: "/Homepage/gift9.PNG", type: "Under $50" },
  { image: "/Homepage/gift10.PNG", type: "Under $100" },
  { image: "/Homepage/gift11.PNG", type: "Luxe Gifts" },
  { image: "/Homepage/gift12.PNG", type: "All Gifts" }
];

const Home = () => {

  const Products = useSelector((store)=>(store.productsManager.data))
  const dispatch = useDispatch()

  const filtMen =()=>{
    let men = Products?.filter((prod)=> prod.ideal_for==="Men")
    return men
  } 


  const filtWomen =()=>{
    let women = Products.filter((prod)=> prod.ideal_for==="Women")
    return women
  }

  const filtTop =()=>{
    let Top = Products.filter((prod)=> prod.product_type==="Top")
    return Top
  }


  useEffect(() => {
    if(Products.length ==0){
      dispatch(getProductsData())
    }
  }, [])



  return (
    <>
    <Navbar/>
    
    <Box w={"100%"}>
      <UnorderedList m={"30px auto"} w={"95%"} display={{ base: "none", sm: "none", md: "block", lg: "block" }}>

        <HStack w={"100%"} justify={"space-between"} align={"flex-start"}>

          <Image pt={"5px"} src={"/Homepage/line1.png"} w={{ base: "none", sm: "200px", md: "250px", lg: "300px" }} alt={"line1"} />
          <VStack>
            <Text fontSize={{ base: "none", sm: "16px", md: "18px", lg: "20px" }} fontWeight={"bold"} >Shop what you love faster and easier.</Text>
            <Link fontWeight={"500"} fontSize={{ base: "none", sm: "13px", md: "13px", lg: "14px" }} textDecor={"underline"}>Sign In or Create an Account</Link>
          </VStack>
          <Image pt={"5px"} src={"/Homepage/line2.png"} w={{ base: "none", sm: "200px", md: "250px", lg: "300px" }} alt={"line2"} />

        </HStack>

      </UnorderedList>

      <UnorderedList
        display={{ base: "none", sm: "block", md: "block", lg: "block" }}
        zIndex={"-99"}
        margin={"auto"}
        width={"100%"}
        mb={"50px"}>
        <BannerCarousel />
      </UnorderedList>


      <UnorderedList
        display={{ base: "block", sm: "none", md: "none", lg: "none" }}
        zIndex={"-99"}
        margin={"auto"}
        width={"100%"}
        mb={"50px"}>
        <MultiItemCarousel />
      </UnorderedList>

      <UnorderedList display={{ base: "none", sm: "block", md: "block", lg: "block" }} m={"50px auto 70px auto"} w={"95%"} >
        <Image src={"/Homepage/bannerCard.PNG"} w={"100%"} alt={"banner"} />
      </UnorderedList>

      <UnorderedList display={{ base: "block", sm: "none", md: "none", lg: "none" }} m={"50px auto 70px auto"} w={"95%"} >
        <Image src={"/Homepage/img8.jpg"} alt={"banner"} />
      </UnorderedList>

      <ProductCarousel data={filtMen()} boolean={true} />

      <UnorderedList m={"50px auto 70px auto"} w={"95%"} fontSize={{ base: "13px", sm: "13px", md: "14px", lg: "14px" }} bg={"#3441b6"} color={"white"}>
        <VStack p={{ base: "10px", sm: "10px", md: "15px", lg: "30px" }}>
          <Text fontWeight={"bold"} fontSize={{ base: "14px", sm: "14px", md: "18px", lg: "20px" }}>Get It in Time for Christmas</Text>
          <Text>LAST CHANCE for FREE standard shipping! Order by 8pm ET on December 17.</Text>
          <HStack textDecor={"underline"}>
            <Link>GiftseGift</Link>
            <Link>Cards</Link>
            <Link>Learn More</Link>
          </HStack>
        </VStack>
      </UnorderedList>

      <UnorderedList m={"50px auto"} w={"95%"}>
        <Image src={"/Homepage/fullLine.PNG"} alt={"line"} />
        <Text m={"30px auto"} letterSpacing={"3px"} fontWeight={"500"} fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}>GIFTS BY PRICE</Text>
      </UnorderedList>

      <Gift3Carousel Gifts={Gifts3} />

      <UnorderedList m={"70px auto"} w={"95%"} fontSize={{ base: "13px", sm: "13px", md: "14px", lg: "14px" }} bg={"#fe3b1f"} color={"white"}>
        <VStack p={{ base: "10px", sm: "10px", md: "15px", lg: "30px" }}>
          <Text letterSpacing={"3px"} fontWeight={"bolder"} fontSize={{ base: "16px", sm: "20px", md: "25px", lg: "30px" }}>DESIGNER CLEARANCE</Text>
          <Text letterSpacing={"3px"} fontWeight={"bold"} fontSize={{ base: "14px", sm: "16px", md: "20px", lg: "25px" }}>UPTO 60% OFF</Text>
          <HStack>
            <Text>Save on the best brands and styles.</Text>
            <Link textDecor={"underline"}>Designer Sale</Link>
          </HStack>
        </VStack>
      </UnorderedList>

      <UnorderedList m={"50px auto"} w={"95%"}>
        <Image src={"/Homepage/fullLine.PNG"} alt={"line"} />
        <Text m={"30px auto"} letterSpacing={"3px"} fontWeight={"500"} fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}>TRENDING NOW</Text>
      </UnorderedList>

      <CatelogCarousel />

      <Box w={"95%"} textAlign={"left"} m={"auto"}>
        <Text fontSize={{ base: "16px", sm: "18px", md: "20px", lg: "23px" }} fontWeight={"500"} textAlign={"left"}>Great deals for holiday shopping</Text>
        <Text fontSize={"14px"} textAlign={"left"}>Items similar to what you've browsed are on sale</Text>
      </Box>

      <ProductCarousel data={filtWomen()} boolean={false} />

      <UnorderedList m={"50px auto"} w={"95%"} fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "14px" }}>
        <Image src={"/Homepage/fullLine.PNG"} alt={"line"} />
        <Text m={"30px auto 0px auto"} letterSpacing={"3px"} fontWeight={"500"} fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}>THE THREAD</Text>
        <Text mb={"10px"}>Your go-to destination for all things fashion, beauty and lifestyle at Nordstrom, from how-tos and style inspiration to exclusive interviews and more.</Text>
        <Text textAlign={"center"} cursor={"pointer"} textDecor={"underline"}>Get Inspired</Text>
      </UnorderedList>

      <GiftCarousel Gifts={Gifts1} />

      <Box w={"95%"} textAlign={"left"} m={"auto"}>
        <Text fontSize={{ base: "16px", sm: "18px", md: "20px", lg: "23px" }} fontWeight={"500"} textAlign={"left"}>Holiday Ideas From Brands You Like</Text>
      </Box>

      <ProductCarousel data={filtTop()} boolean={false} />

      <UnorderedList m={"50px auto"} w={"95%"}>
        <Image src={"/Homepage/fullLine.PNG"} alt={"line"} />
        <Text m={"30px auto"} letterSpacing={"3px"} fontWeight={"500"} fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}>SERVICES & EVENTS</Text>
      </UnorderedList>

      <Gift2Carousel Gifts={Gifts2} />

      <UnorderedList m={"0px auto 70px auto"} w={"95%"}>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 40% 60%)", lg: "repeat(2, 40% 60%)" }} bg={"black"} color={"white"}>

          <Box>
            <Image src={"/Homepage/img21.webp"} w={"100%"} alt={"banner"} />
          </Box>

          <Stack flexDir={"column"} justify={"center"} align={"center"} textAlign={"left"} p={{ base: "20px 10px", sm: "10px", md: "0 0 0 20px", lg: "0 0 0 40px" }} fontSize={{ base: "14px", sm: "12px", md: "13px", lg: "15px" }} w={"100%"}>
            <Box w={"100%"} fontSize={{ base: "14px", sm: "14px", md: "14px", lg: "18px" }}>
              <Text fontSize={{ base: "15px", sm: "17px", md: "15px", lg: "18px" }} fontWeight={"bold"} textAlign={"left"}>New Episodes Every Other Week</Text>
              <Text textAlign={"left"}>Go behind the scenes of Nordstrom with Pete Nordstrom and special guests. </Text>
              <Link textDecor={"underline"}>Learn More.</Link>

            </Box>

          </Stack>

        </Grid>
      </UnorderedList>

      <UnorderedList m={"40px auto 20px auto"} w={"95%"}>
        <Image src={"/Homepage/fullLine.PNG"} alt={"line"} />
        <Text m={"30px auto"} letterSpacing={"3px"} fontWeight={"500"} fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}>SHOP BY CATEGORY</Text>
      </UnorderedList>

      <TypeCarousel Types={type} />

      <Box w={"95%"} textAlign={"left"} m={"auto"}>
        <Text fontSize={{ base: "16px", sm: "18px", md: "20px", lg: "23px" }} fontWeight={"500"} textAlign={"left"}>Trending near you</Text>
        <Text fontSize={"14px"} textAlign={"left"}>The Most-viewed Items by Shoppers in Your Area</Text>
      </Box>

      <ProductCarousel data={Products} boolean={false} />

      <Footer />
    </Box>
    </>
  )
}

export default Home