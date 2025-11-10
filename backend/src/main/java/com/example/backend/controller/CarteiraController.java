package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.CarteiraDTO;
import com.example.backend.forms.CarteiraForm;
import com.example.backend.forms.CarteiraUpdateForm;
import com.example.backend.services.CarteiraService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/carteira")
public class CarteiraController 
{
    @Autowired
    CarteiraService carteiraService;

    @PostMapping("/{userId}")
    public ResponseEntity<Object> criarCarteira(@PathVariable Long userId,@Valid @RequestBody CarteiraForm carteira)
    {   
        try
        {
            CarteiraDTO resp = carteiraService.criarCarteira(carteira, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }




    @GetMapping("/{userId}")
    public ResponseEntity<List<CarteiraDTO>> buscarCarteiras(@PathVariable Long userId)
    {
        List<CarteiraDTO> resp = carteiraService.buscarCarteiras(userId);

        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }



    @PutMapping("/{carteiraId}")
    public ResponseEntity<CarteiraDTO> editarCarteira(@PathVariable Long carteiraId, @RequestBody CarteiraUpdateForm form)
    {
        try
        {
 
            CarteiraDTO resp = carteiraService.atualizarCarteira(form, carteiraId);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }   
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @DeleteMapping("/{carteiraId}")
    public ResponseEntity<String> deletarCarteira(@PathVariable Long carteiraId)
    {
        carteiraService.apagarCarteira(carteiraId);
        return ResponseEntity.status(HttpStatus.OK).body("Carteira apagada com sucesso");
    }






}
