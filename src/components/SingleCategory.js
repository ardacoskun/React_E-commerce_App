import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  height: 30vh;
  margin: 20px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SingleCategory = ({ category }) => {
  return (
    <Link to={`/categories/${category.id}`}>
      <Wrapper>
        <Image src={`https://picsum.photos/id/${category.id}/200/300`} />
        <Title>{category.name}</Title>
      </Wrapper>
    </Link>
  );
};

export default SingleCategory;
