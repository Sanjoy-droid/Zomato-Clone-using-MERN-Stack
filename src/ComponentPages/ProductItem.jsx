import React from "react";
import Cards from "./Cards";

const ProductItem = (props) => {
  const { item } = props;
  return (
    <>
      <Cards item={item}></Cards>
    </>
  );
};

export default ProductItem;
