import "./authentication.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Heading, Center } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext/AuthContextProvider";
import logoImage from "../Asset/logo_main.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // clearInterval(+localStorage.getItem("setIntervalID"));
  const navigate = useNavigate();
  const authentication = useContext(AuthContext);
  const { logIn, googleSignIn, setUserAsAdmin, isAdmin } = authentication;
  const toast = useToast();
  console.log("isAdmin is ", isAdmin);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      console.log("user signed in");
      toast({
        title: "login successfull",
        status: "success",
        isClosable: true,
        position: "top",
      });
      document.querySelector("form").reset();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn()
        .then((res) => res.user)
        .then((res) => {
          console.log(res);
          toast({
            title: "login successfull",
            status: "success",
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    error &&
      toast({
        title: error,
        status: "error",
        isClosable: true,
        position: "top",
      });
  }, [error]);
  return (
    <>
      <div className="auth-nav">
        <Link to={"/"}>
          <img src={logoImage} alt="logo-image" />
        </Link>
      </div>
      <div className="login-main-container">
        <div className="auth-image-container">
          <img src="https://us.123rf.com/450wm/millena12/millena121811/millena12181100016/millena12181100016.jpg?ver=6" />
        </div>

        <div className="login-container">
          <Center>
            <Heading marginTop={10}>Login</Heading>
          </Center>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type={"email"}
                required
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={"password"}
                required
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="admin-check">
                <input
                  type="checkbox"
                  placeholder="Login as admin"
                  id="admin"
                  onClick={() => setUserAsAdmin()}
                />
                <label htmlFor="admin">Login as admin</label>
              </div>
              <input type={"submit"} id="submit" />
            </form>

            <div className="google-login" onClick={handleGoogleSignIn}>
              <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" />
              </div>
              <div>Login with Google</div>
            </div>
            <div>
              <p>
                Don't have an account? <Link to={"/Signup"}>Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
