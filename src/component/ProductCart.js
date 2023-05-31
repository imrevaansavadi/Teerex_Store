import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./ProductCart.css";



//Defination for ProduCart function.
/**
 *The function ProductCart() generates the ProductCart Card in side the cart page.
 *The ProductCart() function accepts two props values i.e cartProduct and setCart.
 *The prop cartProduct(is useState array value which is the array defined in the product page)
  is the object which contains the essenctial values to generate cart card.
 *The prop setCart(setCart is the useState fucnction defined in the product page) is array 
  which is used add the add the cart values object to cartProduct  
 *"The cartProduct function card grneartes the card which contains the one product image, product title,
  one quantity increasing button, one quantity decreasing button, one quantity value showing field,
  one delete icon button."   
 */

// @typedef {Object} Product - Data on product available to buy
  /** 
   * The cartProduct is the ArrayObject which contains the following object value for eac array item.
   *@property {string} name - The name or title of the product
   *@property {number} price - The price to buy the product
   *@property {string} imageURL - Contains URL for the product image
   *@property {number} id - Unique ID for the product
   *@property {string} type - the type of the product
   *@property {number} currency - the product available in the currency
   *@property {string} color - The color of the product
   *@property {string} gender - the product avaible for the gender
   *@property {number} quantity - The number of products available for user 
 */

const ProductCart = ({ cartProduct, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Defination fro handleTotalAmount function.
  /**
   * 
   * @param {cartProduct} cartProduct
   *   The cartProduct which conatins the array of objects 
   * @return {amount} 
   *   The amount is the total amount/price cart products
   */
  const handleTotaleAmount = (cartProduct) => {
    let amount = 0;
    cartProduct.map((product) => {
      return (amount += product.count * product.price);
    });
    setTotalPrice(amount);
  };

  useEffect(() => {
    handleTotaleAmount(cartProduct);
  });
  
  /**
   *Defination for Delete cart handler
   *The handleDeleteCart() function calls onClick on DeleteIcon button inside the cart card.
   * @param {id} id
   *  id is the unique value of the deleting product from the cart.
   */
  const handleDeleteCart = (id) => {
    let deletedProduct = cartProduct.filter((item) => item.id !== id);
    setCart(deletedProduct);
  };

  /**
   * Defination for handleChangeInc handler
   * The handleChangeInc() function calls onClick on RemoveOutlinedIcon button inside the cart card.
   * This handleChangeInc() function is used increase the quantity of the product added to te cart.
   * 
   * @param {product} product 
   *  The cart product which quantity to be increase.
   * @param {d} d 
   *  The d is the differnce value(i.e 1) to increase the quantity of the cart product.
   * 
   * constions- 1. Increase the quantity only when the value of quantity is less than the value of
                   quantity given in API call products.
   *             
   */
  const handleChangeInc = (product, d) => {
    if (product.quantity > product.count) {
      let changedProductArray = JSON.parse(JSON.stringify(cartProduct));
      let changedProduct = changedProductArray.find((item) => {
        return item.id === product.id;
      });
      changedProduct.count = product.count + d;
      changedProduct.amount = changedProduct.count * product.price;
      setCart(changedProductArray);
    }
  };

  
  /**
   * Defination for handleChangeDec handler
   * The handleChangeDec() function calls onClick on AddOutlinedIcon button inside the cart card.
   * This handleChangeDec() function is used decrease the quantity of the product added to te cart.
   * 
   * @param {product} product 
   *  The cart product which quantity to be increase.
   * @param {d} d 
   *  The d is the differnce value(i.e 1) to increase the quantity of the cart product.
   * 
   * conditions- 1. The quantity of the product should be greater than one.
   *             2. When the quantity value reaches the less than 1 it should removed from the cart list.
   */

  const handleChangeDec = (product, d) => {
    if (product.count <= 1) {
      let deletedProduct = cartProduct.filter((item) => item.id !== product.id);
      setCart(deletedProduct);
    } else {
      let changedProductArray = JSON.parse(JSON.stringify(cartProduct));
      let changedProduct = changedProductArray.find((item) => {
        return item.id === product.id;
      });
      changedProduct.count = product.count - d;
      changedProduct.amount = changedProduct.count * product.price;
      setCart(changedProductArray);
    }
  };

  return (
    <div className="cardBox">
      <Typography variant="h6" gutterBottom>
        <b>Shopping Cart</b>
      </Typography>
      {cartProduct.length === 0 ? (<p>Add more products to check out....</p>) : (
        <div>
        {cartProduct.map((product) => {
        return (
          <div key={product.id}>
            <Card className="cartCard">
              <section className="imageParent">
                <CardMedia
                  component="img"
                  className="cardImg"
                  image={product.imageURL}
                  alt={product.name}
                />
              </section>
              <section className="section">
                <section>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                  </CardContent>
                </section>
                <section className="section2">
                  <section className="section3">
                    <CardActions>
                      <Button>
                        <RemoveOutlinedIcon
                          onClick={() => handleChangeDec(product, 1)}
                        />
                      </Button>
                      <div>{product.count}</div>
                      <Button>
                        <AddOutlinedIcon
                          onClick={() => handleChangeInc(product, 1)}
                        />
                      </Button>
                    </CardActions>
                  </section>
                  <section className="section4">
                    <section>
                      <h3>₹{product.amount}</h3>
                    </section>
                    <section>
                      <DeleteIcon
                        onClick={() => {
                          handleDeleteCart(product.id);
                        }}
                      />
                    </section>
                  </section>
                </section>
              </section>
            </Card>
          </div>
        );
      })}
      <section className="textAlign">
        <section>
          <Typography variant="h6" gutterBottom>
            Total Amount =
          </Typography>
        </section>
        <section>
          <Typography variant="h4" gutterBottom>
            ₹{totalPrice}
          </Typography>
        </section>
      </section>
      </div>
      )}
    </div>
  );
};

export default ProductCart;
