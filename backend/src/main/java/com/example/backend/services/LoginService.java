package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.backend.forms.LoginForm;
import com.example.backend.mappers.UsuarioMapper;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
import com.example.backend.exceptions.UsuarioNaoEncontrado;

import org.springframework.security.crypto.password.PasswordEncoder;




@Service
public class LoginService 
{

    @Autowired
    private UsuarioRepo usuario_repo;

    @Autowired
    private PasswordEncoder check_hash;

    @Autowired
    private UsuarioMapper mapper;


    /////////////////////////////////////////////////////////////////// Metodo para POST
    public UsuarioDTO logar_usuario(LoginForm form)
    {//basicamente antes é criado um usuario na camada dto, pode validar la
        Usuario usuario = usuario_repo.findByEmail(form.getEmail()).orElseThrow(()->new UsuarioNaoEncontrado(" Usuario não encontrado"));


        boolean valido = check_hash.matches(form.getSenha(), usuario.getSenha()); //compara a senha


        if (valido)
        { //sendo a senha valida
            UsuarioDTO resp = mapper.toResponse(usuario); //mapeia pro usuario de resposta
            return resp ;//retorna 200 pro cliente
        }


        return null;  


    }
}





