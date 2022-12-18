import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Box, HStack, UnorderedList } from '@chakra-ui/react';
import { Gift2 } from './Gift2';

const Prev = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <UnorderedList display={{ base: "block", sm: "none", md: "none", lg: "none" }}>
                <Box zIndex={"10"} position={"absolute"} top={"45%"} left={"0px"} onClick={onClick}>
                    <GrPrevious fontSize={"25px"} color={"#3f4246"} />
                </Box>
            </UnorderedList>
        </>
    );
};

const Next = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <UnorderedList display={{ base: "block", sm: "none", md: "none", lg: "none" }}>
                <Box zIndex={"10"} position={"absolute"} top={"45%"} right={"0px"} onClick={onClick}>
                    <GrNext fontSize={"25px"} color={"#3f4246"} />
                </Box>
            </UnorderedList>
        </>
    );
};


export const Gift2Carousel = ({Gifts=[]}) => {

    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <>
            <UnorderedList display={{ base: "none", sm: "block", md: "block", lg: "block" }} w={"100%"} m={"auto"}>

                <HStack w={"95%"} position={"relative"} m={"50px auto"}>

                    {
                        Gifts?.map((item, i) => (
                            <Gift2 key={i} {...item} />
                        ))
                    }

                </HStack>

            </UnorderedList>

            <UnorderedList display={{ base: "block", sm: "none", md: "none", lg: "none" }} w={"100%"} m={"auto"}>
                <Box w={"95%"} m={"50px auto"}>

                    <Slider {...settings} prevArrow={<Prev/>} nextArrow={<Next/>}>

                        {
                            Gifts?.map((item, i) => (
                                <Gift2 key={i} {...item} />
                            ))
                        }

                    </Slider>
                </Box>
            </UnorderedList>

        </>
    );
};