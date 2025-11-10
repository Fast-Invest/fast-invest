package com.example.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.dto.FiltrosCarteiraDTO;
import com.example.backend.forms.FiltroForm;
import com.example.backend.forms.FiltroUpdateForm;
import com.example.backend.models.Filtro;

@Mapper(componentModel = "spring")
public interface FiltroMapper 
{
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "carteira", ignore = true)
    Filtro toEntity(FiltroForm form);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "carteira", ignore = true)
    List<Filtro> toEntityList(List<FiltroForm> form);

    @Mapping(target = "carteira", ignore = true)
    Filtro toEntity(FiltroUpdateForm form);


    FiltrosCarteiraDTO toResponse(Filtro filtro);

    List<FiltrosCarteiraDTO> toResponseList(List<Filtro> filtro);


}
