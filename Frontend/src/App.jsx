import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import AddBook from "./Dashboard/AddBook/AddBook";
import Admin from "./Dashboard/Admin/Admin";
import Dashboard from "./Dashboard/Dashboard/Dashboard";
import DashboardMain from "./Dashboard/Dashboard/DashboardMain";
import Managebook from "./Dashboard/Managebook/Managebook";
import Footer from "./components/Footer/Footer";
import Header from "./components/Navbar/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import BookDetail from "./pages/Books/BookDetail";
import TextEditor from "./pages/Books/TextEditor";
import Contact from "./pages/Contact/Contact";
import Feathures from "./pages/Feathures/Feathures";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound/NotFound";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/feathures" element={<Feathures />} />
          <Route path="/contact" element={<Contact />} />
          {/* used multiple paramas */}

          <Route
            name="documents"
            path="/documents"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          >
            <Route
              name="documents"
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

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
