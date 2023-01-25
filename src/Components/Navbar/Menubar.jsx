import React from "react";
import { Center } from "@chakra-ui/react";
export const ACTIONS = {
  ACCESSORIES: "Accessories",
  AUTUMN: "Autumn",
  BRANDS: "Brands",
  CLOTHING: "Clothing",
  DRESSES: "Dresses",
  FACEBODY: "Face+Body",
  GIFTING: "Gifting",
  MARKETPLACE: "Marketplace",
  NEW: "New",
  SALE: "Sale",
  SHOES: "Shoes",
  SPORTSWEAR: "Sportswear",
  TOPSHOP: "Topshop",
};

const Menubar = ({ component }) => {
  return <Center className="menubar">{component}</Center>;
};

export default Menubar;
