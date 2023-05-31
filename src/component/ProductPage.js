import { Search, FilterAltOutlined } from "@mui/icons-material";
import { Grid, Box, TextField, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useSnackbar } from "notistack";
import Filter from "./Filter";
import "./ProductPage.css";

const ProductPage = ({ handleCart }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [filteredProducts, setFilterProducts] = useState([]);
  const [genderCheckBox, setGenderCheckBox] = useState(["", ""]);
  const [colorCheckBox, setColorCheckBox] = useState(["", "", ""]);
  const [priceCheckBox, setPriceCheckBox] = useState(["", "", ""]);
  const [typeCheckBox, setTypeCheckBox] = useState(["", "", ""]);

  // @typedef {Object} Product - Data on product available to buy
  /**
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

  // Defination for perfromAPICall() which
  // Fetch products data and stores it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<products> }
   *      Array of objects with complete data on all available products
   *
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *         "id": 1,
   *         "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png",
   *         "name": "Black Polo",
   *         "type": "Polo",
   *         "price": 250,
   *         "currency": "INR",
   *         "color": "Black",
   *         "gender": "Men",
   *         "quantity": 3
   *        },
   *        {
   *          "id": 2,
   *          "imageURL": "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/blue-polo-women.png",
   *          "name": "Blue Polo",
   *          "type": "Polo",
   *          "price": 350,
   *          "currency": "INR",
   *          "color": "Blue",
   *          "gender": "Women",
   *          "quantity": 3
   *         }
   * ]
   *
   * For failure it returns the error message from the backend
   *
   */

  const perfromAPICall = async () => {
    let url =
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
    try {
      const response = await axios.get(url);
      const products = response.data;
      setProducts(products);
      setFilterProducts(products);
    } catch{
      enqueueSnackbar("There is prolblem with backend, Check your network", { variant: "error" });
    }
  };
  /**
  *The captureSearchText() function calls onChange in search bar. It captures the current
  value serached by the use inside the search bar using event. 
  */
  const captureSearchText = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    perfromAPICall();
  }, []);

  /**
   * The handleShow() function calls on click on filter icon i.e <FilterAltOutlined />
   *This function is used to show and hide the <Filter /> component on clicking on <FilterAltOutlined /> icon.
   */
  const handleShow = () => {
    setIsShown((current) => !current);
  };

  //Defination for function updateFilter() which filters the product on base of check box value which is given by 
  // client side user 
  /**
   * The updateFilter() accepts 3 parameters checked, categoryFilter and categoryName.
   * These parameters values are available when the updateFilter() calls on onClick on checkboxs.
   * @param {boolean} checked
   * This parameter gives the boolean value true or false, when the checkbox is clicked it gives
     true value and when uncheck the checkbox it gives the false value.
   *@param {string} categoryFilter
   * The categoryFilter parameter is the string which is value of which check box is clicked.
   * @param {string} categoryName
   * The categoryName parameter is the string value, it is the category type name.
   * 
   * The updateFilter() works in two conditons, and those are when the check box is checked
     and when the check box is unchecked based on when respective checkbox are checked or 
     unchecked.
   */
  const updateFilter = (checked, categoryFilter, categoryName) => {
    if (checked) {
      switch (categoryName) {
        case "Gender":
          if (categoryFilter === "Men") {
            // setFilter(...filter, filter[0].gender.Men = "Men");
            setGenderCheckBox(["Men", genderCheckBox[1]]);
          } else {
            // setFilter(...filter, filter[0].gender.Women = "Women");
            setGenderCheckBox([genderCheckBox[0], "Women"]);
          }
          break;

        case "Color":
          if (categoryFilter === "Red") {
            setColorCheckBox(["Red", colorCheckBox[1], colorCheckBox[2]]);
          } else if (categoryFilter === "Blue") {
            setColorCheckBox([colorCheckBox[0], "Blue", colorCheckBox[2]]);
          } else {
            setColorCheckBox([colorCheckBox[0], colorCheckBox[1], "Green"]);
          }
          break;

        case "Price":
          if (categoryFilter === "250") {
            setPriceCheckBox(["250", priceCheckBox[1], priceCheckBox[2]]);
          } else if (categoryFilter === "251") {
            setPriceCheckBox([
              priceCheckBox[0],
              "251",
              priceCheckBox[2],
            ]);
          } else {
            setPriceCheckBox([priceCheckBox[0], priceCheckBox[1], "450"]);
          }
          break;
        case "Type":
          if (categoryFilter === "Polo") {
            setTypeCheckBox(["Polo", typeCheckBox[1], typeCheckBox[2]]);
          } else if (categoryFilter === "Hoodie") {
            setTypeCheckBox([typeCheckBox[0], "Hoodie", typeCheckBox[2]]);
          } else {
            setTypeCheckBox([typeCheckBox[0], typeCheckBox[1], "Basic"]);
          }
          break;
      }
    }

    if (!checked) {
      switch (categoryName) {
        case "Gender":
          if (categoryFilter === "Men") {
            setGenderCheckBox(["", genderCheckBox[1]]);
          } else {
            setGenderCheckBox([genderCheckBox[0], ""]);
          }
          break;
        case "Color":
          if (categoryFilter === "Red") {
            setColorCheckBox(["", colorCheckBox[1], colorCheckBox[2]]);
          } else if (categoryFilter === "Blue") {
            setColorCheckBox([colorCheckBox[0], "", colorCheckBox[2]]);
          } else {
            setColorCheckBox([colorCheckBox[0], colorCheckBox[1], ""]);
          }
          break;
        case "Price":
          if (categoryFilter === "250") {
            setPriceCheckBox(["", priceCheckBox[1], priceCheckBox[2]]);
          } else if (categoryFilter === "251") {
            setPriceCheckBox([priceCheckBox[0], "", priceCheckBox[2]]);
          } else {
            setPriceCheckBox([priceCheckBox[0], priceCheckBox[1], ""]);
          }
          break;
        case "Type":
          if (categoryFilter === "Polo") {
            setTypeCheckBox(["", typeCheckBox[1], typeCheckBox[2]]);
          } else if (categoryFilter === "Hoodie") {
            setTypeCheckBox([typeCheckBox[0], "", typeCheckBox[2]]);
          } else {
            setTypeCheckBox([typeCheckBox[0], typeCheckBox[1], "Basic"]);
          }
          break;
      }
    }
  };

  /**
   * This below useEffect renders when genderCheckBox state is changed.
   */
  useEffect(() => {
    setFilterProducts(() => {
      if (
        (genderCheckBox[0] === "" && genderCheckBox[1] === "") ||
        (genderCheckBox[0] === "Men" && genderCheckBox[1] === "Women")
      ) {
        return products;
      } else if (genderCheckBox[0] === "Men" && genderCheckBox[1] === "") {
        return products.filter(
          (product) => genderCheckBox.indexOf(product.gender) > -1
        );
      } else {
        return products.filter(
          (product) => genderCheckBox.indexOf(product.gender) > -1
        );
      }
    });
  }, [genderCheckBox]);

   /**
   * This below useEffect renders when colorCheckBox state is changed.
   */
  useEffect(() => {
    setFilterProducts(() => {
      if (
        (colorCheckBox[0] === "" &&
          colorCheckBox[1] === "" &&
          colorCheckBox[2] === "") ||
        (colorCheckBox[0] === "Red" &&
          colorCheckBox[1] === "Blue" &&
          colorCheckBox[2] === "Green")
      ) {
        return products;
      } else if (
        colorCheckBox[0] === "Red" &&
        colorCheckBox[1] === "" &&
        colorCheckBox[2] === ""
      ) {
        return products.filter((product) =>
          colorCheckBox.includes(product.color)
        );
      } else if (
        colorCheckBox[0] === "" &&
        colorCheckBox[1] === "Blue" &&
        colorCheckBox[2] === ""
      ) {
        return products.filter((product) =>
          colorCheckBox.includes(product.color)
        );
      } else if (
        colorCheckBox[0] === "" &&
        colorCheckBox[1] === "" &&
        colorCheckBox[2] === "Green"
      ) {
        return products.filter((product) =>
          colorCheckBox.includes(product.color)
        );
      } else if (
        colorCheckBox[0] === "Red" &&
        colorCheckBox[1] === "Blue" &&
        colorCheckBox[2] === ""
      ) {
        return products.filter((product) =>
          colorCheckBox.includes(product.color)
        );
      } else if (
        colorCheckBox[0] === "Red" &&
        colorCheckBox[1] === "" &&
        colorCheckBox[2] === "Green"
      ) {
        return products.filter((product) =>
          colorCheckBox.includes(product.color)
        );
      } else if (
        colorCheckBox[0] === "" &&
        colorCheckBox[1] === "Blue" &&
        colorCheckBox[2] === "Green"
      ) {
        return products.filter((product) =>
          colorCheckBox.includes(product.color)
        );
      }
    });
  }, [colorCheckBox]);

  /**
   * This below useEffect renders when typeCheckBox state is changed.
   */
  useEffect(() => {
    setFilterProducts(() => {
      if (
        (typeCheckBox[0] === "" &&
          typeCheckBox[1] === "" &&
          typeCheckBox[2] === "") ||
        (typeCheckBox[0] === "Polo" &&
          typeCheckBox[1] === "Hoodie" &&
          typeCheckBox[2] === "Basic")
      ) {
        return products;
      } else if (
        typeCheckBox[0] === "Polo" &&
        typeCheckBox[1] === "" &&
        typeCheckBox[2] === ""
      ) {
        return products.filter((product) =>
          typeCheckBox.includes(product.type)
        );
      } else if (
        typeCheckBox[0] === "" &&
        typeCheckBox[1] === "Hoodie" &&
        typeCheckBox[2] === ""
      ) {
        return products.filter((product) =>
          typeCheckBox.includes(product.type)
        );
      } else if (
        typeCheckBox[0] === "" &&
        typeCheckBox[1] === "" &&
        typeCheckBox[2] === "Basic"
      ) {
        return products.filter((product) =>
          typeCheckBox.includes(product.type)
        );
      } else if (
        typeCheckBox[0] === "Polo" &&
        typeCheckBox[1] === "Hoodie" &&
        typeCheckBox[2] === ""
      ) {
        return products.filter((product) =>
          typeCheckBox.includes(product.type)
        );
      } else if (
        typeCheckBox[0] === "Polo" &&
        typeCheckBox[1] === "" &&
        typeCheckBox[2] === "Basic"
      ) {
        return products.filter((product) =>
          typeCheckBox.includes(product.type)
        );
      } else if (
        typeCheckBox[0] === "" &&
        typeCheckBox[1] === "Hoodie" &&
        typeCheckBox[2] === "Basic"
      ) {
        return products.filter((product) =>
          typeCheckBox.includes(product.type)
        );
      }
    });
  }, [typeCheckBox]);

  /**
   * This below useEffect renders when priceCheckBox state is changed.
   */
  useEffect(()=>{
    setFilterProducts(()=>{
      if (
        (priceCheckBox[0] === "" &&
        priceCheckBox[1] === "" &&
        priceCheckBox[2] === "") ||
        (priceCheckBox[0] === "250" &&
        priceCheckBox[1] === "251" &&
        priceCheckBox[2] === "450")
      ) {
        return products;
      }
      else if (priceCheckBox[0] === "250" && priceCheckBox[1] === "" && priceCheckBox[2] === "") {
        return products.filter(product => product.price <= parseInt(priceCheckBox[0]));
      }
      else if (priceCheckBox[0] === "" && priceCheckBox[1] === "251" && priceCheckBox[2] === "") {
        return products.filter(product => (product.price >= parseInt(priceCheckBox[1])) && (product.price <= parseInt("450")));
      }
      else if (priceCheckBox[0] === "" && priceCheckBox[1] === "" && priceCheckBox[2] === "450") {
        return products.filter(product => product.price >= parseInt(priceCheckBox[2]));
      }
    })
  },[priceCheckBox])

  return (
    <div>
      {/* This box displays the Search box  */}
      <Box className="searchBox">
        <TextField
          type="search"
          size="medium"
          variant="standard"
          placeholder="Search Products for here..."
          value={search}
          onChange={captureSearchText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box onClick={handleShow} className="search-desktop margin">
          <FilterAltOutlined />
        </Box>
      </Box>
      {/* This <Filter /> component dispalys the filter checkBox box on mobile-mode */}
      <Box>{isShown && <Filter updateFilter={updateFilter} />}</Box>
      <Box className="productPage">
        {/* This <Filter /> component dispalys the filter checkBox box on desktop-mode */}
        <Box className="search-mobile">
          <Filter updateFilter={updateFilter} />
        </Box>
        <Box className="grid">
          <Grid container spacing={2}>
            {/* filterProducts.filters filters the data searched from the user in search 
              box */}
            {filteredProducts
              .filter((product) => {
                return search.toLowerCase() === ""
                  ? product
                  : product.name.toLowerCase().includes(search);
              })
              // .map dynamically renders the product card by passing the data as prop to
              // the <ProductCard /> component
              .map((product) => {
                return (
                  <Grid item key={product.id} xs={12} sm={6} lg={3}>
                    <ProductCard product={product} handleCart={handleCart} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ProductPage;
