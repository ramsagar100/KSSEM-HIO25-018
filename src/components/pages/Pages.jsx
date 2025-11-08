import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Home from "../home/Home";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Login from "../login/src/components/Login";
import Usage from "../Usgae/Usage";
import UsageGarden from "../Usgae/UsageGarden";
import UsageWaterTank from "../Usgae/UsageWaterTank";
// LayoutWrapper to control Header/Footer visibility
const LayoutWrapper = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login";

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usageBathroom" element={<Usage />} />
        <Route path="/usageGarden" element={<UsageGarden />} />
        <Route path="/UsagewaterTank" element={<UsageWaterTank/>} />
        {/* Fixed route path: consistent lowercase naming */}

        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const Pages = () => {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
};

export default Pages;
