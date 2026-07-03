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

print(len(SQL_PATTERNS))
print(SQL_PATTERNS[:3])

test = "1' OR '1'='1' --"
for p in SQL_PATTERNS:
    try:
        if re.search(p, test, re.IGNORECASE):
            print("MATCHED:", p)
    except re.error as e:
        print("BAD PATTERN:", p, "->", e)