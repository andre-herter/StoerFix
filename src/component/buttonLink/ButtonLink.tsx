import { Link } from "react-router-dom";

function ButtonLink({ text, to, setMobileMenuOpen }: any) {
  return (
    <Link
      onClick={() => setMobileMenuOpen(false)}
      to={to}
      className="text-sm/6 cursor-pointer px-2 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {text}
    </Link>
  );
}

export default ButtonLink;
