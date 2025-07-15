import MenuWelcome from "./menuWelcome.jsx";
import SearchInput from "./searchInput.jsx";
import UserBar from "./userBar.jsx";

export default function navBar() {
  return (
    <header className="w-full px-6 py-4 text-white border-b border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-8 w-full max-w-[75%]">
        <MenuWelcome />
        <div className="flex-1">
          <SearchInput />
        </div>
      </div>
      <UserBar />
    </header>
  );
}
