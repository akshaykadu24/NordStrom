import { Flex } from "@chakra-ui/react";
import React, { useReducer } from "react";
import "./Navbar.css";
// import Accessories_menubar from "./Menubar/Accessories_menubar";
// import Autmn_menubar from "./Menubar/Autmn_menubar";
// import Brands_menubar from "./Menubar/Brands_menubar";
import Clothing_menubar from "./Menubar/Clothing_menubar";
import Dresses_menubar from "./Menubar/Dresses_menubar";
// import FaceBody_menubar from "./Menubar/FaceBody_menubar";
// import Gifting_menubar from "./Menubar/Gifting_menubar";
// import Marketplace_menubar from "./Menubar/Marketplace_menubar";
import New_menubar from "./Menubar/New_menubar";
import Sale_menubar from "./Menubar/Sale_menubar";
import Shoes_menubar from "./Menubar/Shoes_menubar";
// import Sportswear_menubar from "./Menubar/Sportswear_menubar";
// import Topshop_menubar from "./Menubar/Topshop_menubar";
import Menubar, { ACTIONS } from "./Menubar";
import { Link } from "react-router-dom";
const menubar_reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ACCESSORIES:
      return <Shoes_menubar />;
    case ACTIONS.AUTUMN:
      return <New_menubar />;
    case ACTIONS.BRANDS:
      return <Dresses_menubar />;
    case ACTIONS.CLOTHING:
      return <Clothing_menubar />;
    case ACTIONS.DRESSES:
      return <Dresses_menubar />;
    case ACTIONS.FACEBODY:
      return <New_menubar />;
    case ACTIONS.GIFTING:
      return <Clothing_menubar />;
    case ACTIONS.MARKETPLACE:
      return <New_menubar />;
    case ACTIONS.NEW:
      return <New_menubar />;
    case ACTIONS.SALE:
      return <Sale_menubar />;
    case ACTIONS.SHOES:
      return <Shoes_menubar />;
    case ACTIONS.SPORTSWEAR:
      return <Sale_menubar />;
    case ACTIONS.TOPSHOP:
      return <Dresses_menubar />;
    default:
      return null;
  }
};
const NavbarBottom = () => {
  // const [initialstate,setState]  = useState(null)
  const [state, menubar_dispatcher] = useReducer(menubar_reducer, null);
  const menubarOptions = [
    "Sale",
    "New",
    "Clothing",
    "Dresses",
    "Shoes",
    "Sportswear",
    "Accessories",
    "Autumn",
    "Gifting",
    "Topshop",
    "Face+Body",
    "Brands",
    "Marketplace",
  ];
  return (
    <>
      <Flex paddingLeft={20} className="navbar-bottom" id="bottom-navbar">
        <ul>
          {menubarOptions.map((el) => (
            <li
              onMouseOver={() => {
                menubar_dispatcher({ type: el });
              }}
              onMouseLeave={() => {
                menubar_dispatcher({ type: "none" });
              }}
            >
              <Link to={"/products"}>{el}</Link>
              {state && <Menubar component={state} />}
            </li>
          ))}
        </ul>
      </Flex>
    </>
  );
};

export default NavbarBottom;
