import pandas as pd
import re

sql_df = pd.read_csv(
    "../datasets/sql_injection_samples.csv", encoding="latin1"
)

SQL_PATTERNS = (
    sql_df.iloc[:,0]
    .dropna()
    .astype(str)
    .tolist()
)

def detect_sql_injection(text):

    text = text.lower()

    for pattern in SQL_PATTERNS:

        pattern = str(pattern).lower()

        try:

            if re.search(
                re.escape(pattern),
                text
            ):

                return True

        except:
            continue

    return False