def calculate_risk(
    sql_hits,
    sensitive_hits,
    ml_result
):

    score = 0
    score += sql_hits * 60
    score += len(sensitive_hits) * 25

    if ml_result["is_attack"]:
        ml_score = int(
            ml_result["score"] **20 *100
        )
        score += int(
            ml_score 
        )

    score = min(score, 100)

    if score >= 80:
        action = "BLOCKED"
    elif score >= 50:
        action = "FLAGGED"
    else:
        action = "SAFE"

    return score, action