import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import ProductDetailCard from "./components";

function Index() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [slicedProducts, setSlicedProducts] = useState({});
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/productDetail", {
        params: { id: params.id },
      });
      const { data } = res;
      setProducts(data.result);
      const variantMap = data.result.map((value) => {
        return value.variant;
      });
      setVariants(variantMap);
      setSelectedVariant(variantMap[0]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sliceData();
    console.log(selectedVariant);
  }, [selectedVariant]);

  const sliceData = () => {
    products.forEach((value) => {
      if (value.variant === selectedVariant) {
        setSlicedProducts(value);
      }
    });
  };

  return (
    <div style={{ paddingTop: 200 }}>
      {slicedProducts && (
        <ProductDetailCard
          variants={variants}
          slicedProducts={slicedProducts}
          setSelectedVariant={setSelectedVariant}
        />
      )}
    </div>
  );
}

export default Index;
