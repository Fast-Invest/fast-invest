package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dados_perfil_empresa")
public class DadosPerfilEmpresa 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String symbol;

    @Column(columnDefinition = "TEXT")
    private String address1;

    @Column(columnDefinition = "TEXT")
    private String address2;

    @Column(columnDefinition = "TEXT")
    private String address3;

    @Column(columnDefinition = "TEXT")
    private String city;

    @Column(columnDefinition = "TEXT")
    private String state;

    @Column(columnDefinition = "TEXT")
    private String zip;

    @Column(columnDefinition = "TEXT")
    private String country;

    @Column(columnDefinition = "TEXT")
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String fax;

    @Column(columnDefinition = "TEXT")
    private String website;

    @Column(columnDefinition = "TEXT")
    private String industry;

    @Column(columnDefinition = "TEXT")
    private String industryKey;

    @Column(columnDefinition = "TEXT")
    private String industryDisp;

    @Column(columnDefinition = "TEXT")
    private String sector;

    @Column(columnDefinition = "TEXT")
    private String sectorKey;

    @Column(columnDefinition = "TEXT")
    private String sectorDisp;

    @Column(columnDefinition = "TEXT")
    private String longBusinessSummary;

    private Long fullTimeEmployees;

    @Column(columnDefinition = "TEXT")
    private String twitter;

    @Column(columnDefinition = "TEXT")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String startDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String updatedAt;
}
