package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.createUsuarioDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.models.Usuario;
import com.example.backend.repositories.UsuarioRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;


/** Vamo explicar oq estamos fazendo:

uma camada dto(DATA TRANSFER OBJECT)->adrão de projeto de software usado para transferir dados entre diferentes camadas de uma aplicação ou entre sistemas diferentes

Por que usar DTOs?
Desacoplamento:
DTOs ajudam a desacoplar as camadas da aplicação, permitindo que elas evoluam de forma independente, sem afetar a comunicação. 

Segurança:
Podem ser usados para expor apenas os dados necessários, evitando a exposição de informações confidenciais. 

Performance:
Em chamadas remotas ou serialização, o uso de DTOs pode otimizar a transferência de dados, evitando a necessidade de enviar grandes quantidades de dados ou objetos complexos. 

Exemplo:
Imagine uma API REST que retorna informações sobre um produto. Em vez de enviar a entidade completa do produto (que pode conter informações adicionais não necessárias para a resposta), você pode criar um DTO com apenas os dados relevantes para o cliente, como nome, preço e descrição. 


**/
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepo usuario_repo;

    @Autowired
    private PasswordEncoder hash_pass;

    @Autowired
    private UserMapper mapper;






                                                        //criar usuario
    public respostaUsuarioDTO criarUsuario(createUsuarioDTO usuariodto){//basicamente antes é criado um usuario na camada dto, pode validar la

        Usuario usuario=mapper.toEntity(usuariodto); //mapeia o objeto criado para o objeto que sera armazenado no banco
        usuario.setSenha(hash_pass.encode(usuariodto.getSenha())); //da hash a senha

        Usuario saved=usuario_repo.save(usuario); //salva no banco

        return mapper.toResponse(saved);//retorna uma versão mapeada para resposta,ou seja, nao contem a senha uma vez que essa é privada, assim nao há comunicação direta do objeto com atributo da senha com outra camada
    }





    
                                            //dar update por id
    public respostaUsuarioDTO updateUsuario(Long id, createUsuarioDTO dto){
        Usuario usuario = usuario_repo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sem usuario com id em questao"));
        //busca o usuario a ser atualizado pelo id, se nao achar lança exceção
        usuario.setEmail(dto.getEmail());//seta o email
        usuario.setSenha(hash_pass.encode(dto.getSenha()));//seta a senha hasheada

        Usuario updated=usuario_repo.save(usuario); //salva no banco sobrescrevendo


        return mapper.toResponse(updated); 
    }









                                                            //retornar todos usuarios
    public List<respostaUsuarioDTO> listarUsuarios(){
        return mapper.toResponseList(usuario_repo.findAll());
        //o findAll vai retornar a lista de objeto usuarios, e o mapper vai converter
        //numa lista de resposta de usuarios (sem a senha)
    }    


    

                                                        //buscar um usuario por id ou por email
    public respostaUsuarioDTO listarUsuarioId(Long id){
        Usuario usuario = usuario_repo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sem usuario com id em questao"));
        return mapper.toResponse(usuario);
    }  

    public respostaUsuarioDTO listarUsuarioEmail(String email){
        Usuario usuario = usuario_repo.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("Sem usuario com email em questao"));
        return mapper.toResponse(usuario);
    }    







                                                // Deletar por id ou por email

    public void deletarUsuarioId(Long id){
        Usuario morto = usuario_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Sem usuario com id em questao"));
        //busca o usuario a deletar pelo id, se nao achar lança a exceção
        usuario_repo.delete(morto);;
    }  


    public void deletarUsuarioEmail(String email){
        Usuario morto = usuario_repo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Sem usuario com id em questao"));
        //busca o usuario a deletar pelo email, se nao achar lança a exceção
        usuario_repo.delete(morto);;
    }  





}
