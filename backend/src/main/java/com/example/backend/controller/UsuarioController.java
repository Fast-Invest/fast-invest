package com.example.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.createUsuarioDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.services.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;







@RestController
@Validated
@RequestMapping("/usuario")
public class UsuarioController {
    


    @Autowired
    private UsuarioService service;






    @PostMapping
    public ResponseEntity<respostaUsuarioDTO> criar(@Valid @RequestBody  createUsuarioDTO usuario) {
        respostaUsuarioDTO resp=service.criarUsuario(usuario);//chama o serviço de criar o usuario, retorna o usuario criado
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);//responde
    }





    @PutMapping("/{id}")
    public ResponseEntity<respostaUsuarioDTO> update(@PathVariable Long id,@Valid @RequestBody createUsuarioDTO usuario) {
        respostaUsuarioDTO resp=service.updateUsuario(id, usuario);
        
        return ResponseEntity.status(HttpStatus.OK).body(resp);//responde
    }









    @GetMapping("/{id}")
    public ResponseEntity<respostaUsuarioDTO> getId(@PathVariable Long id) {
        respostaUsuarioDTO resp=service.listarUsuarioId(id);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }

    @GetMapping("/{email}")
    public ResponseEntity<respostaUsuarioDTO> getEmail(@PathVariable String email) {
        respostaUsuarioDTO resp=service.listarUsuarioEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }    

    @GetMapping
    public ResponseEntity<List<respostaUsuarioDTO>> getUsuarios(){
        List<respostaUsuarioDTO> resp=service.listarUsuarios();
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }










    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteId(@PathVariable Long id){
        service.deletarUsuarioId(id);
        return ResponseEntity.status(HttpStatus.OK).body("usuario deletado");
    }

    
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteEmail(@PathVariable String email){
        service.deletarUsuarioEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body("usuario deletado");
    }

  
}
