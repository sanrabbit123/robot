from apps.sqlCloud.context.tools import *

sqlStatement = 'SELECT * FROM client WHERE naver = "155817"'

rows = query(sqlStatement)

cliidArr = []
for obj in rows["data"]:
    cliidArr.append(obj["client.cliid"])

cliidArr = list(set(cliidArr))

projectQuery = "SELECT * FROM project WHERE "
for cliid in cliidArr:
    projectQuery += "project.cliid = " + '"' + cliid + '"'
    projectQuery += " OR "

projectQuery = projectQuery[0:-4]

projectRows = query(projectQuery)
projectRows = projectRows["data"]

consoleLog(projectRows)



# querySheets(sqlStatement)

