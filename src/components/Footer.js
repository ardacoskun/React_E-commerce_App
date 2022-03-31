import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #ddc7a0;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0px;
`;
const SocialMedia = styled.div`
  display: flex;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  cursor: pointer;
  width: 50%;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  const { categories } = useAppContext();

  return (
    <Wrapper>
      <Left>
        <Logo>ShopNow</Logo>
        <Description>Online shopping site for everyone</Description>
        <SocialMedia>
          <Icon>
            <Facebook />
          </Icon>
          <Icon>
            <Instagram />
          </Icon>
          <Icon>
            <Twitter />
          </Icon>
        </SocialMedia>
      </Left>
      <Center>
        <Title>Categories</Title>
        <List>
          {categories.map((item) => {
            return (
              <ListItem key={item.id}>
                <Link
                  to={`/categories/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  {item.name}{" "}
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>935 E. Lawrence St. Moncks Corner, SC 29461</ContactItem>
        <ContactItem>0850 208 71 71</ContactItem>
        <ContactItem>support@techcareer.net</ContactItem>
      </Right>
    </Wrapper>
  );
};

export default Footer;
