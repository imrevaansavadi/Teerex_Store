import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

// Defination for ProductCard generator
/**  
 *The ProductCard() function generates card for perticular product using props value sent from 
  ProductPage File.
 *The ProductCard() function accepts two props value product and handleCart (it is function).
 *@param {object} product
 *product is the object which contains the essential values for display the card
 *@param {function} handleCart
 *handleCart is the OnClick function triggers when user clicks on ADD TO CART button in the card
  Which adds the product to cart section.
*/

const ProductCard = ({ product, handleCart }) => {
  return (
    <div>
      <Card className="card">
        <div className="card-image">
          <CardMedia
            className="image"
            component="img"
            image={product.imageURL}
            alt="product image"
          />
        </div>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            <b>₹{product.price}</b>
          </Typography>
        </CardContent>
        <CardActions onClick={() => handleCart(product)}>
          <Button
            className="button card-button"
            variant="contained"
            size="large"
            fullWidth
          >
            <AddShoppingCartOutlined /> ADD TO CART
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
