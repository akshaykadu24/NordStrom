import React from "react";
import { Link } from "react-router-dom";
import "./Sale.css";
const Dresses_menubar = () => {
  const list1 = [
    " Dresses under £20",
    "View all",
    "New in",
    "Evening dresses",
    "Wedding guest dresses",
    "Day dresses",
    "Bridesmaid dresses",
    "Party dresses",
    "Wedding dresses",
    "Linen dresses",
  ];
  const list2 = [
    "Floral dresses",
    "Long sleeve dresses",
    "Maxi dresses",
    "Midi dresses",
    "Mini dresses",
    "Satin dresses",
    "Shirt dresses",
    "Smock dresses",
    "Summer Dresses",
    "Tea dresses",
    "Wrap dresses",
  ];
  return (
    <div className="dresses_menu">
      <div>
        <h2>SHOP BY TYPE</h2>
        <div className="submenu2">
          <ul>
            {list1.map((el) => (
              <li>
                <Link to={"/products"}>{el}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>SHOP BY TREND</h2>
        <div className="submenu2">
          <ul>
            {list2.map((el) => (
              <li>
                <Link to={"/products"}>{el}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>SHOP BY BODY FIT</h2>
        <div className="submenu3">
          <div>
            <div className="menubar-images">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-curve-boyfriend-sweatshirt-in-white/13800847-1-white?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <p>ASOS Curve</p>
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
        <h2>SHOP BY COLOUR</h2>
        <div className="submenu4">
          <div>
            <div className="img-container">
              <img
                alt="clothing"
                src="https://images.asos-media.com/products/asos-design-nipped-in-waist-mini-dress-in-green-boucle/203355826-1-greenboucle?$n_640w$&wid=634&fit=constrain"
              />
            </div>
            <div>
              <Link to={"/products"}>Green Dresses</Link>
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
              <Link to={"/products"}>Orange Dresses</Link>
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
              <Link to={"/products"}>White Dresses</Link>
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
              <Link to={"/products"}>Black Dresses</Link>
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
              <Link to={"/products"}>Cream Dresses</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/*


*/
export default Dresses_menubar;
