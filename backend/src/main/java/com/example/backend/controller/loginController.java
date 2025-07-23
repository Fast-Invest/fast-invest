package com.example.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.services.LoginService;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.forms.loginForm;
import org.springframework.beans.factory.annotation.Value;

import jakarta.validation.Valid;





@RestController
@Validated
public class loginController {

    @Autowired
    private LoginService loginserv;

    @Value("${app.jwt.secret}")
    private String jwt_secret;


    @PostMapping("/login") //Metodo POST
    public ResponseEntity<UsuarioDTO> logar(@RequestBody @Valid loginForm form){ //recebe o usuario
        UsuarioDTO resp  = loginserv.logar_usuario(form);


        if (resp!=null){
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
}