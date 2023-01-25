import { Box, Grid, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import Navbar from '../Components/Navbar/Navbar'
import FilterProductsButtons from '../Components/Products/filterProductsButtons'
import MapData from '../Components/Products/mapData'
import { getProductsData } from '../Components/Products/redux/products.action'
import Sliderr from '../Components/Slider'

const Products = () => {
  const [data, setData] = useState([])
    const [page,setPage] = useState(1)
  const Products = useSelector((store) => (store.productsManager.data))
  const dispatch = useDispatch()
  let [filtCred,setFiltCred] = useState({}) 
  
  // console.log(Products)

  const filtMen = () => {
    setData(Products.filter((prod) => { if (prod.ideal_for === "Men") return prod }))
  }
  const filtWomen = () => {
    setData(Products.filter((prod) => { if (prod.ideal_for === "Women") return prod }))
  }
  const filtBoys =() => {
    setData(Products.filter((prod) => { if (prod.ideal_for === "Boys") return prod }))
  }
  const filtGirls = () => {
    setData(Products.filter((prod) => { if (prod.ideal_for === "Girls") return prod }))
  }

  const sizeS = () => {
    setData(Products.filter((prod) => { if (prod.size === "S") return prod }))
  }
  const sizeM = () => {
    setData(Products.filter((prod) => { if (prod.size === "M") return prod }))
  }
  const sizeL = () => {
    setData(Products.filter((prod) => { if (prod.size === "L") return prod }))
  }
  const sizeXL = () => {
    setData(Products.filter((prod) => { if (prod.size === "XL") return prod }))
  }
  const sizeXXL = () => {
    setData(Products.filter((prod) => { if (prod.size === "XXL") return prod }))
  }
  
  const colorBlue = () => {
    setData(Products.filter((prod) => { if (prod.actual_color === "Blue") return prod }))
  }
  const colorRed = () => {
    setData(Products.filter((prod) => { if (prod.actual_color === "Red") return prod }))
  }
  const colorPink = () => {
    setData(Products.filter((prod) => { if (prod.actual_color === "Pink") return prod }))
  }
  const colorBlack = () => {
    setData(Products.filter((prod) => { if (prod.actual_color === "Black") return prod }))
  }
  const colorGreen  = () => {
    setData(Products.filter((prod) => { if (prod.actual_color === "Green") return prod }))
  }
  const colorYellow = () => {
    setData(Products.filter((prod) => { if (prod.actual_color === "Yellow") return prod }))
  }

  let filtData = Products.filter((el)=> (filtCred.Men? el.ideal_for=="Men":"") || 
                                    (filtCred.Women? el.ideal_for=="Women":"") || 
                                    (filtCred.Boys? el.ideal_for=="Boys":"") ||
                                    (filtCred.Girls? el.ideal_for=="Girls":"" )||

                                    (filtCred.S? el.size=="S":"") || 
                                    (filtCred.M? el.size=="M":"") || 
                                    (filtCred.L? el.size=="L":"") ||
                                    (filtCred.XL? el.size=="XL":"" ) ||
                                    (filtCred.XXL? el.size=="XXL":"" ) ||

                                    (filtCred.Blue? el.actual_color=="Blue":"") || 
                                    (filtCred.Red? el.actual_color=="Red":"") || 
                                    (filtCred.Pink? el.actual_color=="Pink":"") ||
                                    (filtCred.Black? el.actual_color=="Black":"" ) ||
                                    (filtCred.Green? el.actual_color=="Green":"") ||
                                    (filtCred.Yellow? el.actual_color=="Yellow":"" )
                                    )

  useEffect(() => {
    if(Products.length ==0){
      dispatch(getProductsData(page))
    }
  }, [])
console.log(filtData)
  return (
    <>

    <Navbar/>
    <Box marginTop="10px" >

      <Grid templateColumns={{ base: "repeat(1, 100%)", sm: "repeat(1, 100%)", md: "repeat(2, 20% 80%)", lg: "repeat(2, 15% 85%)" }}>

        <UnorderedList display={{ base: "block", sm: "block", md: "none", lg: "none" }} position={"sticky"} top={"0px"}>

          <Sliderr filtMen={filtMen} filtWomen={filtWomen} setFiltCred={setFiltCred} filtBoys={filtBoys} filtGirls={filtGirls} sizeS={sizeS} sizeM={sizeM} sizeL={sizeL} sizeXL={sizeXL} sizeXXL={sizeXXL} 
           colorBlue={colorBlue} colorRed={colorRed} colorPink={colorPink} colorBlack={colorBlack} colorGreen={colorGreen} colorYellow={colorYellow} setData={setData} />

        </UnorderedList>

        <UnorderedList display={{ base: "none", sm: "none", md: "block", lg: "block" }}>

          <Box position={"fixed"} left={"0"} pl={"10px"}>
            <FilterProductsButtons filtCred={filtCred} setFiltCred={setFiltCred} filtMen={filtMen} filtWomen={filtWomen} filtBoys={filtBoys} filtGirls={filtGirls} sizeS={sizeS} sizeM={sizeM} sizeL={sizeL} sizeXL={sizeXL} sizeXXL={sizeXXL} 
           colorBlue={colorBlue} colorRed={colorRed} colorPink={colorPink} colorBlack={colorBlack} colorGreen={colorGreen} colorYellow={colorYellow} setData={setData} />

          </Box>

        </UnorderedList>

        <Box>
          <MapData Products={Products} data={filtData} />
        </Box>

      </Grid>


    </Box>
    </>
  )
}

export default Products