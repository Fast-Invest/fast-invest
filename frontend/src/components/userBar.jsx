import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

export default function userBar() {
  return (
    <>
      <div className="flex items-center gap-4 shrink-0 pl-6 border-l border-white/10">
        <div className="relative cursor-pointer bell-hover">
          <FaBell className="text-2xl text-white" />
        </div>
        <span className="text-white text-2xl font-black">Usuário</span>
        <FaUserCircle className="text-4xl text-white" />
      </div>
    </>
  );
}
