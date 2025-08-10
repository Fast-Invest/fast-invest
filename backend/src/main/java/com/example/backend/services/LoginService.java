package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.example.backend.forms.LoginForm;
import com.example.backend.mappers.UsuarioMapper;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
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
        Optional<Usuario> usuario = usuario_repo.findByEmail(form.getEmail());//procura o usuario pelo email, se nao ter nada armazena no usuario

        if(usuario.isEmpty())//confirma se o usuario é nulo, se for, devolve na resposta
        { 
            return null; //ResponseEntity é uma classe que representa uma responsa http, podendo incluir o codigo de status, headers e body      
        }


        Usuario usuarioModel = usuario.get(); //transforma o objeto de usuario no mesmo da entitidade do banco
        boolean valido = check_hash.matches(form.getSenha(), usuarioModel.getSenha()); //compara a senha


        if (valido)
        { //sendo a senha valida
            UsuarioDTO resp = mapper.toResponse(usuarioModel); //mapeia pro usuario de resposta
            return resp ;//retorna 200 pro cliente
        }


        return null;  


    }
}





