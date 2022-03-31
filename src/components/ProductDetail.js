import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { baseService } from "../network/services/baseService";
import Footer from "./Footer";
import Loading from "./Loading";
import Navbar from "./Navbar";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  margin: 40px 0px;
`;
const Quantity = styled.span`
  margin-top: 10px;
  font-size: 25px;
`;
const Price = styled.span`
  margin-top: 20px;
  font-size: 25px;
`;

const CartContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Number = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #ddc7a0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px 5px;
`;
const Button = styled.button`
  padding: 25px;
  border: 1px solid #ddc7a0;
  cursor: pointer;
  background-color: #ddc7a0;

  font-weight: 500;
  border-radius: 10px;
  &:hover {
    background-color: beige;
  }
`;

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const productId = params.productId;

  const { addToCart, loading, setLoading } = useAppContext();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await baseService.get(`/products/${productId}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.log("product detail error", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          {loading ? (
            <Loading />
          ) : (
            <Image src={`https://picsum.photos/id/${product.id}/500/500`} />
          )}
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            delectus esse placeat nisi culpa illum, molestias quibusdam mollitia
            maiores vel.
          </Description>
          <ProductInfo>
            <Quantity>Stock:{product.unitsInStock}</Quantity>
            <Price>Price:{product.unitPrice}$</Price>
          </ProductInfo>
          <CartContainer>
            <NumberContainer>
              <Remove />
              <Number>1</Number>
              <Add />
            </NumberContainer>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          </CartContainer>
        </InfoContainer>
      </Wrapper>
      )
      <Footer />
    </div>
  );
};

export default ProductDetail;
