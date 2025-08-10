
export default function Stepper({ etapaAtual, etapasTotais }){
    const corAtiva = (index) => etapaAtual === index ? "bg-primary text-neutral-900" : "bg-bg"


return(
    <div className='flex items-center justify-center gap-12 w-1'>
        {Array.from({ length: etapasTotais }).map((_, index)=>(
            <div key={index}>
                <div className={`flex justify-center items-center rounded-full w-12 h-12 ${corAtiva(index)} shadow-2xl shadow-black`}>
                    {index+1}
                </div>

            </div>
        ))}
        
    </div>
    );

}