import pandas as pd
import re

prompt_df = pd.read_csv(
    "../datasets/prompt_injection_samples.csv", encoding="latin1"
)

PROMPT_PATTERNS = (
    prompt_df.iloc[:,0]
    .dropna()
    .astype(str)
    .tolist()
)

def detect_prompt_injection(text):

    text = text.lower()

    for pattern in PROMPT_PATTERNS:

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