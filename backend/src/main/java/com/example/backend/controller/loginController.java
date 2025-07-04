package com.example.backend.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.createUsuarioDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.services.UserMapper;
import jakarta.validation.Valid;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import com.example.backend.repositories.UsuarioRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.backend.models.Usuario;





@RestController
public class loginController {

    @Autowired
    private UserMapper mapper;

    @Autowired
    private UsuarioRepo usuario_repo;


    @Autowired
    private PasswordEncoder check_hash;

    @PostMapping
    public ResponseEntity<Object> logar(createUsuarioDTO dto){

        String email=dto.getEmail();
        String senha=dto.getSenha();

        Optional<Usuario> usuario = usuario_repo.findByEmail(email);

        if(usuario.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body("senha incorreta");       
        }


        Usuario usuarioModel = usuario.get();
        boolean valido = check_hash.matches(senha, usuarioModel.getSenha());


        if (valido){
            respostaUsuarioDTO resp = mapper.toResponse(usuarioModel);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }


        return ResponseEntity.status(HttpStatus.OK).body("senha incorreta");       
    }
}