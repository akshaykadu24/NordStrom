import React from "react";
import { Link } from "react-router-dom";
import "./Sale.css";
import "./New.css";
const Shoes_menubar = () => {
  const list1 = [
    "View all",
    "New in",
    "Trainers",
    "Boots",
    "Flat shoes",
    "Heels",
    "Loafers",
    "Sandals",
    "Sliders & Flip flops",
    "Slippers",
    "Sports Trainers",
    "Wide Fit",
  ];
  /*
   */
  return (
    <div className="shoes_menu">
      <div>
        <h2>SHOP BY PRODUCTS</h2>
        <div className="submenu2">
          <ul>
            {list1.map((el) => (
              <li>
                <Link to={"/products/Shoes"}>{el}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>SHOP BY BRAND</h2>
        <div className="submenu4">
          <div>
            <div className="img-container">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-nipped-in-waist-mini-dress-in-green-boucle/203355826-1-greenboucle?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <div>
              <Link to={"/products/Shoes"}>ASOS Design</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-high-neck-shirred-pleated-maxi-dress-with-frill-edge-in-paisley-print/202935387-1-paisleyprint?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <div>
              {" "}
              <Link to={"/products/Shoes"}>Aldo</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                alt="clothing"
                src="https://content.asos-media.com/-/media/hubs/wedding/2021/jpeg/feat-cat/global/bridal_featcat_870x1110_dress2.jpg"
              />
            </div>
            <div>
              {" "}
              <Link to={"/products/Shoes"}>Converse</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-satin-maxi-dress-with-batwing-sleeve-and-wrap-waist-in-black/201711343-1-black?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <div>
              {" "}
              <Link to={"/products/Shoes"}>Dr Martens</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-structured-satin-cargo-jumpsuit-in-ivory/203567159-1-ivory?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <div>
              {" "}
              <Link to={"/products/Shoes"}>Public Desire</Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="submenu3">
          <Link to={"/products/Shoes"}>
            <img
              alt="clothing"
              src="https://images.asos-media.com/products/puma-cali-dream-trainers-in-white-and-oatmeal/203883258-1-whiteoatmeal?$n_640w$&wid=634&fit=constrain"
            />
          </Link>
          <Link to={"/products/Shoes"}>
            <img
              alt="clothing"
              src="https://images.asos-media.com/products/reebok-classic-club-c-vintage-trainers-in-chalk-with-green/202748018-1-whitegreen?$n_640w$&wid=634&fit=constrain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shoes_menubar;
