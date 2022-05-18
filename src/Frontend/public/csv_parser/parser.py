import pandas as pd

df = pd.read_csv(r"./funcs.csv", encoding="utf-8")
df.to_json(r"./funcs.json")

df = pd.read_csv(r"./projects.csv", encoding="utf-8")
df.to_json(r"./projects.json")