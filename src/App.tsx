import "./App.css";
import Header from "./component/header/Header.tsx";
import Index from "./pages/index/Index.tsx";
import Footer from "./component/footer/Footer.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginForm/Login.tsx";
import Register from "./pages/registerForm/Register.tsx";
import Kontakt from "./component/kontakt/Kontakt.tsx";
import Impressum from "./component/impressum/Impressum.tsx";
import CreateEntry from "./component/createEntry/CreateEntry.tsx";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header query={query} setQuery={setQuery} />
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route
              path="/create"
              element={<CreateEntry query={query} setQuery={setQuery} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
