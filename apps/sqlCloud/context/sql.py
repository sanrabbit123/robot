from apps.sqlCloud.context.tools import *

sqlStatement = '''

SELECT client.name, client.cliid, project.remainConsumer FROM client JOIN project ON client.cliid = project.cliid WHERE client.timeline BETWEEN "2024-03-01" AND "2024-03-10" AND client.status REGEXP "진행";

'''

rows = query(sqlStatement)
sheets(rows)


