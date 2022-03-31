import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import ProductDetailCard from "./components";

function Index() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [slicedProducts, setSlicedProducts] = useState({});
  const [colors, setColors] = useState([]);
  const [colorPaginationState, setColorPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemPerPage: 1,
  });

  const getColorFilter = () => {
    const results = products.map((value) => {
      return value.variant;
    });
    setColorPaginationState({
      ...colorPaginationState,
      maxPage: results.length,
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/productDetail", {
        params: { id: params.id },
      });
      const { data } = res;
      setProducts(data.result);
      const colorMap = data.result.map((value) => {
        return value.variant;
      });
      setColorPaginationState({
        ...colorPaginationState,
        maxPage: colorMap.length,
      });
      setColors(colorMap);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sliceData();
  }, [colorPaginationState]);

  const sliceData = () => {
    const { page, itemPerPage } = colorPaginationState;
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const slicedResult = products.slice(startIndex, endIndex);
    setSlicedProducts(slicedResult);
  };

  return (
    <div style={{ paddingTop: 200 }}>
      {colors.length && (
        <ProductDetailCard
          colors={colors}
          slicedProducts={slicedProducts}
          colorPaginationState={colorPaginationState}
          setColorPaginationState={setColorPaginationState}
        />
      )}
    </div>
  );
}

export default Index;
