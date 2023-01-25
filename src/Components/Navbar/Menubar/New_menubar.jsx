import React from "react";
import { Link } from "react-router-dom";
import "./New.css";
const New_menubar = () => {
  const listItems = [
    "Watches",
    "Clothing",
    "Shoes",
    "Accessories",
    "Face+Body",
    "Topshop",
    "Back in Stocks",
    "Outlet",
    "Trending now",
  ];
  return (
    <div className="new_menu">
      <div>
        <h2>NEW PRODUCTS</h2>
        <div className="submenu1">
          <ul>
            {listItems.map((el) => (
              <li>
                <Link to={"/products/Watches"}>{el}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>SHOP BY BODY FIT</h2>
        <div className="submenu2">
          <div>
            <div className="menubar-images">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-curve-boyfriend-sweatshirt-in-white/13800847-1-white?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <p>ASOS Curve </p>
          </div>
          <div>
            <div className="menubar-images">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-maternity-twist-and-drape-front-midi-dress-in-soft-pink/201449622-1-softpink?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <p>Maternity</p>
          </div>
          <div>
            <div className="menubar-images">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-petite-canvas-oversized-bomber-jacket-in-stone/201292760-1-stone?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <p>Petite</p>
          </div>
          <div>
            <div className="menubar-images">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-tall-ultimate-jogger-in-neutral/200253856-1-neutral?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <p>Tall</p>
          </div>
        </div>
      </div>
      <div>
        <h2>NEW EDITS</h2>
        <div className="submenu3">
          <Link to={"/products/Clothing"}>
            <img
              alt="clothing"
              src="https://images.asos-media.com/products/asos-design-cami-embellished-maxi-dress-with-a-belt-in-gold/201597010-1-gold?$n_640w$&wid=634&fit=constrain"
            />
          </Link>
          <Link to={"/products/Clothing"}>
            <img
              alt="clothing"
              src="https://images.asos-media.com/products/asos-design-halter-neck-backless-wide-leg-jumpsuit-in-magenta/202859384-1-magenta?$n_960w$&wid=952&fit=constrain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default New_menubar;
