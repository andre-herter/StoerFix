function Button({ text, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="text-sm/6 cursor-pointer px-2 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {text}
    </button>
  );
}

export default Button;
