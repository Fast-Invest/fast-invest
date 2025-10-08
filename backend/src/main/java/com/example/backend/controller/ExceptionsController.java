package com.example.backend.controller;


import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.backend.exceptions.TokenExpirado;
import com.example.backend.exceptions.TokenInvalido;
import com.example.backend.exceptions.UsuarioNaoEncontrado;
import com.example.backend.exceptions.UsuariojaExiste;
import com.example.backend.exceptions.ErroBuscaCotacoes;

import org.springframework.web.bind.MethodArgumentNotValidException;
import java.util.Map;




@RestControllerAdvice
public class ExceptionsController
{//Aqui ria um handler para exceções personalizadas , se der ele causa esse retorno

    

    @ExceptionHandler(UsuariojaExiste.class)
    public ResponseEntity<String> handleUsuarioJaExiste(UsuariojaExiste ex)
    { 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UsuarioNaoEncontrado.class)
    public ResponseEntity<String> handleUsuarioNaoEncontrado(UsuarioNaoEncontrado ex)
    { 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }   

    @ExceptionHandler(TokenExpirado.class)
    public ResponseEntity<String> handleTokenInvalido(TokenInvalido ex)
    { 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }   
    
    @ExceptionHandler(TokenInvalido.class)
    public ResponseEntity<String> handleTokenExpirado(TokenExpirado ex)
    { 
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(ErroBuscaCotacoes.class)
    public ResponseEntity<String> handleBuscarCotacoes(TokenExpirado ex)
    { 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    //erro na validacao
    @ExceptionHandler(MethodArgumentNotValidException.class)//isso é lançado quando falha na validação
    public ResponseEntity<Map<String,String>> handleValidacao(MethodArgumentNotValidException ex)
    {
        String msg = ex.getBindingResult()//retorna o objeto com todos erros de validação detecdados
                    .getFieldErrors()//pega os campos onde houve erro individualmente,devolve uma lista
                    .stream() //para operar com o fluxo de dados da lista
                    .map(erro -> erro.getField()+": "+erro.getDefaultMessage())//erro vao ser objeto do fieldErros, se foi erro no email por exemplo ele vai pegar email: Email deve ser valido
                    .collect(Collectors.joining(", "));//vai unir tudo numa so string

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro","Erro de validação: "+ msg));
    }

    


    //Erro geral do servidor
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeral(Exception ex) 
    {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Erro interno: " + ex.getMessage());
    }




}