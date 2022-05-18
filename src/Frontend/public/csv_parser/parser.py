import csv, json

#parser for EMPLOYEES ONLY
#import csv file and write a new json file
def employeeParser(dataFile):

    json = []

    #read csv and add data
    with open(dataFile, newline="", encoding="utf-8") as csvFile:
        dataReader = csv.reader(csvFile)
        for row in dataReader:
            transit = []
            temp = {}
            for i in row:
                transit.append(i)
            temp["id"] = transit[0]
            temp["full_name"] = transit[1]
            temp["job"] = transit[2]
            temp["specialty"] = transit[3]
            temp["legal_hours"] = transit[4]
            temp["total_hours"] = transit[5]
            temp["allocated_hours"] = transit[6]
            temp["outsourced"] = transit[7]
            temp["local"] = transit[8]
            json.append(temp)

    json.pop(0)
    return json

#parser for PROJECTS ONLY
#import csv file and write a new json file
def projectsParser(dataFile):

    json = []

    #read csv and add data
    with open(dataFile, newline="", encoding="utf-8") as csvFile:
        dataReader = csv.reader(csvFile)
        for row in dataReader:
            transit = []
            temp = {}
            for i in row:
                transit.append(i)
            temp["id"] = transit[0]
            temp["project_name"] = transit[1]
            temp["owner"] = transit[2]
            temp["begin_date"] = transit[3]
            temp["finish_date"] = transit[4]
            temp["id_employees"] = transit[5]
            temp["employees_allocated_hours"] = transit[6]
            temp["local"] = transit[7]
            json.append(temp)

    json.pop(0)
    return json

def createJson(jsonPath, data):

    with open(jsonPath, "w") as jsonFile:
        jsonFile.write(json.dumps(data))


createJson("./employees.json", employeeParser("./funcs.csv"))
createJson("./projects.json", projectsParser("./projects.csv"))