import { Link } from "react-router-dom";
import React from "react";
import "./Sale.css";
const Sale_menubar = () => {
  return (
    <div className="sale_menu">
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
                <Link to={"/products/Clothing"}>SALE Jeans</Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>SALE Jewellery & Watches</Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>
                  SALE Jumpsuits & Playsuits
                </Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>SALE Lingerie & Nightwear</Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>SALE Shorts</Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>SALE Skirts</Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>SALE Socks & Tights</Link>
              </li>
              <li>
                <Link to={"/products/Clothing"}>SALE Sunglasses</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>SHOP BY EDIT</h2>
        <div className="submenu2">
          <ul>
            <li>
              <Link to={"/products/Clothing"}>Biggest deals</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Sale under £15</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Top saved</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Dresses under £15</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Jeans under £20</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Sale: Autumn essentials</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Sale: Sneakerbrands</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Occasionwear</Link>
            </li>
            <li>
              <Link to={"/products/Clothing"}>Last chance to buy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>SHOP SALE BY BODY FIT</h2>
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
    </div>
  );
};

export default Sale_menubar;
