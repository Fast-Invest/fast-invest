package com.example.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import java.util.List;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data//gera getters, setters, toString, equals e hashCode
@Entity
@AllArgsConstructor//cria construtor com todos argumentos
@NoArgsConstructor//cria construtor sem argumentos
@Table(name="usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //isso daqui diz que é auto increment
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable=false)
    private String senha;

    @OneToMany(mappedBy="usuarios") //relação com a tabela carteira
    private List<Carteira> carteiras;
}
