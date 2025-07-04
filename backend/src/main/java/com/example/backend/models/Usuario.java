package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Id;
import java.util.List;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data//gera getters, setters, toString, equals e hashCode
@Entity
@AllArgsConstructor//cria construtor com todos argumentos
@NoArgsConstructor//cria construtor sem argumentos
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //isso daqui diz que é auto increment
    private long id;
    private String nome;
    private String email;
    private String senha;

    @OneToMany(mappedBy="usuarios") //relação com a tabela carteira
    private List<Carteira> carteiras;
}
