import React from "react";
import { Link } from "react-router-dom";
import "./Sale.css";
const Clothing_menubar = () => {
  return (
    <div className="clothing_menu">
      <div>
        <h2>SHOP BY PRODUCT</h2>
        <div className="submenu1">
          <div>
            <ul>
              <li>
                <Link to={"/products"}>SALE New lines added</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Selling fast</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Dresses</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Tops</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Shoes</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Coats & Jackets</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Ankle Boots</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Jumpers & Cardigans</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Hoodies & Sweatshirts</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Accessories</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Activewear</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Bags & Purses</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <Link to={"/products"}>SALE Jeans</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Jewellery & Watches</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Jumpsuits & Playsuits</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Lingerie & Nightwear</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Shorts</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Skirts</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Socks & Tights</Link>
              </li>
              <li>
                <Link to={"/products"}>SALE Sunglasses</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>SHOP SALE BY BODY FIT</h2>
        <div className="submenu2">
          <div>
            <div className="menubar-images">
              <img
                src="https://images.asos-media.com/products/asos-design-curve-boyfriend-sweatshirt-in-white/13800847-1-white?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <p>ASOS Curve</p>
          </div>
          <div>
            <div className="menubar-images">
              <img
                src="https://images.asos-media.com/products/asos-design-maternity-twist-and-drape-front-midi-dress-in-soft-pink/201449622-1-softpink?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <p>Maternity</p>
          </div>
          <div>
            <div className="menubar-images">
              <img
                src="https://images.asos-media.com/products/asos-design-petite-canvas-oversized-bomber-jacket-in-stone/201292760-1-stone?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <p>Petite</p>
          </div>
          <div>
            <div className="menubar-images">
              <img
                src="https://images.asos-media.com/products/asos-design-tall-ultimate-jogger-in-neutral/200253856-1-neutral?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <p>Tall</p>
          </div>
        </div>
      </div>
      <div>
        <h2>SHOP BY EDIT</h2>
        <div className="submenu4">
          <div>
            <div className="img-container">
              <img
                src="https://images.asos-media.com/products/asos-design-nipped-in-waist-mini-dress-in-green-boucle/203355826-1-greenboucle?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <div>
              <Link to={"/products"}>Workwear</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                src="https://images.asos-media.com/products/asos-design-high-neck-shirred-pleated-maxi-dress-with-frill-edge-in-paisley-print/202935387-1-paisleyprint?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <div>
              {" "}
              <Link to={"/products"}>Ocassionwear</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                src="https://content.asos-media.com/-/media/hubs/wedding/2021/jpeg/feat-cat/global/bridal_featcat_870x1110_dress2.jpg"
                alt="clothing "
              />
            </div>
            <div>
              {" "}
              <Link to={"/products"}>Wedding</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                src="https://images.asos-media.com/products/asos-design-satin-maxi-dress-with-batwing-sleeve-and-wrap-waist-in-black/201711343-1-black?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <div>
              {" "}
              <Link to={"/products"}>Modest fashion</Link>
            </div>
          </div>
          <div>
            <div className="img-container">
              <img
                src="https://images.asos-media.com/products/asos-design-structured-satin-cargo-jumpsuit-in-ivory/203567159-1-ivory?$n_640w$&wid=634&fit=constrain"
                alt="clothing "
              />
            </div>
            <div>
              {" "}
              <Link to={"/products"}>Partywear</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothing_menubar;
