export default function searchInput() {
  return (
    <>
      <div className="relative flex items-center max-w-100 leading-7 group">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="absolute left-4 w-4 h-4 fill-[#bdbecb] pointer-events-none z-10"
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>

        <input
          type="search"
          placeholder="Buscar por ticker (ex: PETR4, ITU4)..."
          className="w-full h-[45px] font-bold pl-10 rounded-xl outline-none border-0  cursor-text 
          shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000] transition-all duration-[250ms] z-0 focus:shadow-[0_0_0_2.5px_#2f303d] placeholder:font-normal"
        />
      </div>
    </>
  );
}
