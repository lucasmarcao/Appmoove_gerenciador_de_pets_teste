-- Database: Appmoove_pets_teste

-- DROP DATABASE IF EXISTS "Appmoove_pets_teste";

-- CREATE DATABASE "Appmoove_pets_teste"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'Portuguese_Brazil.1252'
--     LC_CTYPE = 'Portuguese_Brazil.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- COMMENT ON DATABASE "Appmoove_pets_teste"
--     IS 'BD especial pra meu estagio na appmoove';

-- criando tabela
-- Criação da tabela 'pets' com restrições de validação e valores padrão
-- CREATE TABLE pets (
--     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -- Gera UUID automaticamente
--     name VARCHAR(100) NOT NULL,  -- Nome do pet (obrigatório)
--     species VARCHAR(3) CHECK (species IN ('dog', 'cat')) NOT NULL,  -- Espécie: apenas 'dog' ou 'cat'
--     breed VARCHAR(100) NOT NULL,  -- Raça do pet
--     age_years INT CHECK (age_years >= 0),  -- Idade em anos (não negativa)
--     shelter_city VARCHAR(100) NOT NULL,  -- Cidade do abrigo
--     shelter_lat DECIMAL(10, 7) NOT NULL,  -- Latitude com precisão de 7 casas decimais
--     shelter_lng DECIMAL(10, 7) NOT NULL,  -- Longitude com precisão de 7 casas decimais
--     status VARCHAR(10) CHECK (status IN ('available', 'adopted')) DEFAULT 'available',  -- Status padrão: 'available'
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de criação automática
-- );

-- Inserção de múltiplos pets em um único comando
-- INSERT INTO pets (name, species, breed, age_years, shelter_city, shelter_lat, shelter_lng, status)
-- VALUES
--     ('Rex', 'dog', 'Labrador', 3, 'São Paulo', -23.550520, -46.633308, 'available'),
--     ('Mimi', 'cat', 'Siamese', 2, 'Rio de Janeiro', -22.906847, -43.172896, 'available'),
--     ('Buddy', 'dog', 'Golden Retriever', 5, 'Belo Horizonte', -19.919052, -43.938668, 'adopted'),
--     ('Luna', 'cat', 'Persian', 1, 'Curitiba', -25.428954, -49.267137, 'available');

-- mais uma insercao saudavel pra testes:
-- Inserção de múltiplos pets em um único comando
-- INSERT INTO pets (name, species, breed, age_years, shelter_city, shelter_lat, shelter_lng, status)
-- VALUES
--     ('Thor', 'dog', 'Pastor Alemão', 4, 'São Paulo', -23.550520, -46.633308, 'available'),
--     ('Mel', 'cat', 'Persian', 2, 'Rio de Janeiro', -22.906847, -43.172896, 'adopted'),
--     ('Bob', 'dog', 'Bulldog Francês', 5, 'Belo Horizonte', -19.919052, -43.938668, 'available'),
--     ('Nina', 'cat', 'Siamese', 1, 'Curitiba', -25.428954, -49.267137, 'available'),
--     ('Max', 'dog', 'Golden Retriever', 6, 'Porto Alegre', -30.034647, -51.217658, 'adopted'),
--     ('Lola', 'cat', 'Maine Coon', 3, 'Florianópolis', -27.594870, -48.548222, 'available'),
--     ('Fred', 'dog', 'Beagle', 2, 'Recife', -8.047562, -34.877001, 'available'),
--     ('Maya', 'cat', 'Bengal', 4, 'Fortaleza', -3.731862, -38.526669, 'adopted'),
--     ('Zeus', 'dog', 'Rottweiler', 7, 'Manaus', -3.119028, -60.021731, 'available'),
--     ('Luna', 'cat', 'British Shorthair', 5, 'Belém', -1.455754, -48.490179, 'available'),
--     ('Spike', 'dog', 'Boxer', 3, 'Goiânia', -16.686891, -49.264794, 'adopted'),
--     ('Mimi', 'cat', 'Sphynx', 2, 'Natal', -5.794480, -35.211000, 'available'),
--     ('Apolo', 'dog', 'Doberman', 4, 'Campo Grande', -20.469710, -54.620000, 'available'),
--     ('Jade', 'cat', 'Ragdoll', 1, 'João Pessoa', -7.115320, -34.861000, 'adopted'),
--     ('Toby', 'dog', 'Shih Tzu', 8, 'Aracaju', -10.947247, -37.073082, 'available'),
--     ('Amora', 'cat', 'Chartreux', 3, 'Maceió', -9.665991, -35.735001, 'available'),
--     ('Rex', 'dog', 'Husky Siberiano', 5, 'Palmas', -10.184000, -48.333000, 'adopted'),
--     ('Bela', 'cat', 'American Shorthair', 4, 'Vitória', -20.315500, -40.312800, 'available'),
--     ('Chico', 'dog', 'Cocker Spaniel', 6, 'Cuiabá', -15.601000, -56.097000, 'available'),
--     ('Fiona', 'cat', 'Oriental Shorthair', 2, 'Teresina', -5.089170, -42.801940, 'adopted');



-- Altera o status do pet 'Rex' para 'adopted'
-- UPDATE pets
-- SET status = 'adopted'
-- WHERE name = 'Rex';  -- Condicional específica para evitar atualizações acidentais:cite[3]:cite[8]

-- Seleciona todos os pets com status 'available'
SELECT id, name, species, breed, age_years, shelter_city, status
FROM pets
-- WHERE status = 'available'
ORDER BY created_at DESC;  
-- Ordena por data de criação (mais recentes primeiro):cite[7]

-- Filtra apenas gatos ('cat')
-- SELECT name, breed, age_years, shelter_city
-- FROM pets
-- WHERE species = 'cat';


-- Exclui o pet 'Buddy' (já adotado)
-- DELETE FROM pets
-- WHERE name = 'Buddy' AND status = 'adopted';  
-- Condicional para segurança:cite[5]:cite[10]

