import { Box, Link, UnorderedList } from "@chakra-ui/react";
import HeroSlider, { Slide } from "hero-slider";
import { MultiItemCarousel } from "./MultiItemCarousel";

const banner1 = "/Homepage/img1.PNG";
const banner2 = "/Homepage/img2.webp";

export default function BannerSlider() {
    return (
        <>
            <UnorderedList className="BannerSlider"
                display={{ base: "none", sm: "none", md: "block", lg: "block" }}
                zIndex={"-99"}
                margin={"auto"}
                width={"95%"}
                padding={"10px 2px"}
                mb={"50px"}>
                    
                <HeroSlider
                    height={"300px"}
                    autoplay
                    controller={{
                        initialSlide: 1,
                        slidingDuration: 500,
                        slidingDelay: 50,
                    }}
                >
                    <Slide
                        background={{
                            backgroundImageSrc: banner1
                        }}
                        label="Hello"
                    />

                    <Slide
                        background={{
                            backgroundImageSrc: banner2
                        }}
                    />

                </HeroSlider>
            </UnorderedList>

            <UnorderedList 
                display={{ base: "block", sm: "block", md: "none", lg: "none" }}
                zIndex={"-99"}
                margin={"auto"}
                width={"95%"}
                padding={"10px 2px"}
                mb={"50px"}>

                <MultiItemCarousel />
            </UnorderedList>
        </>
    );
}