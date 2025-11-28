import { useEffect, useState } from "react";
import walletService from "../../services/walletService";

export default function ContentWalletDetails({wallet})
{
    const walletId = wallet?.id;
    const [allQuotations,setAllQuotations]=useState([]);

    useEffect(() => {

        const getFilteredQuotations = async (walletId)=>{
            try {
                const resp = await walletService.aplicarFiltros(walletId);
                setAllQuotations(resp?.filtros || null);
                console.log(resp?.filtros)
            } catch (error) {
                console.log(error)

            }
        }


        getFilteredQuotations(walletId)
    }, [walletId]);





    return(

        <div className="min-h-screen">
            <textarea cols="200" rows="10" value={JSON.stringify(allQuotations)} readOnly>  </textarea>
        </div>
    );







}