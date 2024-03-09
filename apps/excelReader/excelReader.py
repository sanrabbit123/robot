from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio
import pandas

class ExcelReader:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.defaultSheetsName = "Sheet1"

    def excelRead(self, filePath: str, sheetsName: str = None):
        result = pandas.read_excel(filePath, sheet_name=None)
        if sheetsName is None:
            if len(list(result.keys())) > 0:
                sheetsName = list(result.keys())[0]
            else:
                sheetsName = self.defaultSheetsName
        values = result[sheetsName].values.tolist()
        columns = result[sheetsName].columns.tolist()
        firstArr = []
        for i in columns:
            if type(i) is str:
                if patternTest(r"^Unnamed\: ", i):
                    firstArr.append("")
                else:
                    firstArr.append(i)
            else:
                firstArr.append(i)

        values.insert(0, columns)
        return values

    def convertDictList(self, matrix: list):
        if len(matrix) == 0 or len(matrix) == 1:
            raise Exception("input cannot be zero list")

        columns = matrix[0]
        values = matrix[1:]
        if type(columns) is not list:
            raise Exception("invalid matrix")

        result = []
        for arr in values:
            tempObj = {}
            for i in range(arr.__len__()):
                tempObj[columns[i]] = arr[i]
            result.append(tempObj)

        return result
        
    def excelWrite(self, matrix: list, filePath: str):
        if len(matrix) == 0:
            raise Exception("input cannot be zero list")
        if type(matrix[0]) is list:
            dataFrame = pandas.DataFrame(self.convertDictList(matrix))
        elif type(matrix[0] is dict):
            dataFrame = pandas.DataFrame(matrix)
        else:
            raise Exception("invalid input")
        writer = pandas.ExcelWriter(filePath, engine="xlsxwriter")
        defaultSheetsName = self.defaultSheetsName
        dataFrame.to_excel(writer, sheet_name=defaultSheetsName, index=False)
        writer.close()

        return { "message": "done" }

