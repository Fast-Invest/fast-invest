package com.example.backend.services;
import org.mapstruct.Mapper;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.models.Usuario;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

  //converte um DTO de criação na entidade que será salva no banco
  Usuario toEntity(UsuarioDTO dto);

  //converte a entidade usuario para o DTO de usuario de resposta
  respostaUsuarioDTO toResponse(Usuario usuario);

  //converte uma lista de entidades usuario em uma lista de DTO de resposta 
  List<respostaUsuarioDTO> toResponseList(List<Usuario> usuarios);
}