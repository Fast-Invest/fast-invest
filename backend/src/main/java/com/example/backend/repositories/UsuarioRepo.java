package com.example.backend.repositories;


import com.example.backend.models.*;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

//ao herdar de jpa repository ele herda os metodos save,update,delete,find,etc...
@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Long>{
  Optional<Usuario> findByEmail(String email);

}