package com.example.backend.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data//gera getters, setters, toString, equals e hashCode
@Entity
@AllArgsConstructor//cria construtor com todos argumentos
@NoArgsConstructor//cria construtor sem argumentos
@Table(name="usuarios")
public class Usuario {

    @Id //diz que é o id da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY) //isso daqui diz que é auto increment
    private long id;

    @Column(nullable = false)//nao vazio
    private String nome;

    @Column(nullable = false,unique = true) //email unico, nao vazio
    private String email;

    @Column(nullable=false)//nao vazio
    private String senha;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true) // o orphan removal é que se apagar a carteira da lista e ter o usuario salva a carteira é apagada
    private List<Carteira> carteiras = new ArrayList<>();
}
