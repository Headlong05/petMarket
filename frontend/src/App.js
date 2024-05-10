import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AllProducts from "./pages/AllProducts";
import CreateProduct from "./pages/CreateProduct";
import Layout from "./components/Layout";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/products" element={<AllProducts />} exact />
          <Route path="/products/:product_id" element={<ViewProduct />} />
          <Route path="/create-product" element={<CreateProduct />} exact />
          <Route path="/edit-product/:product_id" element={<EditProduct />} exact />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
//
// import HomePage from "./pages/HomePage";
// import AllPosts from "./pages/AllPosts";
// import CreatePost from "./pages/CreatePost";
// import Layout from "./components/Layout";
// import ViewPost from "./pages/ViewPost";
// import EditPost from "./pages/EditPost";
//
//
// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<HomePage />} exact/>
//           <Route path="/posts" element={<AllPosts/>} exact/>
//           <Route path="/create-post" element={<CreatePost/>} exact/>
//           <Route path="/post/:post_id" element={<ViewPost/>} exact/>
//           <Route path="/edit-post/:post_id" element={<EditPost/>} exact/>
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }
//
// export default App;
