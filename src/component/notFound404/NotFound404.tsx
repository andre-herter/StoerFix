import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-linear-to-br from-purple-100 to-pink-100 px-4">
      <h1 className="text-[8rem] md:text-[12rem] font-extrabold text-blue-500 animate-bounce mb-4">
        404
      </h1>

      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 animate-fadeIn">
        Oops! Seite nicht gefunden.
      </p>
      <p className="text-gray-600 mb-8 text-center max-w-md animate-fadeIn delay-200">
        Die Seite, die du suchst, existiert nicht oder wurde verschoben.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300 animate-fadeIn delay-400"
      >
        Zurück zur Startseite
      </button>
    </div>
  );
};

export default NotFound404;
