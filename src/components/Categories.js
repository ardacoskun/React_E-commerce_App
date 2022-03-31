import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { baseService } from "../network/services/baseService";
import SingleCategory from "./SingleCategory";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "../context/AppContext";
import Loading from "./Loading";

var settings = {
  dots: true,
  infinite: true,

  autoplay: true,
  autoplaySpeed: 2500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px 20px 20px;
`;

const Title = styled.h2``;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const { loading, setLoading } = useAppContext();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await baseService.get("/categories");
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.log("category list error", error);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Categories </h2>
      {loading ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {categories.map((category) => {
            return <SingleCategory key={category.id} category={category} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default Categories;
