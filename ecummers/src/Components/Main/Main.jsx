import React from "react";
import Navbar from "../Navbar/Navbar";
import ProductSection from "../ProductSection/ProductSection";
import Footer from "../Footer/Footer";
import Banner1 from "../Banner/Banner1";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner1></Banner1>
      <ProductSection></ProductSection>
      <Footer></Footer>
    </div>
  );
};

export default Main;
