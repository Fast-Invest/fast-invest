package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.exceptions.TokenInvalido;
import com.example.backend.forms.UsuarioForm;
import com.example.backend.services.JwtService;
import com.example.backend.services.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;







@RestController
@Validated
@RequestMapping("/usuario")
public class UsuarioController 
{
    

    //inicializa o serviço de usuario que realiza o crud em si
    @Autowired
    private UsuarioService service;


    private final JwtService jwtService;

    public UsuarioController(JwtService jwtService){
        this.jwtService=jwtService;
    }

    ////////////////////////////////////////////////////////////////////// CRIAR //////////////////////////////////////////////////////////////////////
    @Operation(summary = "Cadastra um novo usuario no banco")
    @ApiResponse(responseCode = "201", description = "usuario criado")
    @ApiResponse(responseCode = "400", description = "dados enviados pelo frontend são invalidos")
    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@Valid @RequestBody  UsuarioForm usuario) 
    {
        //se o campo nao for valido tem uma exceção para lidar com isso
        UsuarioDTO resp=service.criarUsuario(usuario);//chama o serviço de criar o usuario, retorna o usuario criado
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);//responde com 201, com usuario criado
    }




    /////////////////////////////////////////////////////////////////////////// BUSCAR //////////////////////////////////////////////////////////////////////
    @Operation(summary = "Busca novo usuario no banco pelo id")
    @ApiResponse(responseCode = "200", description = "usuario encontrado")
    @ApiResponse(responseCode = "400", description = "id passado pelo frontend é invalido")
    @GetMapping("/{id}") //busca o usuario por id
    public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id)
    {
        UsuarioDTO resp=service.listarUsuarioId(id);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @Operation(summary = "Busca um usuario no banco pelo email")
    @ApiResponse(responseCode = "200", description = "usuario encontrado")
    @ApiResponse(responseCode = "400", description = "email passado pelo frontend é invalido")    
    @GetMapping("/email") //busca o usuario pelo email
    public ResponseEntity<UsuarioDTO> buscarPorEmail(@CookieValue(name = "ACCESS-TOKEN", defaultValue = "") String accessToken) 
    {
        if (accessToken.isBlank()){throw new TokenInvalido("Token expirado ou invalido");}
        String email = jwtService.validarTokenAcesso(accessToken);
        if (email == null) {throw new TokenInvalido("Token expirado ou invalido");}
        
        UsuarioDTO resp=service.listarUsuarioEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }    


    @Operation(summary = "Busca todos usuarios")
    @ApiResponse(responseCode = "200", description = "usuarios encontrados")
    @GetMapping //busca todos usuarios
    public ResponseEntity<List<UsuarioDTO>> buscarUsuarios()
    {
        List<UsuarioDTO> resp=service.listarUsuarios();
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }











    /////////////////////////////////////////////////////////////////////// DELETAR //////////////////////////////////////////////////////////////////////
    @Operation(summary = "deleta um usuario baseado no id")
    @ApiResponse(responseCode = "200", description = "usuario deletado com sucesso")
    @ApiResponse(responseCode = "400", description = "usuario não encontrado ou inexistente")
    @DeleteMapping("/{id}") //deleta por id
    public ResponseEntity<String> deletarPorId(@PathVariable Long id)
    {
        service.deletarUsuarioId(id);
        return ResponseEntity.status(HttpStatus.OK).body("usuario deletado");
    }

    @Operation(summary = "deleta um usuario baseado no email")
    @ApiResponse(responseCode = "200", description = "usuario deletado com sucesso")
    @ApiResponse(responseCode = "400", description = "usuario não encontrado ou inexistente")    
    @DeleteMapping("/email") //deleta por email
    public ResponseEntity<String> deletarPorEmail(@RequestBody String email)
    {
        service.deletarUsuarioEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body("usuario deletado");
    }



}
