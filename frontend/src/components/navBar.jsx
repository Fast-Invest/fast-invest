import MenuWelcome from "./menuWelcome.jsx";
import SearchInput from "./searchInput.jsx";

export default function navBar() {
  return (
    <>
      <main className="flex-1 p-6 text-white ">
        <div className="flex items-center justify-between gap-32 mb-6 shadow-xl shadow-white/10">
          <MenuWelcome />
          <div className="flex-1">
            <SearchInput />
          </div>
        </div>
      </main>
    </>
  );
}
