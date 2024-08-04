import React from "react";
import Header from "../Header/Header";
import Hero from "./Hero";
import Exercises from "./Exercises";
import Start from "./Start";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
const Landing=()=>{
    
    return(
<div>
    <Header />
      <Hero />
      <Exercises />
      <Start />
      <Pricing />
      <Testimonials />
      <Footer />

        </div>
    )
}
export default Landing;