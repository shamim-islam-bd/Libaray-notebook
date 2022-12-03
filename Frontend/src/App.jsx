import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Navbar/Header";
import SingleBook from "./pages/Books/SingleBook";
import Login from "./pages/login/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup/Signup";
// import Home from "./pages/Home/Home";
// import Hotdeals from "./pages/HotDeals/Hotdeals";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/readmore/:id" element={<SingleBook />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/" element={<Hotdeals />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
