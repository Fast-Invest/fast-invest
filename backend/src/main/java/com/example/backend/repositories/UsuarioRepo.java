package com.example.backend.repositories;


import com.example.backend.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

//ao herdar de jpa repository ele herda os metodos save,update,delete,find,etc...
// os metodos criados aqui sao criados automaticamente se tu por o nome correto que o springboot entenda
@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Long>
{
  Optional<Usuario> findByEmail(String email); //cria um metodo de buscar por email
  boolean existsByEmail(String email);//cria um metodo para ver se o email existe
}