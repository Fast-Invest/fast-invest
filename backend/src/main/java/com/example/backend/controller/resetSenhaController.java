package com.example.backend.controller;


import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.services.EmailService;
import com.example.backend.utils.EmailTokenUtil;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.example.backend.forms.EmailForm;

@Tag(name = "Esqueci Senha", description = "endpoints para envio de email, envio de token e recuperação de senha")
@RestController
@Validated
@RequestMapping("/esquecisenha")
public class ResetSenhaController 
{
    
    //inicializa o serviço de envio de email
    @Autowired
    private EmailService mail;

    
    @PostMapping("/requisitar_reset")
    public ResponseEntity<String> request_token(@RequestBody @Valid EmailForm form)
    {
        try
        {
            mail.enviarEmail(form.getEmail(), EmailTokenUtil.gerarToken(4));    // envia o email com o token
            return ResponseEntity.status(HttpStatus.OK).body("Email enviado");     // se nao deu erro confirma que foi enviado
        }
        catch(MessagingException ex)
        { //se der erro cai aqui e retira
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno: " + ex.getMessage());
        }

    }


}
