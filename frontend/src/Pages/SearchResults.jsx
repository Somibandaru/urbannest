import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const { products } = useContext(ShopContext);
  const query = useQuery().get("q")?.toLowerCase() || "";

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  return (
    <div style={{padding:'40px 0', minHeight:'60vh'}}>
      <h2 style={{marginLeft:'10%',marginBottom:'20px'}}>Search Results for "{query}"</h2>
      <div style={{width:'80%',margin:'auto',display:'flex',flexWrap:'wrap',gap:'25px'}}>
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <Item key={item.id} {...item} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 