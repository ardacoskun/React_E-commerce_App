import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Wrapper = styled.div`
  flex: 1;
  flex-grow: 0;
  margin: 40px;
  min-width: 250px;
  height: 400px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`;

const Image = styled.img`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 60%;
  width: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ProductTitle = styled.h4``;

const ProductPrice = styled.p`
  margin-right: 10px;
`;

const Button = styled.button`
  border: none;
  width: 100%;
  font-weight: bold;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #ddc7a0;
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: #ad8f5a;
  }
`;

const Product = ({ product }) => {
  const { addToCart } = useAppContext();

  return (
    <Wrapper>
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to={`/products/${product.id}`}
      >
        <Image src={`https://picsum.photos/id/${product.id}/200/300`} />
        <ProductInfo>
          <ProductTitle>
            {product.name.length >= 20
              ? product.name.slice(0, 20) + "..."
              : product.name}
          </ProductTitle>
          <ProductPrice>{product.unitPrice}$</ProductPrice>
        </ProductInfo>
      </Link>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </Wrapper>
  );
};

export default Product;
