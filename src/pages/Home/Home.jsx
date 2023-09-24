import React from "react";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import "./Home.css";

function Home() {
  return  (
    <div className="home">
      <div className="MainComponent">
       
            <Stack spacing={2} direction="row">
          <Link to="/category" style={{ textDecoration: 'none', color: 'white' }}>
           
            <Button variant="contained">Category Page</Button>
          </Link>
          <Link to="/product" style={{ textDecoration: 'none', color: 'white' }}>
           
            <Button variant="contained">Product Page</Button>
          </Link>
          <Link to="/listing" style={{ textDecoration: 'none', color: 'white' }}>
            
            <Button variant="contained">    Listing Page</Button>
          </Link>
          </Stack>
     
      </div>
    </div>
  );
}

export default Home;
