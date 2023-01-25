import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Box,
} from '@chakra-ui/react'
import { useRef } from 'react';
import { colorBlue, colorPink, colorRed, filtMen, filtWomen, sizeM, sizeS } from '../Pages/Products';
import FilterProductsButtons from './Products/filterProductsButtons';

function Sliderr({ filtMen, filtWomen,filtBoys,filtGirls, sizeS, sizeM,sizeL, sizeXL, sizeXXL, colorBlue, colorRed, colorPink, colorBlack, colorGreen, colorYellow, setData }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Open
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Filter</DrawerHeader>

                    <DrawerBody>
                        <Box w={"100%"}>
                            <FilterProductsButtons onClose={onClose} filtMen={filtMen} filtWomen={filtWomen}filtBoys={filtBoys} filtGirls={filtGirls} sizeS={sizeS} sizeM={sizeM} sizeL={sizeL} sizeXL={sizeXL} sizeXXL={sizeXXL} colorBlue={colorBlue} colorRed={colorRed} colorPink={colorPink} colorBlack={colorBlack} colorGreen={colorGreen} colorYellow={colorYellow} setData={setData} />

                        </Box>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sliderr;