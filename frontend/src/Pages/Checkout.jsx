import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../App";

const Checkout = () => {
  const { products, cartItems, getTotalCartAmount, clearCart } = useContext(ShopContext);
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", zip: "" });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "" });
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const handleShipping = e => setShipping({ ...shipping, [e.target.name]: e.target.value });
  const handlePayment = e => setPayment({ ...payment, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setPlacingOrder(true);
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Please login to place an order.");
      setPlacingOrder(false);
      return;
    }
    // Prepare order items
    const orderItems = products.filter(p => cartItems[p.id] > 0).map(p => ({
      productId: p.id,
      name: p.name,
      quantity: cartItems[p.id],
      price: p.new_price,
      image: p.image,
    }));
    const total = getTotalCartAmount();
    if (orderItems.length === 0) {
      alert("Your cart is empty.");
      setPlacingOrder(false);
      return;
    }
    try {
      const res = await fetch(`${backend_url}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ items: orderItems, total }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        alert("Order placed!");
        navigate("/orders");
      } else {
        alert(data.error || "Failed to place order.");
      }
    } catch (err) {
      alert("Failed to place order.");
    }
    setPlacingOrder(false);
  };

  const orderItems = products.filter(p => cartItems[p.id] > 0);

  return (
    <div style={{maxWidth:700,margin:"40px auto",padding:24,background:"#fff",borderRadius:8,boxShadow:"0 2px 8px #eee"}}>
      <h2 style={{marginBottom:24}}>Checkout</h2>
      <form onSubmit={handleSubmit} style={{display:'flex',gap:32,flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:260}}>
          <h3>Shipping Details</h3>
          <input name="name" placeholder="Full Name" value={shipping.name} onChange={handleShipping} required style={{width:'100%',marginBottom:10,padding:8}}/>
          <input name="address" placeholder="Address" value={shipping.address} onChange={handleShipping} required style={{width:'100%',marginBottom:10,padding:8}}/>
          <input name="city" placeholder="City" value={shipping.city} onChange={handleShipping} required style={{width:'100%',marginBottom:10,padding:8}}/>
          <input name="zip" placeholder="ZIP Code" value={shipping.zip} onChange={handleShipping} required style={{width:'100%',marginBottom:10,padding:8}}/>
        </div>
        <div style={{flex:1,minWidth:260}}>
          <h3>Payment Info</h3>
          <input name="card" placeholder="Card Number" value={payment.card} onChange={handlePayment} required style={{width:'100%',marginBottom:10,padding:8}}/>
          <input name="expiry" placeholder="Expiry (MM/YY)" value={payment.expiry} onChange={handlePayment} required style={{width:'100%',marginBottom:10,padding:8}}/>
          <input name="cvv" placeholder="CVV" value={payment.cvv} onChange={handlePayment} required style={{width:'100%',marginBottom:10,padding:8}}/>
        </div>
        <div style={{flexBasis:'100%'}}>
          <h3>Order Summary</h3>
          <ul style={{listStyle:'none',padding:0}}>
            {orderItems.map(item => (
              <li key={item.id} style={{marginBottom:8}}>
                {item.name} x {cartItems[item.id]} = <b>₹{item.new_price * cartItems[item.id]}</b>
              </li>
            ))}
          </ul>
          <div style={{marginTop:12,fontWeight:600}}>Total: ₹{getTotalCartAmount()}</div>
        </div>
        <button type="submit" style={{marginTop:24,padding:'12px 32px',background:'#ff4141',color:'#fff',border:'none',borderRadius:4,fontSize:18,cursor:'pointer'}} disabled={placingOrder}>{placingOrder ? "Placing Order..." : "Place Order"}</button>
      </form>
    </div>
  );
};

export default Checkout; 