import React from "react";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { cart } = useAppContext();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              ShopNow
            </Link>
          </Logo>
        </Left>
        <Center>
          <Button>
            <Link
              to={"/orders"}
              style={{
                color: "black",
                textDecoration: "inherit",
                fontSize: "18px",
              }}
            >
              Orders
            </Link>
          </Button>
        </Center>
        <Right>
          <Cart>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Badge badgeContent={cart.length}>
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </Cart>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: #ddc7a0;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 380px) {
    padding: 0px 10px;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Logo = styled.h3`
  font-weight: bold;
  color: black;
  @media only screen and (max-width: 380px) {
    font-size: 18px;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  padding: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 25px;
  @media only screen and (max-width: 380px) {
    flex: 2;
  }
`;

const Cart = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

export default Navbar;
