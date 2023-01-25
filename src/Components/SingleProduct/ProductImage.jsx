import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const ProductImage = ({img}) => {
  return (
    <Box height="100%" >
      
        <Image height="100%" src={img}/>
    </Box>
  )
}

export default ProductImage