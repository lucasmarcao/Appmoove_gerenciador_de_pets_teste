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

Usei duas IAs principalmente, o Copilot e o Deepseek.

depois de cuidar do BD eu fui fazer os layouts do meu frontend no
figma, e deixei alguns prints na pasta /img , logo depois eu reutilizei
um projeto de rede social que eu tinha feito em springboot, assim o fazendo
bem rapido so faltava eu polir o backend e cuidar das APIs dog e cat.

O front eu tentei fazer a mesma coisa, porem o unico projeto parecido que eu tinha
era em JS e não em TS, então me custou bem mais tempo que o nescessario, tem muitas
coisas que foi a primeira vez que eu fiz, agradeço pela oportunidade do desafio !!!

valeu :)
