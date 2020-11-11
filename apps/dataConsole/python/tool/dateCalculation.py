import time
import calendar
from json import dumps

class DateCalculation:

    def __init__(self, length):
        self.length = length
        self.today = time.strftime('%Y-%m-%d', time.localtime(time.time()))
        tempArr = self.today.split("-")
        self.todayArr = []
        for i in tempArr:
            self.todayArr.append(int(i))

    def monthAgo(self):
        year = self.todayArr[0]
        month = self.todayArr[1]
        day = self.todayArr[2]

        monthTargets = []
        for i in range(self.length):
            if ((month - i) % 12) != 0:
                monthTargets.append({ "year": year + ((month - i) // 12), "month": (month - i) % 12 })
            else:
                monthTargets.append({ "year": year + ((month - i) // 12) - 1, "month": 12 })

        targets = []
        for dic in monthTargets:
            result = calendar.monthrange(dic["year"], dic["month"])
            targets.append({ "year": dic["year"], "month": dic["month"], "startDay": result[0], "lastDate": result[1] })

        return targets

    def getDateMatrix(self):
        dateMatrix = []
        targetArr = self.monthAgo()
        for dic in targetArr:
            dateMatrixfator = []
            leftDates = dic["lastDate"] - (7 - dic["startDay"])
            weeks = leftDates // 7
            weekLeft = leftDates % 7
            firstWeek = []
            for i in range(dic["lastDate"] - weekLeft - (weeks * 7)):
                firstWeek.append(i + 1)
            dateMatrixfator.append(firstWeek)
            for i in range(weeks):
                temp = list(range((firstWeek[firstWeek.__len__() - 1] + 1 + (i * 7)), (firstWeek[firstWeek.__len__() - 1] + 1 + ((i + 1) * 7))))
                dateMatrixfator.append(temp)
            lastweek = []
            for i in range(weekLeft):
                lastweek.insert(0, (dic["lastDate"] - i))
            if lastweek.__len__() != 0:
                dateMatrixfator.append(lastweek)
            dateMatrix.append(dateMatrixfator)

        return dateMatrix
