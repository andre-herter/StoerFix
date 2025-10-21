import "./App.css";
import bgImage from "./assets/Texturelabs_Metal_292M.jpg";

function App() {
  return (
    <div
      className="h-screen w-auto bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    ></div>
  );
}

export default App;
