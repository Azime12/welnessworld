import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import WhyToyvista from "./pages/whyToyvista";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Disclaimer from "./pages/disclaimer";
import AboutUs from "./pages/about";
import PrivacyPolicy from "./pages/privacyPolicy";
import FAQPage from "./pages/faq";
import TermsOfServiceSimple from "./pages/termsOfservice";
import ProductsPage from "./pages/product";
import ProductDetail from "./pages/productDetail";
import SubCategory from "./pages/subCatagoriy";
import BlogDetail from "./pages/blogsDetail";
import AllBlogs from "./pages/blogs";
import ProductSearch from "./components/ProductSearch";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/why-toyvista" element={<WhyToyvista />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blog/:slugs" element={<BlogDetail />} />

        <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/faq" element={<FAQPage/>} />
      <Route path="/terms-of-service" element={<TermsOfServiceSimple/>} />
      <Route path="/products" element={<ProductsPage/>} />
     <Route path="/categories/:slug" element={<SubCategory />} />
     <Route path="/categories/:slug" element={<SubCategory />} />
    <Route path="/product/:slug/detail" element={<ProductDetail />} />
        <Route path="/search" element={<ProductSearch />} />



 
      
 <Route path="/product/:slug" element={<ProductsPage />} />
         {/* <Route path="/products/:category" element={<ProductsPage />} /> */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "Sub-City Head",
                "Sector Leader",
                "Coordinator",
                "Group Leader",
                "Professional",
                "Admin",
                "user",
                "Committee",
              ]}
            />
          }
        >
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer must be outside Routes */}
      <Footer />

      <ToastContainer />
    </Router>
  );
};

export default App;
