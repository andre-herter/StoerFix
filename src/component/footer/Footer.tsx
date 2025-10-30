import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 px-6 text-center mt-5 py-4 text-slate-400 text-sm">
      <Link to="/impressum" className="mr-4">
        Impressum
      </Link>
      <span> &copy; Andre 2025 </span>
    </footer>
  );
}

export default Footer;
