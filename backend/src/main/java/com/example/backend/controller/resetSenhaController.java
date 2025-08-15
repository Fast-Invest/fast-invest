package com.example.backend.controller;
import com.example.backend.services.TokenService.TokenPair;
import com.example.backend.services.TokenService;
import com.example.backend.services.UsuarioService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.services.EmailService;

import io.swagger.v3.oas.annotations.tags.Tag;

import com.example.backend.exceptions.TokenInvalido;
import com.example.backend.forms.EmailForm;
import com.example.backend.forms.ResetTokenForm;
import com.example.backend.forms.ResetSenhaForm;


@Tag(name = "Esqueci Senha", description = "endpoints para envio de email, envio de token e recuperação de senha")
@RestController
@Validated
@RequestMapping("/esquecisenha")
public class ResetSenhaController 
{
    
    //inicializa o serviço de envio de email
    @Autowired
    private EmailService mailService;

    @Autowired
    private UsuarioService usuarioService;

    private final TokenService tokenService;


    public ResetSenhaController(TokenService tokenService){
        this.tokenService=tokenService;
    }
    
    @PostMapping("/requisitar_reset")
    public ResponseEntity<String> request_token(@RequestBody @Valid EmailForm form)
    {
        try
        {
            TokenPair tokens = tokenService.gerarToken(form.getEmail());
            mailService.enviarEmail(form.getEmail(),tokens.tokenUsuario() );                        // envia o email com o token
            return ResponseEntity.status(HttpStatus.OK).body(tokens.tokenSeguranca());     // se nao deu erro confirma que foi enviado
        }
        catch(MessagingException ex)
        { //se der erro cai aqui e retira
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno: " + ex.getMessage());
        }

    }


    @PostMapping("/validar_token")
    public ResponseEntity<String> validar_token(@RequestBody @Valid ResetTokenForm form)
    {
        try
        {
            String email = tokenService.verificarToken(form.getTokenSeguranca(), form.getTokenUsuario());
            if(email == null){throw new TokenInvalido("Token invalido ou expirado");}
            return ResponseEntity.status(HttpStatus.OK).body("token validado com sucesso");                                                                                 
        }
        catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno: " + ex.getMessage());
        }
    }


    @PutMapping("/recuperar_senha")
    public ResponseEntity<String> recuperar_senha(@RequestBody @Valid ResetSenhaForm form)
    {
        try
        {
            Boolean foiAtualizado=usuarioService.atualizarSenha(form.getEmail(), form.getSenha());
            if(!foiAtualizado){return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar usuario");}
            return ResponseEntity.status(HttpStatus.OK).body("email enviado com sucesso"); 
        }
        catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno: " + ex.getMessage());
        }
    }
}
