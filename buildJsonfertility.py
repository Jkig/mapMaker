import csv

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
finalNumbers = []
finalCodes = []
lastCode = None
intermediate = []
for i in range(1,18723):
    if data[i][1] != "":
        # there is a country code
        if lastCode == data[i][1]:
            intermediate.append(data[i][3])
        else:
            if lastCode != None:
                finalNumbers.append(intermediate)
                finalCodes.append(lastCode)
            lastCode = data[i][1]
            intermediate = [data[i][3]]

    else:
        if lastCode != None:
            finalNumbers.append(intermediate)
            finalCodes.append(lastCode)
        lastCode = None

finalNumbers.append(intermediate)
finalCodes.append(lastCode)
# data goes from 1950 - 2023
for i in finalNumbers:
    if len(i) != 74:
        print("Data has missing values")
for i in range(100,len(finalNumbers)):
    print(finalNumbers[i], ", \n", end="")
for i in range(10):
    print()
# print(finalNumbers)