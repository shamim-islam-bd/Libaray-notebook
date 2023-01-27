import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Navbar/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./Dashboard/Admin/Admin";
import Dashboard from "./Dashboard/Dashboard/Dashboard";
import Managebook from "./Dashboard/Managebook/Managebook";
// import SingleBook from "./pages/Books/SingleBook";
import TextEditor from "./pages/Books/TextEditor";
import Login from "./pages/login/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup/Signup";
// import Home from "./pages/Home/Home";
// import {useParams} from 'react-router-dom'
import { v4 as uuid } from "uuid";
import AddBook from "./Dashboard/AddBook/AddBook";
import DashboardMain from "./Dashboard/Dashboard/DashboardMain";
import BookDetail from "./pages/Books/BookDetail";
import NotFound from "./pages/NotFound/NotFound";

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
          {/* <Route path="/readmore/:id" element={<SingleBook />} /> */}
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* used multiple paramas */}
          <Route name="documents" path="/documents" element={<BookDetail />}>
            <Route
              name="addTaskModal"
              path="/documents/:id/:bookid"
              element={<TextEditor />}
            />
          </Route>
          <Route
            path="/"
            element={<Navigate replace to={`/documents/${uuid()}`} />}
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardMain />} />
            <Route path="admin" element={<Admin />} />
            <Route path="manage-book" element={<Managebook />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        {/* <Routes>
          <Route 
          path="/dashboard"
          element={
          <PrivateRoute>
             <Dashboard />
           </PrivateRoute>
          }>
          <Route path="admin" element={<Admin />} />
          <Route path="manage-book" element={<Managebook />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes> */}

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
