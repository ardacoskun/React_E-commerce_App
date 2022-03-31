import React from "react";
import styled from "styled-components";
import Categories from "../components/Categories.js";
import Footer from "../components/Footer.js";
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Products from "../components/Products.js";

const Landing = () => {
  const Wrapper = styled.div`
    background-color: #fff;
  `;

  return (
    <Wrapper>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Footer />
    </Wrapper>
  );
};

export default Landing;
