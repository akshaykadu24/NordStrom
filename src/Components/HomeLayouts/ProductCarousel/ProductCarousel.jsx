import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Box, Button, Center, HStack, Image, Spacer, Stack, VStack } from '@chakra-ui/react';
import { Products } from './Products';
import { Link } from 'react-router-dom';

const Prev = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <Box zIndex={"10"} position={"absolute"} top={"45%"} left={"0px"} onClick={onClick}>
                <GrPrevious fontSize={"20px"} color={"#3f4246"} />
            </Box>
        </>
    );
};

const Next = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <Box zIndex={"10"} position={"absolute"} top={"45%"} right={"0px"} onClick={onClick}>
                <GrNext fontSize={"20px"} color={"#3f4246"} />
            </Box>
        </>
    );
};


export const ProductCarousel = ({ data = [], boolean }) => {
    data = data?.filter((e, i) => i<21)
    // console.log(data.length)
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1270,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    

    return (
        <Box w={"95%"} m={"auto auto 50px auto"}>

            <Slider {...settings} prevArrow={<Prev />} nextArrow={<Next />} >

                {
                    boolean && <Stack justify={"center"} align={"center"} w={"220px"} h={"380px"} p={"10px"} m={"auto"} boxSizing={"border-box"}>
                        <Stack h={"100%"} justify={"space-between"} align={"center"}>
                            <Image src={"/Homepage/img12.webp"} h={"80%"} alt="demo" />
                            <Button w={"186px"} colorScheme={"pink"}>Shop Now</Button>
                        </Stack>
                    </Stack>
                }


                {
                    data?.map((item) => (
                        <Products key={item.id} props={item} />
                    ))
                }

                <Box w={"220px"} h={"380px"} p={"10px"} m={"auto"} >
                    <Box w={"100%"} h={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} border={"1px solid #edf2f7"}>
                        <Link to={"/Products"}><Button colorScheme={"gray"}>Show More</Button></Link>
                    </Box>
                </Box>

            </Slider>
        </Box>
    );
};