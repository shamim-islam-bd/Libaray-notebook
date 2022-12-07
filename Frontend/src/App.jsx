import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Navbar/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./Dashboard/Admin/Admin";
import Dashboard from "./Dashboard/Dashboard/Dashboard";
import Managebook from "./Dashboard/Managebook/Managebook";
import SingleBook from "./pages/Books/SingleBook";
import TextEditor from "./pages/Books/TextEditor";
import Login from "./pages/login/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup/Signup";
// import Home from "./pages/Home/Home";
// import {useParams} from 'react-router-dom'
import { v4 as uuid } from "uuid";

function App() {
  // const { id: documentId } = useParams();
  // console.log(documentId);

  // geting user id from localstorage
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?.user?._id;
  // console.log(userId);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/readmore/:id" element={<SingleBook />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/documents/:id" element={<TextEditor />} />
          <Route
            path="/"
            element={<Navigate replace to={`/documents/${uuid()}`} />}
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index path="" element={<Admin />} />
            <Route path="managebook" element={<Managebook />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
