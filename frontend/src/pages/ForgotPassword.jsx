import { useState } from "react";
import { Link } from "react-router-dom";
import Stepper from "../components/Stepper"
import EmailFase from "../components/emailFase";


export default function ForgotPassword()
{
    const [etapaAtual,setEtapa]=useState(0)
    const NUM_ETAPAS=3;

    const etapas=[
        { label: "Requirir token", component: <EmailFase mudarEtapa={setEtapa}/>}
    ]
    return(
        <div className= "min-h-screen flex justify-center bg-bg text-text font-sans antialiased p-12">
            <div className="flex flex-col justify-evenly items-center w-1/2 bg-bg-card  p-12 rounded-xl shadow-2xl shadow-black">

                <Stepper etapaAtual={etapaAtual} etapasTotais={NUM_ETAPAS}/>
                {etapas[etapaAtual].component}

                <div className="mt-8 text-center text-text-muted">
                    Deseja voltar ?
                     <Link className="text-primary hover:underline font-semibold" to="/Login">
                        <span> Volte ao login</span>
                    </Link>
                </div>
                    
            </div>
        </div>
    );

























}