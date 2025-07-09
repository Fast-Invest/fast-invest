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
import com.example.backend.forms.UsuarioForm;
import com.example.backend.services.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;







@RestController
@Validated
@RequestMapping("/usuario")
public class UsuarioController {
    

    //inicializa o serviço de usuario que realiza o crud em si
    @Autowired
    private UsuarioService service;




    ////////////////////////////////////////////////////////////////////// CRIAR //////////////////////////////////////////////////////////////////////
    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@Valid @RequestBody  UsuarioForm usuario) {
        //se o campo nao for valido tem uma exceção para lidar com isso
        UsuarioDTO resp=service.criarUsuario(usuario);//chama o serviço de criar o usuario, retorna o usuario criado
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);//responde com 201, com usuario criado
    }




    /////////////////////////////////////////////////////////////////////////// BUSCAR //////////////////////////////////////////////////////////////////////
    @GetMapping("/{id}") //busca o usuario por id
    public ResponseEntity<UsuarioDTO> getId(@PathVariable Long id) {
        UsuarioDTO resp=service.listarUsuarioId(id);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
    
    @GetMapping("/email") //busca o usuario pelo email
    public ResponseEntity<UsuarioDTO> getEmail(@RequestBody String email) {
        UsuarioDTO resp=service.listarUsuarioEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }    

    @GetMapping //busca todos usuarios
    public ResponseEntity<List<UsuarioDTO>> getUsuarios(){
        List<UsuarioDTO> resp=service.listarUsuarios();
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }






    /////////////////////////////////////////////////////////////////////// DELETAR //////////////////////////////////////////////////////////////////////
    @DeleteMapping("/{id}") //deleta por id
    public ResponseEntity<String> deleteId(@PathVariable Long id){
        service.deletarUsuarioId(id);
        return ResponseEntity.status(HttpStatus.OK).body("usuario deletado");
    }

    
    @DeleteMapping("/email") //deleta por email
    public ResponseEntity<String> deleteEmail(@RequestBody String email){
        service.deletarUsuarioEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body("usuario deletado");
    }

  
}
