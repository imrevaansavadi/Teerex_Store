import ProductCart from "./component/ProductCart";
import ProductPage from "./component/ProductPage";
import Header from "./component/Header";
import { useState } from "react";
import { useSnackbar } from "notistack";
import React from "react";

/**
 * The App() component contains the Three components and those are <Header />,<ProductPage /> 
   and <ProductCart /> 
 */
export default function App() {

  const { enqueueSnackbar } = useSnackbar();

  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);


  const handleCart = (product) => {
    let isPresent = false;
    cart.forEach((item) => {
      if (product.id === item.id) isPresent = true;
    });
    if (isPresent) {
      enqueueSnackbar("Already Product is Added to the Cart", {variant: 'warning'});
      return;
    }
    let item = JSON.parse(JSON.stringify(product))
    item.count = 1;
    item.amount = product.price; 
    setCart([...cart, item]);
    enqueueSnackbar("Product Added To Cart", {variant: 'success'});
  };

  return (
    <React.Fragment>
      <Header size={cart.length} setShow={setShow} />
      {show ? (
        <ProductPage handleCart={handleCart} />
      ) : (
        <ProductCart
          cartProduct={cart}
          setCart={setCart}
        />
      )}
    </React.Fragment>
  );
}