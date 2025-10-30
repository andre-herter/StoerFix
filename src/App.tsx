import "./App.css";
import Header from "./component/header/Header.tsx";
import Index from "./pages/index/Index.tsx";
import Footer from "./component/footer/Footer.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/loginForm/Login.tsx";
import Register from "./component/registerForm/Register.tsx";
import Kontakt from "./component/kontakt/Kontakt.tsx";
import Impressum from "./component/impressum/Impressum.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
