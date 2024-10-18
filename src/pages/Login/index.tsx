import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lazy } from "react";
import MiddleBlockContent from "../../contentLogin/MiddleBlockContent.json";
import ProductContent from "../../contentLogin/ProductContent.json";

const serverURL = process.env.REACT_APP_SERVER_DOMAIN
const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlockLogin"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));


const Home = () => {

  

  return (
    <Container>
      <ScrollToTop />

      <MiddleBlock
        title={MiddleBlockContent.title}
        
        button={MiddleBlockContent.button}
      />

      
      <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
      
    </Container>
  );
};

export default Home;
