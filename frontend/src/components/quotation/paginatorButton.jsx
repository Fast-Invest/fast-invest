export default function PaginatorButton({ children, handler, condition }) {
  return (
    <button
      onClick={handler}
      disabled={condition}
      className={`min-h-[2.75rem] px-4 font-bold flex items-center justify-center gap-2 rounded-xl 
                                shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] cursor-pointer
                                ${
                                  condition
                                    ? "opacity-40 cursor-not-allowed"
                                    : ""
                                }`}
    >
      {children}
    </button>
  );
}
