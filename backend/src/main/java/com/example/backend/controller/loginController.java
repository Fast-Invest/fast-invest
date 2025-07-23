package com.example.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.services.LoginService;
import org.springframework.http.HttpHeaders;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.forms.loginForm;
import org.springframework.beans.factory.annotation.Value;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import com.example.backend.config.JWT;




@RestController
@Validated
public class loginController 
{
    

    @Autowired
    private LoginService loginserv;

    @Autowired
    private JWT jwt;


   

    @PostMapping("/login") //Metodo POST
    public ResponseEntity<UsuarioDTO> logar(@RequestBody @Valid loginForm form,HttpServletResponse response)
    { //recebe o usuario
        UsuarioDTO resp  = loginserv.logar_usuario(form);


        if (resp!=null){
            String token=jwt.buildjwt(resp.getEmail());
            ResponseCookie cookie=jwt.buildCookie(token);

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
    }
}