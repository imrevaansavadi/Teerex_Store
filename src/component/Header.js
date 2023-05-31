import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import "./Header.css";

//Defination for Header function
/**
 * The Header function generates the Header or the page.
 * This function generates the Header which containes One title , two childs (i.e 1.Button, 2.Cart Icon).
 * The Button(i.e PRODUCTS)acts as link which navigates from cart page to Product Page.
 * The Cart Icon acts as link navigates from product page to cart page.
 * The Header function acceptes two props size, setShow
 * The prop size conatins the length of the cart array(i.e the number of products added to the cart)
   present in the cart.
 * The prop setShow (i.e useState callback function inside the product page) on condition 
   which navigates the between Product page and Cart page using Button "PRODUCTS" and Cart Icon. 
 */
const Header = ({ size, setShow }) => {
  return (
    <div>
      <Box className="header">
        <Box className="header-title">
          <h2>TeeRex Store</h2>
        </Box>
        <Box className="header-child">
          <div onClick={() => setShow(true)}>
            <Button className="explore-button">PRODUCTS</Button>
          </div>
          <div className="cart" onClick={() => setShow(false)}>
            <AddShoppingCartOutlined />
            <span>{size}</span>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Header;
