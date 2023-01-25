import React from "react"
import { useState } from 'react';
import VerifyEmailForm from "../Components/Niranjan/OTP";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Image,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle
} from '@chakra-ui/react';
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import {useSelector} from "react-redux"
import Navbar from "../Components/Navbar/Navbar";





const Form1 = () => {
 
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>

      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Step-1: User Authentication
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="Last name" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email address
        </FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Form2 = () => {
  return (
    <>
    <Box style={{width:"100%",height:"50px",display:"flex",justifyContent:"space-evenly",cursor:"pointer"}}>
      <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/04/Regalia-HDFC.png.webp" style={{width:"10%",height:"100%",marginLeft:"10px"}}></Image>
      <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/simplysave-credit-card.jpg.webp" style={{width:"10%",height:"100%",marginLeft:"10px"}}></Image>
      <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/ICICI-Coral-Contactless-Card.jpg.webp" style={{width:"10%",height:"100%",marginLeft:"10px"}}></Image>
      <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/11/222.png.webp" style={{width:"10%",height:"100%",marginLeft:"10px"}}></Image>
      <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Citi-Cash-Back-Credit-Card.jpg.webp" style={{width:"10%",height:"100%",marginLeft:"10px"}}></Image>
      <Image src="https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/YES-Prosperity-Rewards-Plus.jpg.webp" style={{width:"10%",height:"100%",marginLeft:"10px"}}></Image>
    </Box>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        WE ACCEPT
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option>INDIA</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          marginTop="10px"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          State/Province
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Please Select"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option>Andhra Pradesh</option>
          <option>Arunachal Pradesh</option>
          <option>Assam</option>
          <option>Bihar</option>
          <option>Chhattisgarh</option>
          <option>Goa</option>
          <option>Gujrat</option>
          <option>Haryana</option>
          <option>Himachal Pradesh</option>
          <option>Jharkhand</option>
          <option>Karnataka</option>
          <option>Kerala</option>
          <option>Madhya Pradesh</option>
          <option>Maharashtra</option>
          <option>Manipur</option>
          <option>Meghalaya</option>
          <option>Mizoram</option>
          <option>Nagaland</option>
          <option>Odisha</option>
          <option>Punjab</option>
          <option>Rajasthan</option>
          <option>Sikkim</option>
          <option>Tamil Nadu</option>
          <option>Telangana</option>
          <option>Tripura</option>
          <option>Uttarakhand</option>
          <option>Utter Pradesh</option>
          <option>West Bengal</option>
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Card Provider
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option>HDFC Regalia Credit Card</option>
          <option>SBI Credit Card</option>
          <option>ICICI Bank Coral Contactless Card</option>
          <option>ICICI Platinum Chip Card – Visa</option>
          <option>Citibank Cashback Credit Card</option>
          <option>YES Prosperity Rewards Plus Credit Card</option>
          <option>IndusInd Bank Legend Credit Card</option>
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Cardholder Full Name
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          textAlign="center"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Credit Card Number
        </FormLabel>
        <Input
        textAlign="center"
          placeholder="1234 5678 7867"
          type="number"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          placeholder="Amount"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          textAlign="center"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Amount
        </FormLabel>
        <Input
        textAlign="center"
        placeholder=" Amount in Rs"
          type="number"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          textAlign="center"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Expiration Month 
        </FormLabel>
        <Input
          type="month"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          textAlign="center"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Security Code (CVV)
        </FormLabel>
        <Input
          textAlign="center"
          type="password"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
        Billing Address
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Street Address
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Email
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
        
      </FormControl>
     
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        OTP Varification
      </Heading>
      <VerifyEmailForm/>
    </>
  );
};


const Form4 = () => {
 

  return (
    
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Payment Recipt
      </Heading>
    
      
      <Button style={{marginTop:"20px",color:"white",backgroundColor:"teal"}}><NavLink to="/">HOME</NavLink></Button>
       
    </>
  );
};


export default function Checkout() {
  const navigate=useNavigate()
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
    <Navbar/>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> :<Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                  
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Payment Successfull.',
                    description: "Thank You for Purchasing Our Product",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:"top"
                  });

                  setTimeout(()=>{
                      return (
                        navigate("/")
                      )
                    
                      
                  },3000)
                }}>
                Submit
              </Button>
            ) : null}
            
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}