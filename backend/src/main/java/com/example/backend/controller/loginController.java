package com.example.backend.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.loginDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.services.UsuarioMapper;

import jakarta.validation.Valid;

import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import com.example.backend.repositories.UsuarioRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;

import com.example.backend.models.Usuario;





@RestController
@Validated
public class loginController {

    //inicializa o mapper para conversão do objeto usuario do banco para o dto que é usado nas transções entre front e backend
    @Autowired
    private UsuarioMapper mapper;

    //inicializa o repositorio de usuario que permite a utilização de metodos pre-feitos de crud
    @Autowired
    private UsuarioRepo usuario_repo;

    //inicializa o codificador/decodificar de senha para dar hash ou verificar
    @Autowired  
    private PasswordEncoder check_hash;




    @PostMapping("/login") //Metodo POST
    public ResponseEntity<Object> logar(@RequestBody @Valid loginDTO dto){ //recebe o usuario


        Optional<Usuario> usuario = usuario_repo.findByEmail(dto.getEmail());//procura o usuario pelo email, se nao ter nada armazena no usuario

        if(usuario.isEmpty()){ //confirma se o usuario é nulo, se for, devolve na resposta
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro","sem usuario com email em questao")); //ResponseEntity é uma classe que representa uma responsa http, podendo incluir o codigo de status, headers e body      
        }


        Usuario usuarioModel = usuario.get(); //transforma o objeto de usuario no mesmo da entitidade do banco
        boolean valido = check_hash.matches(dto.getSenha(), usuarioModel.getSenha()); //compara a senha


        if (valido){ //sendo a senha valida
            respostaUsuarioDTO resp = mapper.toResponse(usuarioModel); //mapeia pro usuario de resposta
            return ResponseEntity.status(HttpStatus.OK).body(resp);//retorna 200 pro cliente
        }


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("senha incorreta");       //se nao foi valido devolve senha incorreta
    }
}