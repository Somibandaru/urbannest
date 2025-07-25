import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const ProductDisplay = ({product}) => {

  const {addToCart} = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError("");
    addToCart(product.id);
  };

  // Determine category and tags based on product.category
  let categoryLabel = '';
  let tagsLabel = '';
  if (product.category === 'women') {
    categoryLabel = 'Women, Dress, Top, Skirt';
    tagsLabel = 'Trendy, Elegant, New Arrival';
  } else if (product.category === 'men') {
    categoryLabel = 'Men, Shirt, Jeans, Jacket';
    tagsLabel = 'Classic, Modern, Bestseller';
  } else if (product.category === 'kid') {
    categoryLabel = 'Kids, T-shirt, Shorts, Dress';
    tagsLabel = 'Cute, Playful, Popular';
  } else {
    categoryLabel = 'Unisex, Apparel';
    tagsLabel = 'Fashion, Latest';
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={backend_url + product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{currency}{product.old_price}</div>
          <div className="productdisplay-right-price-new">{currency}{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
        {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {['S','M','L','XL','XXL'].map(size => (
              <div
                key={size}
                onClick={()=>setSelectedSize(size)}
                style={{
                  border: selectedSize === size ? '2px solid #ff4141' : '1px solid #ebebeb',
                  background: selectedSize === size ? '#ffeaea' : '#fbfbfb',
                  fontWeight: selectedSize === size ? 700 : 400,
                  color: selectedSize === size ? '#ff4141' : 'inherit',
                  transition: 'all 0.2s'
                }}
              >
                {size}
              </div>
            ))}
          </div>
          {error && <div style={{color:'#ff4141',marginTop:8}}>{error}</div>}
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> {categoryLabel}</p>
        <p className="productdisplay-right-category"><span>Tags :</span> {tagsLabel}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
