export default function ViewButton({ children, mode, setViewMode, modoAtual })
{
    return(
            <button
                onClick={() => setViewMode(mode)}
                className={`min-h-[2.75rem] aspect-square flex items-center justify-center rounded-xl ${
                    modoAtual === mode
                        ? "text-[#00ff9c]"
                        : "text-white/70 hover:text-[#00ff9c]"
                }`}
            >
                {children}
            </button>);
}