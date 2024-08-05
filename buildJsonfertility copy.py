import csv
import json

def read_csv(file_path):
    """Reads a CSV file and returns a list of lists."""
    with open(file_path, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        data = list(csv_reader)
    return data

# Example usage
file_path = 'children-per-woman-un.csv'
data = read_csv(file_path)
# build array of arrays
'''[[2.2, 2.19...],// andorra over the years
    [],
    ...
...]'''
fullDict = {}# code : array of touples (year, number)
for i in range(1,18723):
    if data[i][1] != "":
        if data[i][1] not in fullDict:
            fullDict[data[i][1]] = []
        fullDict[data[i][1]].append([data[i][2], data[i][3]])
'''
max = 10
for i in fullDict:
    if max <0:
        break
    print(i, fullDict[i])
    max += 1
'''

def write_dict_to_file_as_json(dictionary, filename):
  """Writes a dictionary to a text file as JSON."""
  with open(filename, 'w') as f:
    json.dump(dictionary, f, indent=4)

write_dict_to_file_as_json(fullDict, 'my_dict.json')
