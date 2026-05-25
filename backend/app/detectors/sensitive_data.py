import re

API_KEY_REGEX = r'AKIA[0-9A-Z]{16}'

EMAIL_REGEX = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'

def detect_sensitive_data(text: str):

    findings = []

    if re.search(API_KEY_REGEX, text):
        findings.append("AWS API Key")

    if re.search(EMAIL_REGEX, text):
        findings.append("Email Address")

    return findings