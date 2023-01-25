import React from 'react'
import { Box, Checkbox, Heading, Show, Stack, UnorderedList } from '@chakra-ui/react'

const FilterProductsButtons = ({ filtCred, setFiltCred, onClose, filtMen, filtWomen,filtBoys,filtGirls, sizeS, sizeM,sizeL,sizeXL,sizeXXL, colorBlue, colorRed, colorPink, colorBlack , colorGreen,colorYellow,setData }) => {

  const filterMen = (e) => {
    if (e.target.checked) {
      filtMen()
      //   return true
    } else {
      setData([])
    }

  }

  const filterWomen = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      filtWomen()
      // return true
    } else {
      setData([])
    }
  }
  const filterBoys = (e) => {
    if (e.target.checked) {
      console.log('filterBoys')
      filtBoys()
      // return true
    } else {
      setData([])
    }
  }
  const filterGirls = (e) => {
    if (e.target.checked) {
      filtGirls()
      // return true
    } else {
      setData([])
    }
  }

  const filtersizeS = (e) => {
    if (e.target.checked) {
      sizeS()
      // return true
    } else {
      setData([])
    }
  }
  const filtersizeM = (e) => {
    if (e.target.checked) {
      sizeM()
      // return true
    } else {
      setData([])
    }
  }
  const filtersizeL = (e) => {
    if (e.target.checked) {
      sizeL()
      // return true
    } else {
      setData([])
    }
  }
  const filtersizeXL = (e) => {
    if (e.target.checked) {
      sizeXL()
      // return true
    } else {
      setData([])
    }
  }
  const filtersizeXXL = (e) => {
    if (e.target.checked) {
      sizeXXL()
      // return true
    } else {
      setData([])
    }
  }

  const colorB = (e) => {
    if (e.target.checked) {
      colorBlue()
      // return true
    } else {
      setData([])
    }
  }
  const colorR = (e) => {
    if (e.target.checked) {
      colorRed()
      // return true
    } else {
      setData([])
    }
  }
  const colorP = (e) => {
    if (e.target.checked) {
      colorPink()
      // return true
    } else {
      setData([])
    }
  }
  const colorBl = (e) => {
    if (e.target.checked) {
      colorBlack()
      // return true
    } else {
      setData([])
    }
  }
  const colorG = (e) => {
    if (e.target.checked) {
      colorGreen()
      // return true
    } else {
      setData([])
    }
  }
  const colorY = (e) => {
    if (e.target.checked) {
      colorYellow()
      // return true
    } else {
      setData([])
    }
  }

  const check =(e)=>{
    console.log(e.target)

    const {name,checked} =e.target
    setFiltCred({
      ...filtCred,
      [name]:checked
    })
    console.log(filtCred)

  }

  return (

      <Stack w={"100%"} fontSize="14px" pl="10px" pt="2" onClick={onClose}>

        <Heading textAlign="left" pl={2} size='lg' letterSpacing="2px">Filter</Heading>

        <Heading textAlign="left" pl={2} size='sm'>Gender</Heading>

        <Box display="flex" flexDirection="column"   justifyContent="flex-start" marginTop="10px">

          <Checkbox pl="6" size='sm' colorScheme='green' name="Men" onChange={(e)=>{check(e); filterMen()}} >Mens</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Women" onChange={(e)=>{check(e); filterWomen()}}>Womens</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Boys" onChange={(e)=>{check(e); filterBoys()}}>Boys</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Girls" onChange={(e)=>{check(e); filterGirls()}}>Girls</Checkbox>

        </Box><hr />

        <Heading textAlign="left" pl={2} size='sm' marginTop="5px">Size</Heading>
        <Box display="flex" flexDirection="column" justifyContent="flex-start" marginTop="10px">

          <Checkbox pl="6" size='sm' colorScheme='green' name="S" onChange={(e)=>{check(e); filtersizeS()}} >S</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="M" onChange={(e)=>{check(e); filtersizeM()}} >M</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="L" onChange={(e)=>{check(e); filtersizeL()}}>L</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="XL" onChange={(e)=>{check(e); filtersizeXL()}}>XL</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="XXL" onChange={(e)=>{check(e); filtersizeXXL()}}>XXL</Checkbox>

        </Box>
        <hr />

        <Heading textAlign="left" pl={2} size='sm' marginTop="5px">Colors</Heading>
        <Box display="flex" flexDirection="column" justifyContent="flex-start" marginTop="10px">

          <Checkbox pl="6" size='sm' colorScheme='green' name="Blue" onChange={(e)=>{check(e); colorB()}} >Blue</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Red" onChange={(e)=>{check(e); colorR()}} >Red</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Pink" onChange={(e)=>{check(e); colorP()}} >Pink</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Black" onChange={(e)=>{check(e); colorBl()}}>Black</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Green" onChange={(e)=>{check(e); colorG()}}>Green</Checkbox>
          <Checkbox pl="6" size='sm' colorScheme='green' name="Yellow" onChange={(e)=>{check(e); colorY()}}>yellow</Checkbox>


        </Box>

      </Stack>





  )
}

export default FilterProductsButtons