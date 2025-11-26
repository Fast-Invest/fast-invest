
import logo from "/svg/logo.svg"
export default function LoadingCard({ nomeCotacao }) {
  return (
    <div className="flex justify-center items-center p-40">

        <div className="flex justify-center flex-col items-center rounded-xl border-2 border-primary-dark p-12 shadow-lg shadow-primary/30 gap-4">
            
            <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-56 h-56 border-8 text-primary-dark text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary-dark rounded-full">
                    <img className="w-56 h-56 animate-ping" src={logo} alt="bunny" />
            </div>
            </div>

            <div>
              <p className=" text-primary-dark font-bold text-3xl">Carregando informações da cotação {nomeCotacao} </p>
            </div>  
            <div>
              <p className=" text-primary-dark font-bold text-3xl">Indo o mais rápido possivel</p>
            </div>
            
        </div>

    </div>
  );
}
