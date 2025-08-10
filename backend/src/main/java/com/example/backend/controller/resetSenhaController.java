package com.example.backend.controller;
import java.util.Map;


import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.services.EmailService;
import com.example.backend.utils.EmailTokenUtil;
import com.example.backend.forms.EmailForm;
//import com.example.backend.forms.ResetSenhaForm;

@RestController("/esqueci-senha")
@Validated
public class ResetSenhaController 
{
    
    //inicializa o serviço de envio de email
    @Autowired
    private EmailService mail;

    
    @PostMapping("requisitar-reset")
    public ResponseEntity<Map<String,String>> request_token(@RequestBody @Valid EmailForm form)
    {
        try
        {
        mail.enviarEmail(form.getEmail(), EmailTokenUtil.gerarToken(4));}//envia o email com o token
        catch(MessagingException ex){ //se der erro cai aqui e retira
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro","Erro interno: " + ex.getMessage()));

        }

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("confirm","Email enviado")); //se nao deu confirma que foi enviado
    }


    // @PostMapping("/reset")
    // public ResponseEntity<Map<String,String>> reseting(@RequestBody @Valid ResetSenhaForm form)
    // {
    //     //String token=dto.getToken();
    //     //String email=dto.getEmail();
    //     //String novaSenha=dto.getNovaSenha();
    //     //Resto que nao quero fazer agr
    //     return ResponseEntity.status(HttpStatus.OK).body(Map.of("confirm","Senha atualizada"));
    // }
}
