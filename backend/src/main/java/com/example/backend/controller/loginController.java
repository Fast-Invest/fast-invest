package com.example.backend.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.forms.loginForm;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
import com.example.backend.services.UsuarioMapper;

import jakarta.validation.Valid;





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
    public ResponseEntity<Object> logar(@RequestBody @Valid loginForm form){ //recebe o usuario


        Optional<Usuario> usuario = usuario_repo.findByEmail(form.getEmail());//procura o usuario pelo email, se nao ter nada armazena no usuario

        if(usuario.isEmpty()){ //confirma se o usuario é nulo, se for, devolve na resposta
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro","sem usuario com email em questao")); //ResponseEntity é uma classe que representa uma responsa http, podendo incluir o codigo de status, headers e body      
        }


        Usuario usuarioModel = usuario.get(); //transforma o objeto de usuario no mesmo da entitidade do banco
        boolean valido = check_hash.matches(form.getSenha(), usuarioModel.getSenha()); //compara a senha


        if (valido){ //sendo a senha valida
            UsuarioDTO resp = mapper.toResponse(usuarioModel); //mapeia pro usuario de resposta
            return ResponseEntity.status(HttpStatus.OK).body(resp);//retorna 200 pro cliente
        }


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("senha incorreta");       //se nao foi valido devolve senha incorreta
    }
}