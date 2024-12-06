import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";

const NavBar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'><Link to="/">Notes</Link></h2>
        
        <SearchBar
         value={searchQuery}
         onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        {token ? <ProfileInfo userInfo={userInfo} onLogout={onLogout}/> : ""}
    </div>
  )
}

export default NavBar