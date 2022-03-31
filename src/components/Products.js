import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { baseService } from "../network/services/baseService";
import Loading from "./Loading";
import Product from "./Product";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  const { loading, setLoading } = useAppContext();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await baseService.get("/products");
      const filteredData = data.slice(0, 10);
      setProducts(filteredData);
      setLoading(false);
    } catch (error) {
      console.log("popular products error", error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        {" "}
        Popular Products{" "}
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          {products.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </Wrapper>
      )}
    </div>
  );
};

export default Products;
