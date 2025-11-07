package com.example.backend.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dto.CarteiraDTO;
import com.example.backend.forms.CarteiraForm;
import com.example.backend.forms.CarteiraUpdateForm;
import com.example.backend.models.Carteira;

@Mapper(componentModel = "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses={FiltroMapper.class})
public interface CarteiraMapper 
{
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "filtros", ignore = true)
    Carteira toEntity(CarteiraForm carteira);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Carteira toEntity(CarteiraUpdateForm carteira);

    CarteiraDTO toResponse(Carteira carteira);

    List<CarteiraDTO> toResponseList(List<Carteira> carteiras);

}
