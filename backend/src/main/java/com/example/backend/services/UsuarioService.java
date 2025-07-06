package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.exceptions.UsuarioNaoEncontrado;
import com.example.backend.exceptions.UsuariojaExiste;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;



@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepo usuario_repo;

    @Autowired
    private PasswordEncoder hash_pass;

    @Autowired
    private UsuarioMapper mapper;


    /////////////////////////////////////////////////////////////////// Metodo para POST
    public respostaUsuarioDTO criarUsuario(UsuarioDTO usuariodto){//basicamente antes é criado um usuario na camada dto, pode validar la
        if(usuario_repo.existsByEmail(usuariodto.getEmail())){ 
            throw new UsuariojaExiste("Ja existe um usuario com o email em questao");
        }

        Usuario usuario=mapper.toEntity(usuariodto); //mapeia o objeto criado para o objeto que sera armazenado no banco
        usuario.setSenha(hash_pass.encode(usuariodto.getSenha())); //da hash a senha

        return mapper.toResponse(usuario_repo.save(usuario));//retorna uma versão mapeada para resposta,ou seja, nao contem a senha uma vez que essa é privada, assim nao há comunicação direta do objeto com atributo da senha com outra camada
    }






    ///////////////////////////////////////////////////////////////////////// Metodos para GET
    public List<respostaUsuarioDTO> listarUsuarios(){
        return mapper.toResponseList(usuario_repo.findAll());
        //o findAll vai retornar a lista de objeto usuarios, e o mapper vai converter
        //numa lista de resposta de usuarios (sem a senha)
    }    

    public respostaUsuarioDTO listarUsuarioId(Long id){
        Usuario usuario = usuario_repo.findById(id).orElseThrow(()-> new UsuarioNaoEncontrado("Sem usuario com id em questao"));
        return mapper.toResponse(usuario);
    }  

    public respostaUsuarioDTO listarUsuarioEmail(String email){
        Usuario usuario = usuario_repo.findByEmail(email).orElseThrow(()-> new UsuarioNaoEncontrado("Sem usuario com email em questao"));
        return mapper.toResponse(usuario);
    }    





    /////////////////////////////////////////////////////////////////// Metodos para DELETE
    public void deletarUsuarioId(Long id){
        Usuario morto = usuario_repo.findById(id).orElseThrow(() -> new UsuarioNaoEncontrado("Sem usuario com id em questao"));
        //busca o usuario a deletar pelo id, se nao achar lança a exceção
        usuario_repo.delete(morto);;
    }  


    public void deletarUsuarioEmail(String email){
        Usuario morto = usuario_repo.findByEmail(email).orElseThrow(() -> new UsuarioNaoEncontrado("Sem usuario com email em questao"));
        //busca o usuario a deletar pelo email, se nao achar lança a exceção
        usuario_repo.delete(morto);;
    }  





}





/*              Aqui atualiza por id, nao acho que sera muito util na aplicação, mas deixei ai para nao escrever de novo
    public respostaUsuarioDTO updateUsuario(Long id, UsuarioDTO dto){
        Usuario usuario = usuario_repo.findById(id).orElseThrow(()-> new UsuarioNaoEncontrado("Sem usuario com id em questao"));
        //busca o usuario a ser atualizado pelo id, se nao achar lança exceção
        usuario.setEmail(dto.getEmail());//seta o email
        usuario.setSenha(hash_pass.encode(dto.getSenha()));//seta a senha hasheada

        Usuario updated=usuario_repo.save(usuario); //salva no banco sobrescrevendo


        return mapper.toResponse(updated); 
    }


 */