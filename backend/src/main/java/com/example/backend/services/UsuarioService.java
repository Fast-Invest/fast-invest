package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.forms.UsuarioForm;
import com.example.backend.mappers.UsuarioMapper;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.exceptions.UsuarioNaoEncontrado;
import com.example.backend.exceptions.UsuariojaExiste;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;



@Service
public class UsuarioService 
{

    @Autowired
    private UsuarioRepo usuario_repo;

    @Autowired
    private PasswordEncoder hash_pass;

    @Autowired
    private UsuarioMapper mapper;


    /////////////////////////////////////////////////////////////////// Metodo para POST
    public UsuarioDTO criarUsuario(UsuarioForm form)//basicamente antes é criado um usuario na camada dto, pode validar la
    {
        if(usuario_repo.existsByEmail(form.getEmail()))
        { 
            throw new UsuariojaExiste("Ja existe um usuario com o email em questao");
        }

        Usuario usuario=mapper.toEntity(form); //mapeia o objeto criado para o objeto que sera armazenado no banco
        usuario.setSenha(hash_pass.encode(form.getSenha())); //da hash a senha

        return mapper.toResponse(usuario_repo.save(usuario));//retorna uma versão mapeada para resposta,ou seja, nao contem a senha uma vez que essa é privada, assim nao há comunicação direta do objeto com atributo da senha com outra camada
    }






    ///////////////////////////////////////////////////////////////////////// Metodos para GET
    public List<UsuarioDTO> listarUsuarios()
    {
        return mapper.toResponseList(usuario_repo.findAll());
        //o findAll vai retornar a lista de objeto usuarios, e o mapper vai converter
        //numa lista de resposta de usuariosdto (sem a senha)
    }    

    public UsuarioDTO listarUsuarioId(Long id)
    {
        Usuario usuario = usuario_repo.findById(id).orElseThrow(()-> new UsuarioNaoEncontrado("Sem usuario com id em questao"));
        return mapper.toResponse(usuario);//retorna o dto do usuario
    }  

    public UsuarioDTO listarUsuarioEmail(String email)
    {
        Usuario usuario = usuario_repo.findByEmail(email).orElseThrow(()-> new UsuarioNaoEncontrado("Sem usuario com email em questao"));
        return mapper.toResponse(usuario);//retorna o dto do usuario
    }    






    // Metodos para update
    public boolean atualizarSenha(String email, String senha) 
    {
        Usuario usuario = usuario_repo.findByEmail(email).orElseThrow(()-> new UsuarioNaoEncontrado("Sem usuario com email em questao"));
        if(null==usuario){return false;}
        try
        {
            usuario.setSenha(hash_pass.encode(senha));
            usuario_repo.save(usuario);
            return true;
        }
        catch(Exception ex)
        {
            return false;
        }
    }















    /////////////////////////////////////////////////////////////////// Metodos para DELETE
    public void deletarUsuarioId(Long id)
    {
        Usuario morto = usuario_repo.findById(id).orElseThrow(() -> new UsuarioNaoEncontrado("Sem usuario com id em questao"));
        //busca o usuario a deletar pelo id, se nao achar lança a exceção
        usuario_repo.delete(morto);
    }  


    public void deletarUsuarioEmail(String email)
    {
        Usuario morto = usuario_repo.findByEmail(email).orElseThrow(() -> new UsuarioNaoEncontrado("Sem usuario com email em questao"));
        //busca o usuario a deletar pelo email, se nao achar lança a exceção
        usuario_repo.delete(morto);
    }  




}





