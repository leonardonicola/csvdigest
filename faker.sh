#!/bin/bash 

# Número de linhas no arquivo CSV
num_linhas=10000

# Cabeçalho do arquivo CSV
echo "id,name,job" > arquivo.csv

# Loop para gerar linhas de dados fictícios
for ((i=1; i<=num_linhas; i++))
do
    id=$((1000 + $i))
    name="Nome_$i"
    # Lista de empregos fictícios
    jobs=("Engenheiro" "Designer" "Desenvolvedor" "Gerente" "Analista" "Professor" "Artista" "Consultor" "Médico" "Advogado")
    # Selecionar aleatoriamente um emprego da lista
    job=${jobs[$RANDOM % ${#jobs[@]}]}
    echo "$id,$name,$job" >> arquivo.csv
done

mv arquivo.csv fixtures/

echo "Arquivo CSV gerado com sucesso!"
