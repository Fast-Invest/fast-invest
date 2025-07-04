package com.example.backend.services;
import org.mapstruct.Mapper;

import com.example.backend.dto.createUsuarioDTO;
import com.example.backend.dto.respostaUsuarioDTO;
import com.example.backend.models.Usuario;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
  Usuario toEntity(createUsuarioDTO dto);

  respostaUsuarioDTO toResponse(Usuario usuario);
  List<respostaUsuarioDTO> toResponseList(List<Usuario> usuarios);
}