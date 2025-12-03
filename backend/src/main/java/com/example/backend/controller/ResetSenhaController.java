package com.example.backend.controller;
import com.example.backend.services.TokenService.TokenPair;
import com.example.backend.services.TokenService;
import com.example.backend.services.UsuarioService;

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


@Tag(name = "Recuperaçãod de Senha", description = "endpoints para envio de email, envio de token e recuperação de senha")
@RestController
@Validated
@RequestMapping("/recuperacaosenha")
public class ResetSenhaController 
{
    
    @Autowired
    private EmailService mailService;

    @Autowired
    private UsuarioService usuarioService;

    private final TokenService tokenService;


    public ResetSenhaController(TokenService tokenService){
        this.tokenService=tokenService;
    }
    
    @PostMapping("/envio_email_reset")
    public ResponseEntity<String> request_token(@RequestBody @Valid EmailForm form)
    {
        try
        {
            TokenPair tokens = tokenService.gerarToken(form.getEmail());
            mailService.enviarEmail(form.getEmail(),tokens.tokenUsuario() );                        
            return ResponseEntity.status(HttpStatus.OK).body(tokens.tokenSeguranca());     
        }
        catch(Exception ex)
        { 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno: " + ex.getMessage());
        }

    }


    @PostMapping("/validacao_token")
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


    @PutMapping("/alteracao_senha")
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
