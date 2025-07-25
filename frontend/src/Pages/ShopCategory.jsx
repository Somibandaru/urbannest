import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {

  const [allproducts, setAllProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [showSort, setShowSort] = useState(false);

  const fetchInfo = () => { 
    fetch('http://localhost:4000/allproducts') 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }

  useEffect(() => {
    fetchInfo();
  }, [])

  // Filter by category
  let filtered = allproducts.filter(item => props.category === item.category);

  // Sort logic
  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.new_price - b.new_price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.new_price - a.new_price);
  } else if (sort === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  }
    
  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - {filtered.length}</span> out of {allproducts.length} Products</p>
        <div className="shopcategory-sort" style={{position:'relative'}}>
          <span onClick={()=>setShowSort(v=>!v)} style={{cursor:'pointer'}}>Sort by  <img src={dropdown_icon} alt="" /></span>
          {showSort && (
            <div style={{position:'absolute',top:'110%',right:0,background:'#fff',border:'1px solid #ccc',borderRadius:'6px',zIndex:10,minWidth:'160px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
              <div style={{padding:'10px',cursor:'pointer'}} onClick={()=>{setSort("price-asc");setShowSort(false);}}>Price: Low to High</div>
              <div style={{padding:'10px',cursor:'pointer'}} onClick={()=>{setSort("price-desc");setShowSort(false);}}>Price: High to Low</div>
              <div style={{padding:'10px',cursor:'pointer'}} onClick={()=>{setSort("name-asc");setShowSort(false);}}>Name: A-Z</div>
              <div style={{padding:'10px',cursor:'pointer'}} onClick={()=>{setSort("name-desc");setShowSort(false);}}>Name: Z-A</div>
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {filtered.map((item,i) => (
          <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
        ))}
      </div>
      <div className="shopcategory-loadmore">
      <Link to='/' onClick={e => {
        e.preventDefault();
        const section = document.getElementById('new-collections-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = '/#new-collections-section';
        }
      }} style={{ textDecoration: 'none', cursor: 'pointer' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;
