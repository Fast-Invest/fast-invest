# 👨🏻‍💻 Backend do Fast-Invest
## 💬 Sobre

O Fast Invest é uma aplicação web interativa voltada para investidores que desejam organizar, analisar e acompanhar seus investimentos de forma prática e personalizada.

A plataforma oferece ferramentas de filtragem, monitoramento e análise de ações, auxiliando o usuário a tomar decisões mais informadas e estratégicas no mercado financeiro.

## ✅ Dependências
### 🔑 Principais bibliotecas do projeto

### - <img align="center" alt= "Mysql" height="20" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg"> Spring Boot
> #### 
> #### - spring-boot-starter-web → Criação de APIs REST.
>
> #### - spring-boot-starter-data-jpa → Integração com banco de dados via JPA/Hibernate.
>
> #### - spring-boot-starter-validation → Validação de formulários e DTOs.
>
> #### - spring-boot-starter-security → Segurança da aplicação (autenticação/autorização).
>
> #### - spring-boot-starter-mail → Envio de e-mails (ex: recuperação de senha).
> #### 

### - 🔐 Segurança e Autenticação

> #### - spring-security-oauth2-jose → Criptografia e parsing de JWT.
> 
> #### - io.jsonwebtoken → Criação e validação de tokens JWT.

### - 🛢️ Banco de Dados

> #### - mysql:mysql-connector-j → Driver para MySQL.
> 
> #### - **(opcional)**: h2 para banco em memória nos testes.

### - 📈 Produtividade
>
> #### - lombok → Elimina boilerplate (getters, setters, construtores).
>
> #### - mapstruct → Mapeamento automático entre entidades e DTOs.

### - 📝 Documentação

> #### - springdoc-openapi-starter-webmvc-ui → Gera Swagger UI para testar a API.

### - </> Testes

> #### - spring-boot-starter-test → Framework de testes do Spring.
> 
> #### - junit-platform-launcher → Execução dos testes com JUnit 5.






---
## 🛠️ Comandos úteis do Gradle:


| Comandos | Função |
| ------ | ------ |
| `./gradlew clean` | Remove a pasta build/, limpando o projeto. |
| `./gradlew build` | Compila, roda os testes e gera os artefatos (.jar). |
| `./gradlew bootRun` | roda a aplicação. | 
| `./gradlew bootJar` | gera o JAR final para deploy. | 
| `./gradle dependencies` | Lista todas as dependências do projeto. |
| `./gradlew build --refresh-dependencies` | Força o download de todas as dependências novamente e realiza a build |
| `./gradlew clean --refresh-dependencies` | Força o download de todas as dependências novamente e limpa a build |
| `./gradlew clean build` | Limpa a build e a realiza novamente |

---
## 🌳 Árvore do projeto
```
backend
├─ build.gradle
├─ settings.gradle
├─ dockerfile
└─ src
   ├─ main
   │  ├─ java/com/example/backend
   │  │  ├─ BackendApplication.java
   │  │  ├─ config
   │  │  │  ├─ SecurityConfig.java
   │  │  │  └─ SwaggerConfig.java
   │  │  ├─ controller
   │  │  │  ├─ ExceptionsController.java
   │  │  │  ├─ LoginController.java
   │  │  │  ├─ ResetSenhaController.java
   │  │  │  └─ UsuarioController.java
   │  │  ├─ dto
   │  │  │  ├─ CarteiraDTO.java
   │  │  │  ├─ FiltrosCarteiraDTO.java
   │  │  │  └─ UsuarioDTO.java
   │  │  ├─ exceptions
   │  │  │  ├─ TokenExpirado.java
   │  │  │  ├─ TokenInvalido.java
   │  │  │  ├─ UsuariojaExiste.java
   │  │  │  └─ UsuarioNaoEncontrado.java
   │  │  ├─ forms
   │  │  │  ├─ EmailForm.java
   │  │  │  ├─ LoginForm.java
   │  │  │  ├─ ResetSenhaForm.java
   │  │  │  ├─ ResetTokenForm.java
   │  │  │  └─ UsuarioForm.java
   │  │  ├─ mappers
   │  │  │  ├─ UsuarioMapper.java
   │  │  │  └─ UsuarioMapperImpl.java
   │  │  ├─ models
   │  │  │  ├─ Carteira.java
   │  │  │  ├─ Filtro.java
   │  │  │  └─ Usuario.java
   │  │  ├─ repositories
   │  │  │  └─ UsuarioRepo.java
   │  │  ├─ security
   │  │  │  └─ JwtFilter.java
   │  │  ├─ services
   │  │  │  ├─ EmailService.java
   │  │  │  ├─ JwtService.java
   │  │  │  ├─ LoginService.java
   │  │  │  ├─ TokenService.java
   │  │  │  └─ UsuarioService.java
   │  │  └─ utils
   │  │     └─ CookieUtils.java
   │  └─ resources
   │     ├─ application.properties
   │     └─ static
   │        └─ emailTemplate.html
   └─ test/java/com/example/backend
      └─ BackendApplicationTests.java

```

---    
## 👥 Desenvolvedores do backend
| CARGO | PESSOA |
| ------ | ------ |
| DESENVOLVEDOR | [Matheus Santos Fonseca](https://github.com/Matheus-Santos-Fonseca)  |
| DESENVOLVEDOR | [Gustavo Luiz da Silva Procópio](https://github.com/GustavoProcopio27)|


