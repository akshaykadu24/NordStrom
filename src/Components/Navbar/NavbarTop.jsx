import {
  Flex,
  Image,
  Stack,
  InputGroup,
  InputRightElement,
  Input,
  Center,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import imageAddress from "../../Asset/logo_main.png";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext/AuthContextProvider";

const NavbarTop = () => {
  window.addEventListener("click", (e) => {
    if (
      !e.target.closest(".display-sidebar") &&
      !e.target.closest(".hamburger")
    )
      document.querySelector(".sidebar").classList.remove("display-sidebar");
  });
  function openfun() {
    document.querySelector(".sidebar").classList.toggle("display-sidebar");
  }

  const auth = useContext(AuthContext);
  const { user, logOut, isAdmin, isAuth } = auth;
  // console.log("isAdmin is", isAdmin);
  console.log("user is", user);
  const logoutHandler = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      className="navbar-top"
      width={"100vw"}
      backgroundColor="black"
      color={"white"}
      justifyContent="space-between"
      height={"max-content"}
      alignItems={"center"}
    >
      <Center>
        <Link to={"/"}>
          <Image
            className="image-logo"
            // height={"60px"}
            src={imageAddress}
            alt="website-logo"
            paddingLeft={"20px"}
            borderColor={"white"}
          />
        </Link>
      </Center>

      <Center>
        <Stack spacing={24} id="searchbar">
          <InputGroup>
            <Input
              placeholder="Search for Items and Brands"
              backgroundColor="white"
              color={"gray"}
              borderRadius={"10px"}
            />
            <InputRightElement
              pointerEvents="none"
              color="gray.300"
              children={<SearchIcon />}
            />
          </InputGroup>
        </Stack>
      </Center>
      <Flex
        id="user-container"
        fontSize={"2xl"}
        width="20vw"
        justifyContent={"space-around"}
        alignItems="center"
      >
        <div className="user">
          <i className="fa-regular fa-user" />
          <div className="user-menu">
            <div className="login-user">
              <Link to={"/login"}>
                {user ? user.displayName || "Guest" : "Login"}
              </Link>
              <p className="admin-text">{isAdmin && isAuth ? "admin" : null}</p>
            </div>
            <div className="login-menu">
              <div>
                <i className="fa-regular fa-user"></i>
              </div>
              <div>
                <Link to={"/singleuser"}>My Account</Link>
              </div>
            </div>
            <div className="login-menu" id="mob-wishlist">
              <div>
                <i className="fa-regular fa-heart"></i>
              </div>
              <div>Wishlist</div>
            </div>
            <div className="login-menu">
              <div>
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <div>
                <Link to={"/orders"}>My Orders</Link>
              </div>
            </div>
            {isAdmin && isAuth ? (
              <div className="login-menu">
                <div>
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <Link to={"/adminpanel"}>Admin Panel</Link>
                </div>
              </div>
            ) : null}
            <div className="login-menu">
              <div>
                <i className="fa-regular fa-circle-question"></i>
              </div>
              <div>Return Information</div>
            </div>
            <div className="login-menu">
              <div>
                <i className="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>Contact Preferances</div>
            </div>
            {user ? (
              <div className="login-user" onClick={logoutHandler}>
                <Link to={"/login"}>Logout</Link>
              </div>
            ) : null}
          </div>
        </div>
        <div className="wishlist">
          <Link to={"/wishlist"}>
            <i className="fa-regular fa-heart" />
          </Link>
        </div>
        <div>
          <Link to={"/Cart"}>
            <BsHandbag />
          </Link>
        </div>
        <div className="hamburger">
          <Link>
            <RxHamburgerMenu onClick={openfun} className="hamburger-icon" />
          </Link>
          <div className="sidebar">
            <div id="mob-user-menu">
              <div className="login-user">
                <Link to={"/login"}>
                  {user ? user.displayName || "Guest" : "Login"}
                </Link>
                <p className="admin-text">
                  {isAdmin && isAuth ? "admin" : null}
                </p>
              </div>
              <div className="login-menu">
                <div>
                  <i className="fa-regular fa-user"></i>
                </div>
                <div>
                  <Link to={"/singleuser"}>My Account</Link>
                </div>
              </div>
              <div className="login-menu" id="mob-wishlist">
                <div>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <div>Wishlist</div>
              </div>
              <div className="login-menu">
                <div>
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>
                <div>
                  <Link to={"/orders"}>My Orders</Link>
                </div>
              </div>
              {isAdmin && isAuth ? (
                <div className="login-menu">
                  <div>
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div>
                    <Link to={"/adminpanel"}>Admin Panel</Link>
                  </div>
                </div>
              ) : null}
              <div className="login-menu">
                <div>
                  <i className="fa-regular fa-circle-question"></i>
                </div>
                <div>Return Information</div>
              </div>
              <div className="login-menu">
                <div>
                  <i className="fa-solid fa-chalkboard-user"></i>
                </div>
                <div>Contact Preferances</div>
              </div>
              {user ? (
                <div className="login-user" onClick={logoutHandler}>
                  <Link to={"/login"}>Logout</Link>
                </div>
              ) : null}
            </div>
            <div className="mob-categories">Categories</div>
            <ul>
              <Link to="/Products">
                <li>Sale</li>
              </Link>
              <Link to="/Products">
                <li>New</li>
              </Link>
              <Link to="/Products">
                <li>Clothing</li>
              </Link>
              <Link to="/Products">
                <li>Dresses</li>
              </Link>
              <Link to="/Products">
                <li>Shoes</li>
              </Link>
              <Link to="/Products">
                <li>Sportswear</li>
              </Link>
              <Link to="/Products">
                <li>Accessories</li>
              </Link>
              <Link to="/Products">
                <li>Atumn</li>
              </Link>
              <Link to="/Products">
                <li>Gift</li>
              </Link>
              <Link to="/Products">
                <li>TopShop</li>
              </Link>
              <Link to="/Products">
                <li>Face+Body</li>
              </Link>
              <Link to="/Products">
                <li>Marketplace</li>
              </Link>
            </ul>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default NavbarTop;
