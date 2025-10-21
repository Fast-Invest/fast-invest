package com.example.backend.config;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig 
{
    //http://localhost:8080/swagger-ui/index.html/
    @Bean
    public OpenAPI customOpenAPI()
    {
        return new OpenAPI()
                            .info(new Info()
                                  .title("API Backend - Fast Invest")
                                  .version("v0.3")
                                  .description("Documentação da API com swagger ui"));
    }
}
