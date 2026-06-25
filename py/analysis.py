import pandas as pd
import sqlite3

# Create database
conn = sqlite3.connect('data/data.db')

# Read CSVs
pokemon = pd.read_csv('data/pokemon.csv')
pokedex = pd.read_csv('data/pokedex.csv')

# Create tables
pokemon.to_sql('pokemon', conn, if_exists='replace', index=False)
pokedex.to_sql('pokedex', conn, if_exists='replace', index=False)

# SQL merge + clean dataset
query = """
SELECT *
FROM pokemon
LEFT JOIN pokedex
ON pokemon.Name LIKE '%' || pokedex.name || '%'
WHERE Generation < 5
    AND pokedex.name NOT LIKE '%Mega%'
    AND pokedex.name NOT LIKE '%Primal%'
ORDER BY pokedex_number
"""
df_clean = pd.read_sql(query, conn)

print(df_clean)