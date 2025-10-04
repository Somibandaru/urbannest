import React, { useEffect, useState } from "react";
import { backend_url, currency } from "../App";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderMsg, setOrderMsg] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }
      // Decode userId from token (simple JWT decode)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user.id;
      try {
        const res = await fetch(`${backend_url}/orders/${userId}`, {
          headers: {
            "auth-token": token,
          },
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.error || "Failed to fetch orders.");
        }
      } catch (err) {
        setError("Failed to fetch orders.");
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleReorder = async (items, total) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setOrderMsg("Please login to reorder.");
      setTimeout(() => setOrderMsg(""), 2000);
      return;
    }
    try {
      const res = await fetch(`${backend_url}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ items, total }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderMsg("Order placed!");
      } else {
        setOrderMsg(data.error || "Failed to place order.");
      }
    } catch (err) {
      setOrderMsg("Failed to place order.");
    }
    setTimeout(() => setOrderMsg(""), 2000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (orders.length === 0) return <div>No previous orders found.</div>;

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: 20 }}>
      <h2>Your Previous Orders</h2>
      {orderMsg && <div style={{color: orderMsg === 'Order placed!' ? 'green' : 'red', marginBottom: 12}}>{orderMsg}</div>}
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", borderRadius: 8, margin: "1rem 0", padding: 16 }}>
          <div><b>Order Date:</b> {new Date(order.date).toLocaleString()}</div>
          <div><b>Status:</b> {order.status}</div>
          <div><b>Total:</b> {currency}{order.total}</div>
          <div style={{ marginTop: 8 }}>
            <b>Items:</b>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.quantity} ({currency}{item.price} each)
                </li>
              ))}
            </ul>
          </div>
          <button style={{marginTop: 12, padding: '8px 24px', background: '#ff4141', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer'}} onClick={() => handleReorder(order.items, order.total)}>
            Reorder
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
