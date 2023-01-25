import { NavLink } from "react-router-dom";


export default function Navbar() {
  let activeStyle = 
   { color: 'wheat',
    width:"auto",
    textDecorationLine:"none",
    cursor:"pointer",
    fontWeight:"5",
    

}
  
  let normalStyle = { color: 'white',

  width:"auto",
  borderRadius:"10px",
  textDecorationLine:"none",
  fontWeight:"5",
  } 
  return (
    <div style={{ display: "flex",paddingLeft:"10%",paddingRight:"10%", justifyContent: "space-around",height:"auto",paddingTop:"10px",position:"sticky",top:"0",backgroundColor:"#474748",paddingBottom:"10px"}}>
        
      <NavLink
        style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/"
        end
      >
       Home
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Products"
      >
        Product-Page
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Login"
      >
      Login
      </NavLink>
      <NavLink
         style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Signup"
      >
      Sign-up
      </NavLink>
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Admin"
      >
      Admin
      </NavLink>
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/ActiveWear"
      >
      ActiveWear
      </NavLink>
      {/* <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Beauty"
      >
      Beauty
      </NavLink> */}
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Designer"
      >
      Designer
      </NavLink>
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/HolidayDeals"
      >
      HolidayDeals
      </NavLink>
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/HolidayGifts"
      >
      HolidayGifts
      </NavLink>
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Kids"
      >
      Kids
      </NavLink>
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Men"
      >
      Men
      </NavLink>
      {/* <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/YoungAdult"
      >
      YoungAdult
      </NavLink> */}
      {/* <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Payment"
      >
      Payment
      </NavLink>
       */}
      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Checkout"
      >
      Checkout
      </NavLink>

      <NavLink
          style={({ isActive }) => (isActive ?activeStyle :normalStyle )}
        to="/Cart"
      >
      Cart
      </NavLink>
    </div>
  );
}
