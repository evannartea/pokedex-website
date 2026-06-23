# what in tarnation?
import pandas as pd 
from pandasql import sqldf

df = pd.read_csv("athlete_events.csv")

query = """
SELECT *
FROM df
GROUP BY Event
"""

print(sqldf(query))