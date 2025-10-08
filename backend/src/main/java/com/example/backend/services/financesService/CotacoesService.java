package com.example.backend.services.financesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.DadosPrincipaisAcoesRepo;
import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.exceptions.ErroBuscaCotacoes;
import java.util.List;

@Service
public class CotacoesService 
{
    @Autowired
    private DadosPrincipaisAcoesRepo dadosPrincipaisAcoesRepo;


    public List<CotacaoProjection> buscarCotacoes()
    {
        try
        {
            return dadosPrincipaisAcoesRepo.buscarCotacoes();
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações");
        }
    }
}
