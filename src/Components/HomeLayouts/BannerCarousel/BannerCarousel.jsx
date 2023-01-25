import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Box, Image} from '@chakra-ui/react';


const Catelogs = [
    {image:"/Homepage/img18.PNG", title:"Turn Up the Temp", description:"Weatherproof your wardrobe with these cozy essentials. ", links:["Men's Cold Weather", "Women's Cold Weather"]},
    {image:"/Homepage/img19.PNG", title:"Need Now: Puffy Boots", description:"Stay warm, dry and chic in trending styles from Jeffrey Campbell and more.", links:["Snow & Winter Boots", "All Women's Boots"]},
    {image:"/Homepage/img20.PNG",  title:"Simply Sexy", description:"See and be seen in effortlessly chic style.", links:["Holiday Night Out"]},
    {image:"/Homepage/img13.PNG", title:"'Tis the Season to Impress", description:"Your OOTN: metallics, minis and major shine from SOMETHING NEW, Lulus and more.", links:["Young Adult Holiday Outfits"]},
    {image:"/Homepage/img14.PNG", title:"Luxe Gifts: David Yurman", description:"Delight them with fine jewelry featuring David Yurman's signature cable pattern.", links:["Women's David Yurman", "Men's David Yurman"]},
    {image:"/Homepage/img15.PNG", title:"Gift Black This Holiday", description:"Use your spending power and commit 15% of your holiday shopping to Black-owned brands.", links:["Shop Black Owned or Founded Brands", "Learn About the Fifteen Percent Pledge"]},
    {image:"/Homepage/img16.PNG", title:"Put UGG Under the Tree", description:"Win the holidays with the cozy gifts everyone wants most.", links:["UGG Shoes:", "Women", "Men", "Kids"]},
    {image:"/Homepage/img17.PNG", title:"Altogether Cozy", description:"Festive pajamas for the whole family. ", links:["Women's Sleepwear & Robes", "Men's Pajamas, Loungewear & Robes", "Kids' Pajamas & Robes"]}
]

const Prev = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <Box zIndex={"10"} position={"absolute"} top={"45%"} left={"0px"} onClick={onClick}>
                <GrPrevious fontSize={"25px"} color={"#3f4246"} />
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
                <GrNext fontSize={"25px"} color={"#3f4246"} />
            </Box>
        </>
    );
};


export const BannerCarousel = () => {
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
        <Box w={"95%"} m={"50px auto"}>

            <Slider {...settings} prevArrow={<Prev />} nextArrow={<Next />} >

                <Image src={"/Homepage/img1.PNG"} w={"100%"} alt={"banner"} />
                <Image src={"/Homepage/img2.webp"} w={"100%"} alt={"banner"} />

            </Slider>
        </Box>
    );
};