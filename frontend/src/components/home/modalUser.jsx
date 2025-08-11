import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ModalUser({ nome, email, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const password = "minhasenha123";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-bg-card p-8 rounded-lg shadow-lg w-96 relative transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-text-muted hover:text-text text-2xl transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-primary mb-4">
          Perfil do Usuário
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-text-muted text-sm">Nome:</p>
            <p className="text-text text-lg font-medium">{nome}</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">Email:</p>
            <p className="text-text text-lg font-medium">{email}</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">Senha:</p>
            <div className="flex items-center justify-between">
              <p className="text-text text-lg font-medium">
                {showPassword ? password : "••••••••••••"}
              </p>
              <button
                onClick={togglePasswordVisibility}
                className="text-text-muted ml-2 hover:text-text transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <p className="text-text-muted text-sm">Carteiras Criadas:</p>
            <p className="text-text text-lg font-medium">5</p>
            {/* TODO: Chamar função para obter o número real de carteiras */}
          </div>
        </div>
      </div>
    </div>
  );
}
