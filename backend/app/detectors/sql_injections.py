import pandas as pd
import re
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
DATASET_PATH = os.path.join(BASE_DIR, "..", "..", "..", "datasets", "sql_regex.csv")

sql_df = pd.read_csv(DATASET_PATH)

SQL_PATTERNS = (
    sql_df["pattern"]
    .dropna()
    .astype(str)
    .tolist()
)

def detect_sql_injection(text):

    for pattern in SQL_PATTERNS:

        pattern = str(pattern).strip()

        try:
            if re.search(pattern, text, re.IGNORECASE):
                return True

        except:
            continue

    return False
