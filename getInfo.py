import json


with open('experience_data.json', 'r') as f:
    data = json.load(f)
    

def get_experience_data():
    return data