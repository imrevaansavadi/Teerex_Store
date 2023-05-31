import React from "react";
import { Box } from "@mui/material";
import { filterData } from "../FilterData";
import "./Filter.css";


/**
 * Definstion for Filter() component. 
 *The Filter () function creates Filter box in product page dynamically using data from the
  file FilterData.js
*/
const Filter = (props) => {
  return (
    <div>
      <Box>
        <Box className="filterBox ">
          <Box>
            <h2>Categories</h2>
            {/* The FilterData.map function creates subTiteles fron check box dynamically */}
            {filterData.map((data, index) => {
              return (
                <div key={index}>
                  <h3 className="filterTitle">{data.category.categoryName}</h3>
                  {/* data.category.checkbox.map creates check boxes for subsequent subtitle 
                  dynamically */}
                  {data.category.checkbox.map((checkList, index) => {
                    return (
                      <div key={index}>
                        <label>
                          <input
                            type="checkbox"
                            onClick={(e) => {
                              props.updateFilter(e.target.checked, checkList, data.category.categoryName);
                            }}
                            className="filterCheckBox"
                          />
                         {checkList}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div>
              <h3 className="filterTitle">Price</h3>
              <div>
                <label className="block">
                  <input 
                    type="checkbox"
                    value="250"
                    onClick={(e) => {
                      props.updateFilter(e.target.checked, e.target.value, "Price");
                    }}
                    className="filterCheckBox"
                  />
                  ₹0 - ₹250
                </label>
                <label className="block">
                  <input 
                    type="checkbox"
                    value="251"
                    onClick={(e) => {
                      props.updateFilter(e.target.checked, e.target.value, "Price");
                    }}
                    className="filterCheckBox"
                  />
                 ₹251 - ₹450
                </label>
                <label className="block">
                  <input 
                    type="checkbox"
                    value="450"
                    onClick={(e) => {
                      props.updateFilter(e.target.checked, e.target.value, "Price");
                    }}
                    className="filterCheckBox"
                  />
                  Greater-Than ₹450
                </label>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Filter;
