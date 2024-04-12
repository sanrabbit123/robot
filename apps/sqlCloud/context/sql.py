from apps.sqlCloud.context.tools import *

sqlStatement = "SELECT name, phone, cliid FROM client LIMIT 10;"

rows = query(sqlStatement)
print(rows)
sheets(rows)
