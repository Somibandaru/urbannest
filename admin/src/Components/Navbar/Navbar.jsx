import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem('admin-auth');
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    navigate('/login');
  };
  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="" />
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        {admin && <span style={{fontWeight:600}}>{admin}</span>}
        {admin && <button onClick={handleLogout} style={{padding:'6px 16px',background:'#ff4141',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Logout</button>}
        <img src={navprofileIcon} className='nav-profile' alt="" />
      </div>
    </div>
  )
}

export default Navbar
