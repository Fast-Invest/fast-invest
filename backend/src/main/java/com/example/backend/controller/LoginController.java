package com.example.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.services.JwtService;
import com.example.backend.services.LoginService;
import com.example.backend.utils.CookieUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.exceptions.TokenInvalido;
import com.example.backend.forms.LoginForm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;



@Tag(name="Autenticação", description = "endpoints para autenticação de usuarios")
@RestController
@Validated
@RequestMapping("/auth")
public class LoginController 
{
    
    @Value("${jwt.access-expiration-ms}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-expiration-ms}")
    private long refreshTokenExpiration;

    @Autowired
    private LoginService loginService;

    @Autowired
    private CookieUtils cookieUtils;

    @Autowired
    private CookieCsrfTokenRepository csrfTokenRepository;

    private final JwtService jwtService;

    public LoginController(JwtService jwtService){
        this.jwtService=jwtService;
    }
   

    @Operation(summary = "Faz o login do usuário")
    @ApiResponse(responseCode ="200", description = "Usuario encontrado com sucesso")
    @ApiResponse(responseCode ="400", description = "Usuario envio credenciais invalidas")
    @PostMapping("/login") //Metodo POST
    public ResponseEntity<UsuarioDTO> logar(@RequestBody @Valid LoginForm form,HttpServletResponse response,HttpServletRequest request)
    {    
        UsuarioDTO resp  = loginService.logar_usuario(form); //recebe o usuario, o logar usuario ja checa a senha tbm. Em caso de usuario não encontrado retorna null
        if (resp==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        
        // Cria os tokens jwt com identity=email e um token csrf com UUID aleatorio
        String accessToken = jwtService.criarTokenAcesso(resp.getEmail());
        String refreshToken = jwtService.criarTokenRefresh(resp.getEmail());

        // Adiciona os cookies na resposta
        cookieUtils.adicionarCookie(response, true,"ACCESS-TOKEN" ,accessToken, accessTokenExpiration);
        cookieUtils.adicionarCookie(response, true,"REFRESH-TOKEN" ,refreshToken, refreshTokenExpiration);
        CsrfToken csrfToken = csrfTokenRepository.generateToken(request);
        csrfTokenRepository.saveToken(csrfToken, request, response);
        
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
        
    


    @Operation(summary = "Reseta os tokens jwt e csrf do usuario")
    @ApiResponse(responseCode ="200", description = "Token resetado com sucesso")
    @ApiResponse(responseCode ="401", description = "Sem permissão pois o token está invalido ou expirado")
    @PostMapping("/refresh") //Metodo POST
    public ResponseEntity<String> refresh(@CookieValue(name = "REFRESH-TOKEN", defaultValue = "") String refreshToken,HttpServletResponse response,HttpServletRequest request)
    {   
        // Se o token estiver vazio ou não presente retorna 401, não autorizado
        if (refreshToken.isBlank()){throw new TokenInvalido("Token expirado ou invalido");}

        String email = jwtService.validarTokenRefresh(refreshToken);

        // Se não conseguir extrair a identity do token retorna 401, não autorizado
        if(email == null){throw new TokenInvalido("Token expirado ou invalido");}

        // Recria os cookies
        String novoAccessToken = jwtService.criarTokenAcesso(email);
        String novoRefreshToken = jwtService.criarTokenRefresh(email);

        // E os adiciona na resposta
        cookieUtils.adicionarCookie(response, true,"ACCESS-TOKEN" ,novoAccessToken, accessTokenExpiration);
        cookieUtils.adicionarCookie(response, true,"REFRESH-TOKEN" ,novoRefreshToken, refreshTokenExpiration);

        CsrfToken csrfToken = csrfTokenRepository.generateToken(request);
        csrfTokenRepository.saveToken(csrfToken, request, response);

        return ResponseEntity.status(HttpStatus.OK).body("Refresh realizado com sucesso");
    }


    @Operation(summary = "Realiza o logout do usuario")
    @ApiResponse(responseCode = "200", description = "Retira os cookies e assim desloga o usuario")
    @PostMapping("/logout") //Metodo POST
    public ResponseEntity<String> sair(HttpServletResponse response)
    {   
        // Deleta os cookies
        cookieUtils.deletarCookie(response, "ACCESS-TOKEN");
        cookieUtils.deletarCookie(response, "REFRESH-TOKEN");
        cookieUtils.deletarCookie(response,  "XSRF-TOKEN");

        return ResponseEntity.status(HttpStatus.OK).body("Logout realizado com sucesso");
    }








}