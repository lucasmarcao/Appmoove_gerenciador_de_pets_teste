-- CREATE DATABASE "Appmoove_pets_teste"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- COMMENT ON DATABASE "Appmoove_pets_teste"
--     IS 'BD especial pra meu estagio na appmoove';

-- Database: Appmoove_pets_teste

-------------------------------------------------
-- DROP DATABASE IF EXISTS "Appmoove_pets_teste";

CREATE DATABASE "Appmoove_pets_teste"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- COMMENT ON DATABASE "Appmoove_pets_teste"
--     IS 'BD especial pra meu estagio na appmoove';

-- criando tabela
-- Criação da tabela 'pets' com restrições de validação e valores padrão
CREATE TABLE pets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -- Gera UUID automaticamente
    name VARCHAR(100) NOT NULL,  -- Nome do pet (obrigatório)
    species VARCHAR(3) CHECK (species IN ('dog', 'cat')) NOT NULL,  -- Espécie: apenas 'dog' ou 'cat'
    breed VARCHAR(100) NOT NULL,  -- Raça do pet
    age_years INT CHECK (age_years >= 0),  -- Idade em anos (não negativa)
    shelter_city VARCHAR(100) NOT NULL,  -- Cidade do abrigo
    shelter_lat DECIMAL(10, 7) NOT NULL,  -- Latitude com precisão de 7 casas decimais
    shelter_lng DECIMAL(10, 7) NOT NULL,  -- Longitude com precisão de 7 casas decimais
    status VARCHAR(10) CHECK (status IN ('available', 'adopted')) DEFAULT 'available',  -- Status padrão: 'available'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de criação automática
);

-- Inserção de múltiplos pets em um único comando
INSERT INTO pets (name, species, breed, age_years, shelter_city, shelter_lat, shelter_lng, status)
VALUES
    ('Rex', 'dog', 'Labrador', 3, 'São Paulo', -23.550520, -46.633308, 'available'),
    ('Mimi', 'cat', 'Siamese', 2, 'Rio de Janeiro', -22.906847, -43.172896, 'available'),
    ('Buddy', 'dog', 'Golden Retriever', 5, 'Belo Horizonte', -19.919052, -43.938668, 'adopted'),
    ('Luna', 'cat', 'Persian', 1, 'Curitiba', -25.428954, -49.267137, 'available');

-- Altera o status do pet 'Rex' para 'adopted'
UPDATE pets
SET status = 'adopted'
WHERE name = 'Rex';  -- Condicional específica para evitar atualizações acidentais:cite[3]:cite[8]

-- Seleciona todos os pets com status 'available'
SELECT id, name, species, breed, age_years, shelter_city, status
FROM pets
WHERE status = 'available'
ORDER BY created_at DESC;  
-- Ordena por data de criação (mais recentes primeiro):cite[7]

-- Filtra apenas gatos ('cat')
SELECT name, breed, age_years, shelter_city
FROM pets
WHERE species = 'cat';


-- Exclui o pet 'Buddy' (já adotado)
DELETE FROM pets
WHERE name = 'Buddy' AND status = 'adopted';  
-- Condicional para segurança:cite[5]:cite[10]
