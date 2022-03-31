import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Product from "./Product";
import { useLocation } from "react-router-dom";
import { baseService } from "../network/services/baseService";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: beige;
`;

const CategoryPage = () => {
  let location = useLocation();
  const urlPath = location.pathname.split("/")[2];

  const [products, setProducts] = useState([]);

  const { loading, setLoading } = useAppContext();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await baseService.get("/products");
      const filteredData = data.filter((item) => item.categoryId == urlPath);
      setProducts(filteredData);
      setLoading(false);
    } catch (error) {
      console.log("category detail error", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          {products.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </Wrapper>
      )}
      <Footer />
    </div>
  );
};

export default CategoryPage;
