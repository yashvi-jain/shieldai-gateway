from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="protectai/deberta-v3-base-prompt-injection-v2"
    #model="./app/ml/shieldAI_model",
    #tokenizer="./app/ml/shieldAI_model"
)

def classify_prompt(text):

    result = classifier(text)[0]

    print(result)

    label = result["label"]
    score = result["score"]

    is_attack = (
        label == "INJECTION"
        and score > 0.8
    )

    return {
        "is_attack": is_attack,
        "label": label,
        "score": score
    }