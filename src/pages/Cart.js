import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cart, clearCart, remove, increase, decrease } = useAppContext();

  const [totalPrice, setTotalPrice] = useState();
  const [refresh, setRefresh] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (acc, curr) => acc + Number(curr.unitPrice) * curr.quantity,
        0
      )
    );
  }, [cart]);

  const postOrder = () => {
    const cartOrders = {
      customerId: "ArdaCoskun",
      orderDate: Date.now(),
      shippedDate: Date.now(),
      details: [...cart],
    };

    console.log(cartOrders.details[0]);

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartOrders),
    };

    fetch("https://northwind.vercel.app/api/orders", config)
      .then((response) => response.json())
      .then((data) => {
        setRefresh((prev) => !prev);
        alert(" Your orders have been received");
        setTimeout(() => {
          navigate("/");
          clearCart();
        }, [2000]);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <Navbar />

      {cart.length === 0 ? (
        <Wrapper>
          <Summary
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            <SummaryItemText>Your bag is empty.</SummaryItemText>
          </Summary>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                CONTINUE SHOPPING
              </Link>
            </TopButton>

            <TopButton type="filled" onClick={clearCart}>
              CLEAR CART
            </TopButton>
          </Top>

          <Bottom>
            {cart.map((item) => {
              return (
                <Info key={item.id}>
                  <Product>
                    <ProductDetail>
                      <Image
                        src={`https://picsum.photos/id/${item.id}/200/200`}
                      />
                      <Details>
                        <ProductName>
                          <b>{item.name}</b>
                        </ProductName>
                        <ProductId onClick={() => remove(item.id)}>
                          Remove Item
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add
                          onClick={() => increase(item.id)}
                          style={{ cursor: "pointer" }}
                        />
                        <ProductAmount>{item.quantity}</ProductAmount>
                        <Remove
                          onClick={() => decrease(item.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {(+item.unitPrice * +item.quantity).toFixed(2)}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </Info>
              );
            })}
            <Summary>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={postOrder}>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      )}
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span`
  color: red;
  cursor: pointer;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export default Cart;
