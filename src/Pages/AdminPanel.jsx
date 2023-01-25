import { Center, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  HStack,
  Select,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import "./AdminPanel.css";
import AdminCard from "../Components/AdminCard/AdminCard";
import { async } from "@firebase/util";
const AdminPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialItem = {
    image: "",
    gender: "",
    category: "",
    price: "",
    title: "",
  };
  const [itemCreated, setItemCreated] = useState(initialItem);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [itemsReceived, setItemsReceived] = useState([]);
  const [itemsListed, setItemsListed] = useState({
    Clothing: [],
    Shoes: [],
    Watches: [],
    Perfume: [],
  });

  // for firebase
  const productsItemsCollectionRef = collection(db, "products");
  const adminItemsCollectionRef = collection(db, "admin-collection-asos");
  const addProducts = async (product) => {
    await addDoc(adminItemsCollectionRef, product);
    toast({
      title: "item added",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 3000,
    });
  };
  const filterItems = (datareceived) => {
    console.log("items received for filter is", datareceived);
    console.log("filtering items");
    setItemsListed({
      ...itemsListed,
      Clothing: datareceived.filter((el) => {
        if (el.category === "Clothing") return el;
      }),
      Shoes: datareceived.filter((el) => {
        if (el.category === "Shoes") return el;
      }),
      Watches: datareceived.filter((el) => {
        if (el.category === "Watches") return el;
      }),
      Perfume: datareceived.filter((el) => {
        if (el.category === "Perfume") return el;
      }),
    });
  };
  // console.log(itemsListed);
  const adminSubmitHandler = (e) => {
    e.preventDefault();
    console.log("form submit");
    console.log(itemCreated);
    addProducts(itemCreated);
    getProducts();
    document.querySelector("form").reset();
  };
  const getProducts = async () => {
    const data = await getDocs(adminItemsCollectionRef);
    try {
      const datareceived = data.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }));
      console.log("data received after getting is", datareceived);
      setItemsReceived(datareceived);
      filterItems(datareceived);
    } catch (error) {
      console.log(error);
    }
  };
  const updatefun = () => {
    getProducts();
  };
  clearInterval(+localStorage.getItem("setIntervalID"));

  useEffect(() => {
    getProducts();
    // console.log(productstoadd);
    // console.log("items received", itemsReceived);
  }, []);

  const addItems = async (product) => {
    // console.log("working!");
    // console.log("product is ", product);
    await addDoc(productsItemsCollectionRef, product);
    toast({
      title: "item added",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 3000,
    });
  };
  return (
    <div className="panel-container">
      <NavLink to={"/"} className="back-to-home">
        Back to Home
      </NavLink>
      {/* <Center>
        <button
          onClick={() => {
            cloths.forEach((el) => {
              addItems(el);
            });
          }}
        >
          click to add
        </button>
      </Center> */}
      <Heading margin={"10px"} marginBottom="30px" textAlign={"center"}>
        {" "}
        Admin Panel
      </Heading>

      <>
        <Center>
          <Button onClick={onOpen}>Add Item +</Button>
        </Center>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Items</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form
                className="item-details-form"
                aria-required={true}
                onSubmit={adminSubmitHandler}
              >
                <Box>
                  <FormLabel>Item image url</FormLabel>
                  <Input
                    type={"url"}
                    ref={initialRef}
                    placeholder="Item image url"
                    required
                    onInput={(e) =>
                      setItemCreated({ ...itemCreated, image: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel>Item title</FormLabel>
                  <Input
                    type={"text"}
                    placeholder="Item title"
                    required
                    onInput={(e) =>
                      setItemCreated({ ...itemCreated, title: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel>Item Price</FormLabel>
                  <Input
                    type={"number"}
                    placeholder="Item Price"
                    required
                    onInput={(e) =>
                      setItemCreated({ ...itemCreated, price: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel as="legend">Select Gender</FormLabel>
                  <RadioGroup
                    defaultValue="Women"
                    required
                    onClick={(e) =>
                      setItemCreated({ ...itemCreated, gender: e.target.value })
                    }
                  >
                    <HStack spacing="24px">
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </HStack>
                  </RadioGroup>
                </Box>
                <Box>
                  <FormLabel>Select Category</FormLabel>
                  <Select
                    placeholder="Select category"
                    required
                    onChange={(e) =>
                      setItemCreated({
                        ...itemCreated,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value={"Clothing"}>Clothing</option>
                    <option value={"Shoes"}>Shoes</option>
                    <option value={"Watches"}>Watches</option>
                    <option value={"Perfume"}>Perfume</option>
                  </Select>
                </Box>
                <Box>
                  <Input
                    type={"submit"}
                    bg="#1b5ba0"
                    color={"white"}
                    fontWeight="extrabold"
                    value="ADD ITEM"
                  />
                </Box>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className="item-container">
          <p>Clothing</p>
          <div className="item-category-container">
            {itemsListed.Clothing.length ? (
              itemsListed.Clothing.map((el) => (
                <AdminCard product={el} key={el.id} updatefun={updatefun} />
              ))
            ) : (
              <h2>No items in this category</h2>
            )}
          </div>
          <p>Shoes</p>
          <div className="item-category-container">
            {itemsListed.Shoes.length ? (
              itemsListed.Shoes.map((el) => (
                <AdminCard product={el} key={el.id} updatefun={updatefun} />
              ))
            ) : (
              <h2>No items in this category</h2>
            )}
          </div>
          <p>Watches</p>
          <div className="item-category-container">
            {itemsListed.Watches.length ? (
              itemsListed.Watches.map((el) => (
                <AdminCard product={el} key={el.id} updatefun={updatefun} />
              ))
            ) : (
              <h2>No items in this category</h2>
            )}
          </div>
          <p>Perfume</p>
          <div className="item-category-container">
            {itemsListed.Perfume.length ? (
              itemsListed.Perfume.map((el) => (
                <AdminCard product={el} key={el.id} updatefun={updatefun} />
              ))
            ) : (
              <h2>No items in this category</h2>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminPanel;

const productstobeadd = [
  {
    id: 2,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210094_000_b?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210094_000_b2?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    cardDetails: "Maeve Halter-Neck Ruched Maxi Dress",
    price: "250",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 3,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570014_066_b?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570014_066_b2?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    cardDetails: "The Somerset Mini Dress: Linen Edition",
    price: "200",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 4,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_034_b14?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_034_b2?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    cardDetails: "Devotion Twins Embroidered Ella Tunic Dress",
    price: "270",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 5,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_040_b?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_040_b2?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    cardDetails: "The Somerset Maxi Dress: Linen Edition",
    price: "170",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 6,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160135_010_c?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160135_010_c2?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    cardDetails: "By Anthropologie Linen Wrap Mini Dress",
    price: "190",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 7,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420031_069_b2?$an-category$&fit=constrain&fmt=webp&hei=1046&qlt=80&wid=698",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420031_069_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Mini Dress",
    price: "210",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 8,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060048_040_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060048_040_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Tiered Ruffled Mini Dress",
    price: "240",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 9,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130551300180_035_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130551300180_035_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "MISA Sleeveless V-Neck Ruffle Midi Dress",
    price: "180",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 10,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160129_072_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160129_072_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Mini Dress: Eyelet Edition",
    price: "160",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 11,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420009_068_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420009_068_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress",
    price: "170",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 12,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420009_011_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420009_011_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress",
    price: "170",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 13,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_065_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_065_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress",
    price: "190",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 14,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_063_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_063_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress",
    price: "180",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 15,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_001_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress",
    price: "160",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 16,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_010_c14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_010_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress: Linen Edition",
    price: "200",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 17,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_060_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_060_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Maxi Dress: Linen Edition",
    price: "210",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 18,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_065_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_065_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Devotion Twins Embroidered Ella Tunic Dress",
    price: "250",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 19,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_015_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_015_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Devotion Twins Embroidered Ella Tunic Dress",
    price: "230",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 20,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_105_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_105_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Devotion Twins Embroidered Ella Tunic Dress",
    price: "170",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 21,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160128_049_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160128_049_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Sleeveless Somerset Mini Dress: Poplin Edition",
    price: "170",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 22,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_042_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130728470001_042_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Devotion Twins Embroidered Ella Tunic Dress",
    price: "190",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 23,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160128_009_c?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160128_009_c2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Sleeveless Somerset Mini Dress: Poplin Edition",
    price: "160",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 24,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130264840011_052_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130264840011_052_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Mini Dress",
    price: "180",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 25,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210042_049_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210042_049_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Marais Printed Chiffon Maxi Dress",
    price: "210",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 26,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160057_060_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160057_060_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Robin Tiered Mini Dress",
    price: "230",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 27,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130638280170_011_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130638280170_011_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Farm Rio Halter Maxi Dress",
    price: "250",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 28,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130089450012_049_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130089450012_049_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Pilcro Puff-Sleeve Tunic",
    price: "150",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 29,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68889245_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68889245_001_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "By Anthropologie Gauzy Cutout Cover-Up Maxi Dress",
    price: "170",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 30,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68130483_085_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68130483_085_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bl-nk Floral V-Neck Caftan",
    price: "200",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 31,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130344600154_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130344600154_066_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Forever That Girl Sheer Flowy Mini Dress",
    price: "160",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 32,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130331400015_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130331400015_010_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Not So Serious by Pallavi Mohan Deep-V Mini Dress",
    price: "180",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 33,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210078_049_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210078_049_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Emily Halter Mini Dress",
    price: "160",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 34,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570014_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570014_001_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "The Somerset Mini Dress: Linen Edition",
    price: "220",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 35,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68889245_011_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68889245_011_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "By Anthropologie Gauzy Cutout Cover-Up Maxi Dress",
    price: "240",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 36,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130231803171_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130231803171_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Byron Lars Carissima Sheath Dress",
    price: "200",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 37,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210077_049_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130916210077_049_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "V-Neck Plunge Tunic Mini Dress",
    price: "250",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 38,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130652010001_070_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130652010001_070_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Elyse Bias Slip Dress",
    price: "150",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 39,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130084320085_001_c?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130084320085_001_c3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "By Anthropologie Deep V-Neck Vibrant Mini Dress",
    price: "190",
    gender: "Female",
    category: "Clothing",
  },
  {
    id: 40,
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160057_068_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160057_068_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Robin Tiered Mini Dress",
    price: "155",
    gender: "Female",
    category: "Clothing",
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67554261_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67554261_066_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Jeffrey Campbell Basket Heels",
    price: "225",
    gender: "Female",
    category: "Shoes",
    id: 41,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66297565_068_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66297565_068_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bibi Lou Aoi Heels",
    price: "180",
    gender: "Female",
    category: "Shoes",
    id: 42,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/65224065_053_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/65224065_053_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Seychelles Leeward Mules",
    price: "119",
    gender: "Female",
    category: "Shoes",
    id: 43,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69212355_080_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69212355_080_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Alohas Brushed Degradé Mules",
    price: "168",
    gender: "Female",
    category: "Shoes",
    id: 44,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67426239_030_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67426239_030_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Angel Alarcon Strappy Heelss",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 45,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68634195_025_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68634195_025_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Jeffrey Campbell Basket Heels",
    price: "200",
    gender: "Female",
    category: "Shoes",
    id: 46,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66604497_068_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66604497_068_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Jeffrey Campbell Linques Sandals",
    price: "130",
    gender: "Female",
    category: "Shoes",
    id: 47,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66436783_072_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66436783_072_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Birkenstock Arizona EVA Sandals",
    price: "80",
    gender: "Female",
    category: "Shoes",
    id: 48,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66174640_068_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66174640_068_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Seychelles Low Key Glow Up Sandals",
    price: "99",
    gender: "Female",
    category: "Shoes",
    id: 49,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/59968305_002_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/59968305_002_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Teva Universal Midform Sandals",
    price: "79",
    gender: "Female",
    category: "Shoes",
    id: 50,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/57064404_002_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/57064404_002_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Veja Campo Leather Sneakers",
    price: "179",
    gender: "Female",
    category: "Shoes",
    id: 51,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/58264052_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/58264052_010_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "On Cloud X Sneakers",
    price: "140",
    gender: "Female",
    category: "Shoes",
    id: 52,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69827319_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69827319_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Nisolo Isla Woven Slide Sandals",
    price: "100",
    gender: "Female",
    category: "Shoes",
    id: 53,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68877380_012_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68877380_012_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Nisolo Isla Woven Slide Sandals",
    price: "130",
    gender: "Female",
    category: "Shoes",
    id: 54,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/65105884_041_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/65105884_041_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Guilhermina Sculptural Heeled Sandals",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 55,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66297565_080_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66297565_080_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bibi Lou Aoi Heels",
    price: "180",
    gender: "Female",
    category: "Shoes",
    id: 56,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66297565_030_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66297565_030_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bibi Lou Aoi Heels",
    price: "180",
    gender: "Female",
    category: "Shoes",
    id: 57,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69822229_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69822229_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bernardo Raleigh Heels",
    price: "210",
    gender: "Female",
    category: "Shoes",
    id: 58,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68756824_040_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68756824_040_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Silent D Nider Boots",
    price: "140",
    gender: "Female",
    category: "Shoes",
    id: 59,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/78159779_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/78159779_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bernardo Eloise Ballet Flats",
    price: "175",
    gender: "Female",
    category: "Shoes",
    id: 60,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67081315_014_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67081315_014_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Caster H2O Boots",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 61,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67081315_026_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67081315_026_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Caster H2O Boots",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 62,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67081315_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67081315_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Caster H2O Boots",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 63,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/76192566_010_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/76192566_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Soludos Rainbow Wave Sneakers",
    price: "180",
    gender: "Female",
    category: "Shoes",
    id: 64,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67425074_020_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67425074_020_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Pilcro Gladiator Sport Sandals",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 65,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67747006_080_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67747006_080_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "TKEES Solids Thong Sandals",
    price: "60",
    gender: "Female",
    category: "Shoes",
    id: 66,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66417809_065_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66417809_065_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Jeffrey Campbell Saints Heel",
    price: "170",
    gender: "Female",
    category: "Shoes",
    id: 67,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/76178912_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/76178912_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Soludos Platform Smoking Slippers",
    price: "90",
    gender: "Female",
    category: "Shoes",
    id: 68,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68475268_221_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68475268_221_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Kelsi Dagger Swag Sandals",
    price: "140",
    gender: "Female",
    category: "Shoes",
    id: 69,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/61509329_009_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/61509329_009_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Beek Seabird Slide Sandals",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 70,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68542943_001_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68542943_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Vicenza Knotted Platform Heels",
    price: "190",
    gender: "Female",
    category: "Shoes",
    id: 71,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68542190_080_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68542190_080_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Vicenza Metallic Mules",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 72,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/76192954_016_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/76192954_016_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Soludos Ibiza Platform Sneakers",
    price: "140",
    gender: "Female",
    category: "Shoes",
    id: 73,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68945401_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68945401_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Angel Alarcon Ankle-Strap Heels",
    price: "190",
    gender: "Female",
    category: "Shoes",
    id: 74,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67192310_011_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67192310_011_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Nisolo Mara Woven Loafers",
    price: "180",
    gender: "Female",
    category: "Shoes",
    id: 75,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68541952_025_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68541952_025_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Vicenza Square-Toe Mules",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 76,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68731850_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68731850_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Seychelles Loud and Clear Heels",
    price: "140",
    gender: "Female",
    category: "Shoes",
    id: 77,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67015693_001_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67015693_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Caverley Trish Heeled Mules",
    price: "165",
    gender: "Female",
    category: "Shoes",
    id: 78,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/64783913_044_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/64783913_044_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "New Balance 574 Light Slate Sneakers",
    price: "90",
    gender: "Female",
    category: "Shoes",
    id: 79,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68703271_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68703271_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Seychelles Heartfelt Sandals",
    price: "110",
    gender: "Female",
    category: "Shoes",
    id: 80,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68829134_024_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68829134_024_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Guilhermina Pointed-Toe Mary Janes",
    price: "140",
    gender: "Female",
    category: "Shoes",
    id: 81,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68756469_020_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68756469_020_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Silent D Delvia Boots",
    price: "170",
    gender: "Female",
    category: "Shoes",
    id: 82,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68543271_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68543271_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Vicenza Strappy Platform Heels",
    price: "200",
    gender: "Female",
    category: "Shoes",
    id: 83,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68384353_005_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68384353_005_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "UGG Fluff Yeah Slide Slippers",
    price: "100",
    gender: "Female",
    category: "Shoes",
    id: 84,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68945690_020_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68945690_020_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Angel Alarcon Mary Jane Heels",
    price: "120",
    gender: "Female",
    category: "Shoes",
    id: 85,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/78156692_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/78156692_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bernardo Sochi Clogs",
    price: "230",
    gender: "Female",
    category: "Shoes",
    id: 86,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69333631_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69333631_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Sita Heels",
    price: "149",
    gender: "Female",
    category: "Shoes",
    id: 87,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67837575_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67837575_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Schutz Lily Mid Heels",
    price: "180",
    gender: "Female",
    category: "Shoes",
    id: 88,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/76189422_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/76189422_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Soludos Venetian Mules",
    price: "159",
    gender: "Female",
    category: "Shoes",
    id: 89,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/78157609_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/78157609_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bernardo Sophia Clogs",
    price: "250",
    gender: "Female",
    category: "Shoes",
    id: 90,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68733203_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68733203_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Seychelles Fancy Affair Boots",
    price: "160",
    gender: "Female",
    category: "Shoes",
    id: 91,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/78156346_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/78156346_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Bernardo Sorrena Heeled Sandals",
    price: "248",
    gender: "Female",
    category: "Shoes",
    id: 92,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/65567992_266_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/65567992_266_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Teva Midform Universal Sandals",
    price: "80",
    gender: "Female",
    category: "Shoes",
    id: 93,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67745745_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67745745_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "TKEES Foundations Glossy Sandals",
    price: "70",
    gender: "Female",
    category: "Shoes",
    id: 94,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69332997_014_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69332997_014_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Camdin Heels",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 95,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69332997_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69332997_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Camdin Heels",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 96,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/59826149_009_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/59826149_009_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "On Cloudnova Sneakers",
    price: "179",
    gender: "Female",
    category: "Shoes",
    id: 97,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68807197_026_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68807197_026_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Matisse Scorpio Ballet Flats",
    price: "130",
    gender: "Female",
    category: "Shoes",
    id: 98,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67013219_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67013219_010_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Schutz Hina Heels",
    price: "138",
    gender: "Female",
    category: "Shoes",
    id: 99,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/67746784_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/67746784_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "TKEES Senna Strappy Sandals",
    price: "75",
    gender: "Female",
    category: "Shoes",
    id: 100,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/69422574_020_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/69422574_020_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Dolce Vita Elly Platform Heels",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 101,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/61768479_066_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/61768479_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "New Balance Fresh Foam Roav v2",
    price: "90",
    gender: "Female",
    category: "Shoes",
    id: 102,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/60051281_021_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/60051281_021_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Silent D Puly Western Boots",
    price: "200",
    gender: "Female",
    category: "Shoes",
    id: 103,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68728880_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68728880_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Seychelles Stand Tall Slip-On Flats",
    price: "139",
    gender: "Female",
    category: "Shoes",
    id: 104,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68768472_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68768472_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "Birkenstock Boston Vegan Flats",
    price: "120",
    gender: "Female",
    category: "Shoes",
    id: 105,
  },
  {
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68620756_041_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68620756_041_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=1080",
    cardDetails: "All Black Strappy Sandals",
    price: "150",
    gender: "Female",
    category: "Shoes",
    id: 106,
  },
];
const productstobeadded = [
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210063_040_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210063_040_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Long-Sleeve Buttondown",
    price: 798.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210077_040_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210077_040_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Bustier Top",
    price: 678.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66489675_040_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66489675_040_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "By Anthropologie The Sapphire Hoodie",
    price: 442.0,
    category: "Clothing",
    gender: "Female",
  },

  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420009_041_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420009_041_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Maxi Dress",
    price: 431.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130084320085_030_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130084320085_030_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Deep V-Neck Vibrant Mini Dress",
    price: 328.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112449700005_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112449700005_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Layered Cutout Tank",
    price: 329.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112326250021_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112326250021_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "En Elly Ruched Mock-Neck Tank",
    price: 188.0,
    category: "Clothing",
    gender: "Female",
  },

  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4111345460005_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4111345460005_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro Shrunken Shacket",
    price: 338.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4125675950002_410_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4125675950002_410_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Significant Other Ophelia Shorts",
    price: 218.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110089540080_010_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110089540080_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Sarah Campbell for Anthropologie Floral Blouse",
    price: 290.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_083_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130370060072_083_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Maxi Dress",
    price: 400.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110907290003_072_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110907290003_072_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Romy Relaxed Buttondown",
    price: 326.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110264840029_035_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110264840029_035_b4?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro Oxford Tunic Buttondown",
    price: 382.0,
    category: "Clothing",
    gender: "Female",
  },

  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112522160097_083_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112522160097_083_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Ruffled Rib Halter Tank",
    price: 246.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110370060061_083_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110370060061_083_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Ruffled Pintucked Blouse",
    price: 196.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130089450010_072_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130089450010_072_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Cross-Back Mini Dress",
    price: 248.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112211810112_010_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112211810112_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Mock Neck Tank",
    price: 180.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160137_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160137_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "By Anthropologie Tiered Maxi Dress",
    price: 360.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110652010043_060_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110652010043_060_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro Tavi Buttondown Blouse",
    price: 398.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66489675_062_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66489675_062_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Sapphire Hoodie",
    price: 398.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210063_060_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210063_060_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Long-Sleeve Buttondown",
    price: 246.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112609690221_060_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112609690221_060_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "T.La Ribbed Halter Tank",
    price: 148.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110647160056_064_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110647160056_064_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Poplin Henley Shirt",
    price: 498.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4138348690017_060_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4138348690017_060_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Tube Top and Wide-Leg Pant Set",
    price: 298.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4123650590210_008_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4123650590210_008_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve The Colette Cropped Wide-Leg Pants",
    price: 235.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112919040016_032_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112919040016_032_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro Ruched Ribbed Halter",
    price: 458.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4111212060005_032_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4111212060005_032_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "DOLAN Lace-Sleeve Sweatshirt",
    price: 468.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160128_049_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=540",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130647160128_049_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=540",
    cardDetails: "The Somerset Maxi Dress",
    price: 448.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4123339180024_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4123339180024_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Knit Flare Pants",
    price: 322.0,
    category: "Clothingk",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66665274_065_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66665274_065_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Mini Dress: Linen Edition",
    price: 388.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112522160115_068_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112522160115_068_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro Ribbed Henley Tee",
    price: 169.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/66796657_066_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/66796657_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Ribbed Baby Tee",
    price: 179.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68650548_066_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68650548_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Graphic Sweatshirt",
    price: 388.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112368730044_066_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112368730044_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Asymmetric Ribbed Tank",
    price: 178.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4114529100144_066_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4114529100144_066_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro Knit Turtleneck Tank",
    price: 369.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130084320084_266_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130084320084_266_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Tie-Back Maxi Dress",
    price: 673.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112522160112_068_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112522160112_068_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The-Shoulder Flutter Top",
    price: 268.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112265640015_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112265640015_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Maeve Structured Mock Neck Top",
    price: 188.0,
    category: "Clothingk",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210121_010_b15?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210121_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "By Anthropologie Draped Tee",
    price: 174.0,
    category: "Clothinge",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210108_011_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4110916210108_011_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Cropped Utility Pullover",
    price: 200.0,
    category: "Clothinge",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130264840011_040_b?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130264840011_040_b14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Mini Dress",
    price: 263.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4120370060023_038_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4120370060023_038_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Sleek A-Line Midi Skirt",
    price: 345.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4120084320026_030_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4120084320026_030_b3?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Ruffled Wrap Maxi Skirt",
    price: 150.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/68438852_034_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/68438852_034_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Way Home Shorts",
    price: 256.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_030_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_030_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Maxi Dress",
    price: 185.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112265640015_063_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112265640015_063_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Structured Mock Neck Top",
    price: 252.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112916210052_062_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112916210052_062_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Smocked Puff-Sleeve Top",
    price: 658.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4111522160007_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4111522160007_001_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Pilcro V-Neck Sweatshirt",
    price: 178.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112449700005_046_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112449700005_046_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "Layered Cutout Tank",
    price: 167.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_010_b?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130578570013_010_c14?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Maxi Dress: Linen Edition",
    price: 144.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112609690111_010_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112609690111_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "T.La Classic V-Neck Tee",
    price: 166.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112368730048_010_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4112368730048_010_b?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "By Anthropologie Woven Ruffle Top",
    price: 236.0,
    category: "Clothing",
    gender: "Female",
  },
  {
    inImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130646420031_001_b2?$an-category$&fit=constrain&fmt=webp&hei=523&qlt=80&wid=349",
    outImage:
      "https://images.urbndata.com/is/image/Anthropologie/4130264840011_001_b2?$a15-pdp-detail-shot$&fit=constrain&fmt=webp&qlt=80&wid=640",
    cardDetails: "The Somerset Mini Dress",
    price: 368.0,
    category: "Clothing",
    gender: "Female",
  },
];
const Watches = [
  {
    inImage: "https://m.media-amazon.com/images/I/61-dgJIfkgL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71gdBQP+qGL._UY879_.jpg",
    cardDetails: "Redux Analogue Black Dial Men’s Watch",
    price: 2200,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81Cqmm7SDJL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81CwsCvUWqL._UY879_.jpg",
    cardDetails: "TIMEWEAR Analog Leather Strap Watch",
    price: 2800,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71mG8FfkbFL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71CEEzbDS-L._UY879_.jpg",
    cardDetails: "Fastrack Black Magic Analog Black Dial Men's Watch",
    price: 3500,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61vWcqrwRvL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61y2VVWcGBL._SX679_.jpg",
    cardDetails: "Fire-Boltt Phoenix Smart Watch with Bluetooth",
    price: 2750,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61c6sVzeqwL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61epn29QG0L._SX679_.jpg",
    cardDetails: "Noise ColorFit Pulse Spo2 Smart Watch",
    price: 2000,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71Vj+IKmmiL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/612Vt0kgNeL._SX679_.jpg",
    cardDetails: "Fire-Boltt India's No 1 Smartwatch Brand",
    price: 3000,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61vjs7r4vGL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51+6hbisNEL._UY879_.jpg",
    cardDetails: "Casio Vintage Series Digital Grey Dial Men's Watch",
    price: 1500,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61icQIngc1L._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71pmJEPozpL._UY879_.jpg",
    cardDetails: "Fastrack Trendies Analog Black Dial Men's Watch",
    price: 1800,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61RcADSKZaL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71uYLvTxsQL._UY879_.jpg",
    cardDetails: "TIMEX Analog Men's Watch",
    price: 1000,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81Tg2JGC63L._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/812moxVoL9L._UY879_.jpg",
    cardDetails: "Redux Analogue IPG Golden Dial Men’s watch",
    price: 1200,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71tmnjShwEL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81eNprKPlZL._UX679_.jpg",
    cardDetails: "TIMEWEAR Digital Men's Watch",
    price: 1800,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71VNWE3doDL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61aEzzAw7AL._SX679_.jpg",
    cardDetails: "boAt Xtend Smart Watch with Alexa Built-in",
    price: 2200,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/715C6Ga9z7L._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81BDpSIwu3L._UY879_.jpg",
    cardDetails: "Redux Analog Linear Designer Dial Men’s & Boy's Watch",
    price: 1600,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81ALVuOjleL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71tc0IQKJGL._UX679_.jpg",
    cardDetails: "Fossil Gen 5 Touchscreen Men's Smartwatch",
    price: 10000,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61+m6mTVJ+L._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/614oJTn+2mL._SX679_.jpg",
    cardDetails: "Noise Pulse Buzz 1.69' Bluetooth Calling Smart Watch",
    price: 3900,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81AW04Sc0CL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81xBsbhVjeL._UX679_.jpg",
    cardDetails: "BY BENYAR Analogue Men's Watch",
    price: 2500,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71wjZRxsDkL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81PivQ+Y79L._UX679_.jpg",
    cardDetails: "Decode Matrix Analog Dial Men's Watch",
    price: 1350,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61pIesiVrUL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61W4+fsm-zL._UY879_.jpg",
    cardDetails: "Fastrack Two Timers Analog Black Dial Men's Watch",
    price: 2000,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51JI-WLww0L._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61FKVerMRWL._UX679_.jpg",
    cardDetails: "Casio Enticer Men Analog Black Dial Watch",
    price: 4200,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61c3dG+Z1CL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51VL5j5r8kL.jpg",
    cardDetails: "V2A Military Tactical Camouflage Analog Digital watch",
    price: 2800,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51yxhNgIjPL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51yxhNgIjPL._UX679_.jpg",
    cardDetails: "Helix Analog Blue Dial Men's Watch",
    price: 1900,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61S2TWZOK3L.jpg",
    outImage: "https://m.media-amazon.com/images/I/61W7pHgHxjL._UY879_.jpg",
    cardDetails: "NAVIFORCE Analogue Multicolour Dial Golden Brown Bites",
    price: 2300,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61Qy37jp3IL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61HI9vTGKnL._SX679_.jpg",
    cardDetails: "boAt Unisex-Adult Watch",
    price: 4500,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/91L8S4abCKL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81TpueADAjL._UX679_.jpg",
    cardDetails: "Michael Kors Dylan Analog Blue Dial Men's Watch",
    price: 3000,
    gender: "Male",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/511qGZMDfzL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61xNW92L+YL._UY879_.jpg",
    cardDetails: "Casio Analog White Dial Women's Watch",
    price: 4000,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51XNpdKUxSL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61ZPEqwSLoL._UY879_.jpg",
    cardDetails: "Fastrack Tropical Waters Analog White Dial Women's Watch",
    price: 1500,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61Dk0ckLaAL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/611F4PDYWCL._UY879_.jpg",
    cardDetails: "Fastrack Analog Silver Dial Women's Watch",
    price: 2150,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61cI2yn8UHL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71q1XTuJHsL._UX679_.jpg",
    cardDetails: "Fastrack Sunburn Analog Green Dial Women's Watch",
    price: 1850,
    gender: "Female",
    category: "Watches",
  },

  {
    inImage: "https://m.media-amazon.com/images/I/616JzvvbPxL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71raoL+s56L._UY879_.jpg",
    cardDetails: "Fastrack Trendies Analog Red Dial Women's Watch",
    price: 2600,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61eZtUWbGkL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71XJErvx8-L._UY879_.jpg",
    cardDetails: "TIMEX Analog Women's Watch",
    price: 1750,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51AGXRV+miL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71bGvFg1F-L._UY879_.jpg",
    cardDetails: "Casio Analog Rose Gold Dial Women's Watch",
    price: 5550,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71rcJZerayS._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/614OvJkS3US._UX679_.jpg",
    cardDetails: "Fastrack Analog Grey Dial Women's Watch",
    price: 3200,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71IEiWQMdnL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71YgyLKyi+L._UX679_.jpg",
    cardDetails:
      "Fastrack I Love Me Valentine Special Analog Blue Dial Women's Watch",
    price: 2850,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61JAkRsjEuL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71OjjTMlskL._UY879_.jpg",
    cardDetails: "Fossil Women's Modern Courier Stainless Steel Watch",
    price: 4500,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61ULOaiamAL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/512HtYAriML._UX679_.jpg",
    cardDetails: "Fastrack Reflex VOX Unisex Smartwatch with Alexa",
    price: 5800,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61GpgZMNNdL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61qEontdesL._SX679_.jpg",
    cardDetails: "Noise ColorFit Pro 4 Advanced Bluetooth Calling Smart Watch",
    price: 4400,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81rlSRb587L._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/817iC5Eq49L._UX679_.jpg",
    cardDetails: "SWISSTONE Analogue Women's Watch",
    price: 1900,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51vWcg+6lWS._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61fc1SNU8TS._UX679_.jpg",
    cardDetails: "TIMEX Analog Women's Watch",
    price: 2400,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/610R-3ixCPL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71Gj-PAtAmL._UY879_.jpg",
    cardDetails: "Timex Analog Gold Dial Women's Watch",
    price: 3400,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61-gGXF8XGL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71S8hn6xv4L._UY879_.jpg",
    cardDetails: "Fastrack Analog Dial Women's Watch ",
    price: 1300,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71sVl5vYt6S._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61uY-wl4OdL._UX679_.jpg",
    cardDetails: "ADAMO Analog Rose Gold Dial Women's Watch",
    price: 2350,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61kmEsJ2BDL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61TfoVDHWML._SX679_.jpg",
    cardDetails:
      "Noise ColorFit Pulse Smartwatch with 1.4' Full Touch HD Display",
    price: 6000,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61XxQaMVoKL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/618mFEP9mTL._SX679_.jpg",
    cardDetails: "Noise ColorFit Pulse Grand Smart Watch",
    price: 5200,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61CFG9OG1LL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61C32Tn1a+L._SX679_.jpg",
    cardDetails: "boAt Wave Call Smart Watch, Smart Talk",
    price: 3750,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61gyiOjis3L._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61OMvTYZ1oL._SX679_.jpg",
    cardDetails: "Fire-Boltt Neptune Smartwatch",
    price: 3400,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61z1QYbPl6L._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61DZclqQ4RL._SX679_.jpg",
    cardDetails: "boAt Wave Lite Smartwatch with 1.69' HD Display",
    price: 2800,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51tnn+kw5fL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61DRnuSAgqL._UX679_.jpg",
    cardDetails: "Titan Smart Smartwatch with Alexa Built-in, Aluminum Body",
    price: 8700,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/41sZzBa71uL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51gCy1ROsWL._UX679_.jpg",
    cardDetails: "Fossil Gen 6 Smartwatch with AMOLED Screen",
    price: 20000,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61v23S2WjNL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/619MuIU9KRL._UX679_.jpg",
    cardDetails: "Titan Smart Pro Smartwatch with AMOLED Display",
    price: 17500,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71jHqMfC9cL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61+mEROaHHL._SX679_.jpg",
    cardDetails:
      "Fire-Boltt Ninja 2 SpO2 Full Touch Smartwatch with 30 Workout Modes",
    price: 5450,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61TlbZ02bPL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71fKTLN7aTL._SX679_.jpg",
    cardDetails:
      "Fire-Boltt Visionary 1.78' AMOLED Bluetooth Calling Smartwatch",
    price: 6700,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81+Yc0dmirL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71ILzQ3of6L._UX679_.jpg",
    cardDetails: "Fossil Gen 5 Touchscreen Women's Smartwatch",
    price: 15500,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61g04MpohML._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61hHoj8Jt7L._SX679_.jpg",
    cardDetails: "Fire-Boltt Beast Pro Bluetooth Calling Watch",
    price: 4750,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/610j0pc2lYL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61R7rKLTrHL._SX679_.jpg",
    cardDetails: "Amazfit GTS2 Mini (New Version) Smart Watch",
    price: 3800,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/719sjelFNaL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/718pWEv++fL._SX679_.jpg",
    cardDetails: "Fire-Boltt Phoenix Smart Watch with Bluetooth Calling Watch",
    price: 6500,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71s-Wy8ApbL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61ONpCn+yyL._SX679_.jpg",
    cardDetails: " Fire-Boltt Ninja 3 Smartwatch Full Touch Watch",
    price: 5500,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61rDkEctYkL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61vjvgxN93L._SX679_.jpg",
    cardDetails: "Noise ColorFit Pro 4 Max 1.8' Biggest Display",
    price: 4800,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61axX+g4mXL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61NvfzX+qSL._SX679_.jpg",
    cardDetails: "Noise X-Fit 1 ( HRX Edition) Smart Watch Fitness Tracker",
    price: 1800,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61jxj6wBBYL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61zPnEJUnlL._SX679_.jpg",
    cardDetails:
      "Noise ColorFit Ultra 2 LE with 1.78' Always On AMOLED Display",
    price: 3800,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71rdet-aydL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61F1SVuthwS._SX679_.jpg",
    cardDetails:
      "Fire-Boltt 360 SpO2 Full Touch Large Display Round Smartwatch",
    price: 7000,
    gender: "Female",
    category: "Watches",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81zy0gDL1GL._SX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81giIgBedaL._SX679_.jpg",
    cardDetails: "Michael Kors Gen 5E Watch",
    price: 2100,
    gender: "Female",
    category: "Watches",
  },
];

const cloths = [
  {
    inImage: "https://m.media-amazon.com/images/I/718Xc9XQLLL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81UaD79-LOL._UY879_.jpg",
    cardDetails: "THE ARCHER Solid Men Hooded Neck with Mask T-Shirt",
    price: 450,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61ArH0UAqPL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71hGiy5zwzL._UY879_.jpg",
    cardDetails: "LEWEL Men's Stylish Hooded Checkered Buttoned Down T-Shirt",
    price: 350,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71EOg-Fh7SL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/719ZLZHNaRL._UX679_.jpg",
    cardDetails:
      "Urbano Fashion Men's Light Grey Slim Fit Jogger Jeans Stretch",
    price: 420,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/91WyOKwruFL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81FdTUQjczL._UY879_.jpg",
    cardDetails: "Amazon Brand - House & Shields Men Hooded Sweatshirt",
    price: 220,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/711Ku5lk5wL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71vp8Lec9JL._UX679_.jpg",
    cardDetails: "Scott International Men's Regular Fit T-Shirt (Pack of 3)",
    price: 500,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81otfKX+qNL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81LThZqBayL._UY879_.jpg",
    cardDetails: "Amazon Brand - Inkast Denim Co. Men's Slim Shirt",
    price: 300,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81qSfON2X9S._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81t+qrTO9gS._UY879_.jpg",
    cardDetails: "Qube By Fort Collins Men's Sweatshirt",
    price: 200,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51i8KRphPuL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51yIybqYFTL._UX679_.jpg",
    cardDetails: "Dennis Lingo Men Shirt",
    price: 230,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71O0+ZeyZPL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/715AdtVcWEL._UY879_.jpg",
    cardDetails: "Amazon Brand - Symbol Men's Slim Fit Formal Trousers",
    price: 250,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/718MX5xkyvL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81EqA--jXFL._UY879_.jpg",
    cardDetails: "Inkast Denim Co. Men's Slim Fit Casual Shirt",
    price: 130,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/513pqv1pRLL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51B3ZQdcBKL._UX679_.jpg",
    cardDetails: "Gauri Laxmi Enterprise Men's Cotton Blend Straight Kurta",
    price: 330,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/517roRX-qPL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51txbLKMYEL._UY879_.jpg",
    cardDetails: "Alan Jones Clothing Men's Cotton Hooded Neck Hoodies",
    price: 650,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/715huZyV81L._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71HX6eNCmcL._UY879_.jpg",
    cardDetails: "Red Tape Men's Cotton Crew Neck Sweatshirt",
    price: 340,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61AMv9X7CYL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61yE15t4m7L._UY879_.jpg",
    cardDetails:
      "Larwa Ethnic Loop Button Ganesh print Kurta & salwar Dhoti set special for mens",
    price: 870,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61u9Cbc5zYL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51SwpZW4kmL.jpg",
    cardDetails:
      "N.B.F Fashion Men Ethnic Wear Red Sleeveless Modi Jackets Waistcoats",
    price: 980,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/91aJWizt-wL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61ehGST3mbL._UY879_.jpg",
    cardDetails: "Men's Dupion Silk Kurta Ethnic Bundi Nehru Jacket/Waistcoat",
    price: 760,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71dPlzzrgLL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61LqCo5SpJL._UY879_.jpg",
    cardDetails:
      "Tweedle Ethnic Kullu Design Woven Shawl / Stole for Men, Woolen Scarf for Winters",
    price: 1110,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51CyuAXl9zL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51zcGb+hypL._UX679_.jpg",
    cardDetails: "Sanwara Men's silk Ethnic Jacket",
    price: 340,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61SzCLCTgxL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/41hZaVGO-yL._UX679_.jpg",
    cardDetails: "Hangup men ethnic traditional sherwani",
    price: 650,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71OOnlaSCNL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71lc9clXRyL._UY879_.jpg",
    cardDetails: "Vastraa Fusion Men's Cotton Blend Ethnic Nehru Jacket",
    price: 560,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61TGrlx-ZHL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/610v5QbF5GL._UY879_.jpg",
    cardDetails: "Vastramay Men's Cream Cotton Silk Blend Ethnic Jacket",
    price: 400,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71ey7114nDL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/716dSJbp-xL._UX679_.jpg",
    cardDetails: "VASTRAMAY Men's Neheru Modi Ethnic Jacket",
    price: 780,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81aLz3YpqjL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/810cgP9SgML._UY879_.jpg",
    cardDetails: "Jompers Men's Cotton Silk Straight Kurta",
    price: 900,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/91S2PEQyjDL._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71y67g1CV2L._UY879_.jpg",
    cardDetails: "Manyavar Men Kurta Jacket Set",
    price: 670,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81AIgBNi1lS._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/91ciKriHcES._UY879_.jpg",
    cardDetails:
      "N.B.F Fashion Mens Traditional Ethnic Wear Indo Western Style Kurta Pajama Set",
    price: 1230,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81jh302VMcS._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81qjm0OlzmS._UY879_.jpg",
    cardDetails: "N.B.F Fashion Mens Ethnic Wear Indo Western Set",
    price: 540,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71nGe3Vv+LL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71cnAWrBHXL._UX679_.jpg",
    cardDetails:
      "Urbano Fashion Men's Regular Fit Washed Full Sleeve Denim Jacket",
    price: 310,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61N3qcte7zL._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61mqx2-CJdL._UX679_.jpg",
    cardDetails: "Ben Martin Men's Nylon Full Sleeve Bomber Jacket",
    price: 1080,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51fYU7-LWEL.jpg",
    outImage: "https://m.media-amazon.com/images/I/51MTHu1eqpL.jpg",
    cardDetails: "NEOAMBER Regular Fit Jacket for Men",
    price: 760,
    gender: "Male",
    category: "Clothing",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71ojYAwDyPS._UY879_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71lr09zCPFS._UY879_.jpg",
    cardDetails: "VROJASS Full Sleeve Solid Men Panel Bomper Jacket",
    price: 840,
    gender: "Male",
    category: "Clothing",
  },
];

const shoe = [
  {
    inImage: "https://m.media-amazon.com/images/I/61X2YxI1ueL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61nynjmQBVL._UY695_.jpg",
    cardDetails: "Red Tape Men's Rte352 Leather Derby",
    price: 890,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81T8cy42ueL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81BBBgUiluL._UX695_.jpg",
    cardDetails: "Sparx Men Sneakers",
    price: 640,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/910OHRzO+PL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71AfojFejBL._UY695_.jpg",
    cardDetails: "Knoos Men's Loafer",
    price: 560,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81VPge1OP2L._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71kfO4VXDFL._UX695_.jpg",
    cardDetails: "Adidas Men's Adivat M Running Shoes",
    price: 1600,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/7177MGjBVUL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71Qu22EbOTL._UX695_.jpg",
    cardDetails: "US Polo Association Men's Panal Sneakers",
    price: 1900,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/412xJm5L2UL.jpg",
    outImage: "https://m.media-amazon.com/images/I/412xJm5L2UL.jpg",
    cardDetails: "Bacca Bucci Men's Walking Shoe",
    price: 790,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/812YOY9zUML._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71cMHLwnOQL._UY695_.jpg",
    cardDetails: "Clarks Men Bampton Walk British Tan Lea Leather Formal Shoes",
    price: 1200,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61G4gKjUemL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61VQWxrKgjL._UY695_.jpg",
    cardDetails: "Bacca Bucci Men's Sneaker",
    price: 980,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71IbsFg2+5L._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71CmDrlKIkL._UY695_.jpg",
    cardDetails: "Centrino Mens 2105 Formal Shoes",
    price: 1180,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81e7HChPNiL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/718SPSP6n5L._UX695_.jpg",
    cardDetails: "Sparx Men's Running Shoe",
    price: 1300,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61h+E0k2uYL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61O41FwCQFL._UY695_.jpg",
    cardDetails: "ASIAN Men's Skypee-162 Casual Sneaker ",
    price: 720,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71j+eOsWTeL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71oSDCuF-jL._UY695_.jpg",
    cardDetails: "Centrino Men's 9383 Formal Shoes",
    price: 870,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/518oN+TPf6S._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61pYhDY8fxL._UY695_.jpg",
    cardDetails: "ASIAN Men's Cosko Sports Running,Walking,Gym,Training Shoes",
    price: 800,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81wfgUak72L._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/7125k6zeQyL._UY695_.jpg",
    cardDetails: "Kraasa Men Slip-On Formals, Office Wear, Dress Up Shoes",
    price: 750,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/518bLtYspKL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/518bLtYspKL._UY695_.jpg",
    cardDetails: "Puma Men's Jaunt Idp Running Shoes",
    price: 1670,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/514+2SqBBnL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61q9kJgxAHL._UY695_.jpg",
    cardDetails: "Kraasa Casual Lace Up Sneaker, Men Casual Shoes",
    price: 1290,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51yG2zfPSVL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51lKEJm9qFL._UY695_.jpg",
    cardDetails: "ASIAN Men's Synthetic Sports,Running,Casual Loafer Shoes",
    price: 670,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61U70iqOAIL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg",
    cardDetails: "ASIAN Men's Wonder-13 Sports Running Shoes",
    price: 790,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/41iAJBLJeRL.jpg",
    outImage: "https://m.media-amazon.com/images/I/71c4oKBocuL._UX695_.jpg",
    cardDetails:
      "Ethics Men's White Navy Stylish Sports & Running Outdoor Shoes",
    price: 820,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81DLmjrxUmL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81bsTMUVIXL._UX695_.jpg",
    cardDetails: "Puma Men's Elsu V2 Mid Sl Idp Sneakers",
    price: 1450,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61Pwr+yghQL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61r9oNywMeL._UY695_.jpg",
    cardDetails: "Bacca Bucci Men's Running Shoe",
    price: 880,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51P5FKI7i2L._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/51g6S2XoAcL._UY695_.jpg",
    cardDetails: "Sparx Mens Casual Stripped Sneakers",
    price: 1230,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71EnIx6Od2L._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/611sL8k8HPL._UY695_.jpg",
    cardDetails: "Bacca Bucci Men's Korean Style High Sneakers",
    price: 1260,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/717C7wlvKnL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/719D0iGy7EL._UY695_.jpg",
    cardDetails: "Big Fox Men's Classic Boot Shoes",
    price: 2130,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61ah2jSRpVS._UX679_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61ZOUZ39srS._UX679_.jpg",
    cardDetails: "Jordan Men's Nike Air 1 Retro High Og",
    price: 12000,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/618Rs2pNr0L._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61tNTz-gZFL._UX695_.jpg",
    cardDetails: "Nike Boys Sunray Protect 2 (PS) Black/White Sandal ",
    price: 2320,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71dUEnjzWvL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71DfKRLNiXL._UX695_.jpg",
    cardDetails: "Nike Womens WMNS Zoom Winflo 7 Platform",
    price: 4540,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/51Vqe51cUtL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61a9RqyKwtS._UX695_.jpg",
    cardDetails: "Nike mens Nike Dunk Low Photon Dust Sneaker",
    price: 6560,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61bo2sTBrjL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61Nsa2aXSqL._UX695_.jpg",
    cardDetails: "Nike Mens Blazer Mid '77 VNTG Three Quarter HIGH",
    price: 7650,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/9139dffLPEL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/91bxy1+cSOL._UX695_.jpg",
    cardDetails: "Nike Mens Roshe One Running Shoes",
    price: 5000,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61KlE1KvOyL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/516a-L8VJZL._UY695_.jpg",
    cardDetails: "Under Armour unisex-adult Hovr Havoc 3 Basketball Shoe",
    price: 8790,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81CvrtfUXbL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81x1M0KeHaL._UX695_.jpg",
    cardDetails: "Under Armour Men's UA Speedform Gemini 3 Running Shoes",
    price: 9890,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81C0C0pr3sL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/917Dk9y3DcL._UX695_.jpg",
    cardDetails: "Under Armour Men UA Lightning 2 Running Shoes",
    price: 7660,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/718oOcSzggS._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81YZMr0PdKS._UX695_.jpg",
    cardDetails: "Under Armour Men's HOVR Rise 3 Cross Trainer",
    price: 12350,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61jXj7RP-3L._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/610pXGf+NXL._UX695_.jpg",
    cardDetails: "Under Armour C1N Trainer",
    price: 15550,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61LCAfUHCaL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61N+zu6FvgL._UY695_.jpg",
    cardDetails:
      "Under Armour Men's Valsetz Rts 1.5 with Zipper Military and Tactical Boot",
    price: 18000,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/813KI5rTKpL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81lnL-knVqL._UX695_.jpg",
    cardDetails: "Under Armour Women's Micro G Pursuit Running Shoe",
    price: 13330,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/61cKp4AHVWL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61qcQRAdKyL._UY695_.jpg",
    cardDetails: "Under Armour Men Running Shoes",
    price: 6990,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71eoIQaesrL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71gyDkfns4L._UX695_.jpg",
    cardDetails: "Under Armour Men's Yard Low St Baseball Shoe",
    price: 14550,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71YDvnzGqGL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/71YDvnzGqGL._UX695_.jpg",
    cardDetails: "Under Armour Men's Walking Shoes",
    price: 18880,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71iD6j+vGzL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/813EJLIHJ0L._UX695_.jpg",
    cardDetails: "Under Armour Men's Spotlight Lux Mc Football Shoe",
    price: 18500,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/81pQK2qS-JL._UX695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81DE-ChsFsL._UX695_.jpg",
    cardDetails: "Under Armour Mens Ua HOVR Rise Training Shoes",
    price: 10500,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/615nMwp845L._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/61Xryg94eTL._UY695_.jpg",
    cardDetails: "Under Armour Men's HOVR Phantom 2 Running Shoes",
    price: 9990,
    gender: "Male",
    category: "Shoes",
  },
  {
    inImage: "https://m.media-amazon.com/images/I/71cLl3cyCSL._UY695_.jpg",
    outImage: "https://m.media-amazon.com/images/I/81ng9nedAqL._UX695_.jpg",
    cardDetails: "Under Armour Leadoff Low Rm Black/Red 6.5 D(M) US",
    price: 8500,
    gender: "Male",
    category: "Shoes",
  },
];
// {
//   inImage: "",
//   outImage: "",
//   cardDetails: "",
//   price: 0,
//   gender: "Male",
//   category: "Shoes",
// },
