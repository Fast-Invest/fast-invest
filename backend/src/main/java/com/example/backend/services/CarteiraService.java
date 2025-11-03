package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.CarteiraDTO;
import com.example.backend.exceptions.CarteiraNaoEncontrada;
import com.example.backend.exceptions.UsuarioNaoEncontrado;
import com.example.backend.forms.CarteiraForm;
import com.example.backend.mappers.CarteiraMapper;
import com.example.backend.models.Carteira;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.CarteiraRepo;
import com.example.backend.repositories.UsuarioRepo;

@Service
public class CarteiraService 
{
    @Autowired 
    CarteiraRepo carteiraRepo;

    @Autowired
    UsuarioRepo usuarioRepo;

    @Autowired
    CarteiraMapper carteiraMapper;

    public CarteiraDTO criarCarteira(CarteiraForm carteiraForm, Long userId)
    {
        Usuario usuario = usuarioRepo.findById(userId).orElseThrow(()->new UsuarioNaoEncontrado("Usuário não encontrado"));
        Carteira carteira = carteiraMapper.toEntity(carteiraForm);
        carteira.setUsuario(usuario);

        return carteiraMapper.toResponse(carteiraRepo.save(carteira));

    }


    
    public List<CarteiraDTO> buscarCarteiras(Long userId)
    {
        List<Carteira> carteiras = carteiraRepo.findByUsuarioId(userId).orElseThrow(()->new CarteiraNaoEncontrada());
        return carteiraMapper.toResponseList(carteiras);
    }



    public CarteiraDTO atualizarCarteira(CarteiraForm form, Long carteiraId)
    {
        Carteira carteira = carteiraRepo.findById(carteiraId).orElseThrow(()->new CarteiraNaoEncontrada());
        Carteira novaCarteira = carteiraMapper.toEntity(form);
        novaCarteira.setFiltros(carteira.getFiltros());
        novaCarteira.setUsuario(carteira.getUsuario());

        return carteiraMapper.toResponse(carteiraRepo.save(novaCarteira)); 
    }


    
    public void apagarCarteira(Long carteiraId)
    {
        Carteira carteira = carteiraRepo.findById(carteiraId).orElseThrow(()->new CarteiraNaoEncontrada());
        carteiraRepo.delete(carteira);
    }
}
