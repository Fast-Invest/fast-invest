--    ---------------------------------------------------- UTF-8 como codificação ----------------------------------------------------------------    --                   
set names utf8mb4 collate utf8mb4_unicode_ci;

--    ---------------------------------------------------- Criação e uso do banco ----------------------------------------------------------------    --                   
-- drop database fastinvest;
create database if not exists fastinvest;
use fastinvest;


--    ----------------------------------------------------- Criação das tabelas ------------------------------------------------------------------    --                   
create table usuarios(
						id bigint primary key auto_increment,
                        email varchar(255) not null unique,
                        nome varchar(255) not null,
                        senha varchar(255) not null 
					 ) engine=InnoDB default charset=utf8mb4;

create table carteiras(
						id bigint primary key auto_increment,
                        data datetime not null,
                        usuario_id bigint not null,
                        constraint carteira_FK_intId foreign key(usuario_id) references usuarios(id)
					  ) engine=InnoDB default charset=utf8mb4;
create table filtros(
					   id bigint primary key auto_increment,
                       tipo varchar(100) not null,
                       valorMin double not null,
                       valorMax double not null,
                       carteira_id bigint not null,
                       constraint filtro_FK_intId foreign key(carteira_id) references carteiras(id)
					) engine=InnoDB default charset=utf8mb4;
                    
--    ----------------------------------------------------- Selects preparados ------------------------------------------------------------------    --                   

-- Busca todos usuarios cadastrados
select * from usuarios;

-- Busca todas carteiras cadastradas
select * from carteiras;

-- Busca todos filtros cadastrados
select * from filtros;

-- Busca unindo usuarios e filtros
select * from usuarios as us 
							join carteiras as ca on  us.id=ca.usuario_id;

-- Busca unindo carteiras e filtros                      
select * from carteiras as ca 
							join filtros as fi on  ca.id=fi.carteira_id;

-- Busca unindo tudo                            
select * from usuarios as us 
							join carteiras as ca on us.id=ca.usuario_id 
                            join filtros as fi on ca.id=fi.carteira_id;
                    