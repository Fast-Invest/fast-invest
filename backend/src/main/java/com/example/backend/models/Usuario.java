package com.example.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//gera getters, setters, toString, equals e hashCode
@Entity
@AllArgsConstructor//cria construtor com todos argumentos
@NoArgsConstructor//cria construtor sem argumentos
@Table(name="usuarios")
public class Usuario {

    @Id //diz que é o id da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY) //isso daqui diz que é auto increment
    private Long id;

    @Column(nullable = false)//nao vazio
    private String nome;

    @Column(nullable = false,unique = true) //email unico, nao vazio
    private String email;

    @Column(nullable=false)//nao vazio
    private String senha;

    // Não faz muito sentido
    // @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true) 
    //    private List<Carteira> carteiras = new ArrayList<>();                                            
}
