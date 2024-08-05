import csv
import json

def csv_to_json(csv_file, json_file):
  """Converts a CSV file to a JSON file."""
  data = []
  with open(csv_file, 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
      data.append(row)

  with open(json_file, 'w') as jsonfile:
    json.dump(data, jsonfile, indent=4)

# Example usage:
csv_file = 'land area.csv'
json_file = 'landArea.json'
csv_to_json(csv_file, json_file)
