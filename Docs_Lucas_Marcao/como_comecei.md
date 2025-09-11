Primeiro de tudo pensei em criar o BD com a ferramenta PostGressSQL:

nome do bd -> Appmoove_pets_teste.

table pets{
id (UUID)
name (VARCHAR)
species (ENUM ou CHECK: 'dog' | 'cat' )
breed (VARCHAR)
age_years (INT)
shelter_city (VARCHAR)
shelter_lat (DECIMAL(10,7))
shelter_lng (DECIMAL(10,7))
status (ENUM/CHECK: 'available' | 'adopted' , default 'available' )
created_at (TIMESTAMP, default now)
}

meus detalhes:
