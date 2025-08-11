import { useState } from "react";
import { Link } from "react-router-dom";

import Stepper from "../components/utils/Stepper.jsx";
import EmailFase from "../components/forgotpassword/emailFase.jsx";
import LogoBranding from "../components/login/logoBranding.jsx";
import LinkVoltar from "../components/utils/linkVoltar.jsx";

export default function ForgotPassword() {
  const [etapaAtual, setEtapa] = useState(0);
  const NUM_ETAPAS = 3;

  const etapas = [
    { label: "Requirir token", component: <EmailFase mudarEtapa={setEtapa} /> },
  ];

  return (
    <div className="min-h-screen flex bg-bg text-text font-sans antialiased">
      {/* Lado Esquerdo */}
      <LogoBranding />

      {/* Lado Direito */}
      <div className="w-1/2 bg-bg-card flex flex-col justify-center items-center p-12 rounded-l-3xl shadow-2xl shadow-black">
        <div className="max-w-md w-full flex flex-col items-center">
          <Stepper etapaAtual={etapaAtual} etapasTotais={NUM_ETAPAS} />
          <div className="mt-8 w-full">{etapas[etapaAtual].component}</div>

          <div className="mt-8 text-center text-text-muted">
            Deseja voltar?
            <Link
              className="text-primary hover:underline font-semibold ml-1"
              to="/Login"
            >
              Volte ao login
            </Link>
          </div>
          {/* Link para voltar ao início */}
          <LinkVoltar to="/" />
        </div>
      </div>
    </div>
  );
}
