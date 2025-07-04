package com.example.backend.repositories;


import com.example.backend.models.*;


import org.springframework.data.jpa.repository.JpaRepository;

//ao herdar de jpa repository ele herda os metodos save,update,delete,find,etc...
public interface UsuarioRepo extends JpaRepository<Usuario, Long>{}