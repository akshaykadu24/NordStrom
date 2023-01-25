import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Box, HStack, Link, Text, Image, VStack } from '@chakra-ui/react';

const banner1 = "/Homepage/img6.png"
const banner2 = "/Homepage/img7.png"

const Prev = (props) => {
  // console.log(props);
  const { className, onClick } = props;
  return (
    <>
      <Box zIndex={"10"} position={"absolute"} top={"32%"} left={"0px"} onClick={onClick}>
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
      <Box zIndex={"10"} position={"absolute"} top={"32%"} right={"0px"} onClick={onClick}>
        <GrNext fontSize={"20px"} color={"#3f4246"} />
      </Box>
    </>
  );
};


export const MultiItemCarousel = ({ data = [] }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };
  return (
    <Box w={"100%"} position={"relative"}>

      <Slider {...settings} prevArrow={<Prev />} nextArrow={<Next />} slidesToShow={1} slidesToScroll={1} >

        <VStack lineHeight={"15px"} m={"auto"} w={"90%"}>
          <Image src={banner1} width={"100%"} alt={"banner1"} />
          <Text pb={"5px"} fontSize={"20px"} fontWeight={"bold"} >Last-Minute Gifts</Text>
          <Text fontSize={"14px"} >Just what they wanted, just in time. Need it now?</Text>
          <Text fontSize={"14px"} >Buy online and pick up the same day in store.</Text>
          <HStack pt={"10px"} fontWeight={"500"} fontSize={"14px"} align={"center"} justify={"center"}>
            <Link textDecor={"underline"}>Stocking Stuffers</Link>
            <Link textDecor={"underline"}>Last-Minute Gifts</Link>
            <Link textDecor={"underline"}>Gift Cards</Link>
          </HStack>
        </VStack>

        <VStack m={"auto"} w={"90%"}>
          <img src={banner2} width={"100%"} alt={"banner2"} />
          <Text pb={"5px"} fontSize={"20px"} fontWeight={"500"}>Hurry! Prices May Change</Text>
          <Text textAlign={"center"} cursor={"pointer"} fontWeight={"500"} fontSize={"14px"} textDecor={"underline"}>Limited-Time Sale</Text>
        </VStack>

      </Slider>
    </Box>
  );
};