package com.example.backend.mappers;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.forms.UsuarioForm;
import com.example.backend.dto.UsuarioDTO;
import com.example.backend.models.Usuario;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper 
{

  //converte um form de criação na entidade que será salva no banco
  @Mapping(target = "id", ignore = true)
  Usuario toEntity(UsuarioForm form);

  //converte a entidade usuario para o DTO de usuario de resposta
  UsuarioDTO toResponse(Usuario usuario);

  //converte uma lista de entidades usuario em uma lista de DTO de resposta 
  List<UsuarioDTO> toResponseList(List<Usuario> usuarios);
}