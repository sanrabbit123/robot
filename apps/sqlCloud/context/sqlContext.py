from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio
import aiomysql

class SqlContext:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()

        localConnection = mongoConnection("local")

        self.mongo = localConnection
        self.mongolocal = localConnection

        self.dir = processCwd() + "/apps/sqlCloud"
        self.contextDir = self.dir + "/" + "context"
        self.targetFile = "sql.py"
        self.targetFilePath = self.contextDir + "/" + self.targetFile

        self.scriptName = "_____sqlLaunching_"

    async def launching(self) -> int:
        back = self.back
        mongo = self.mongo
        mongolocal = self.mongolocal
        try:

            humanString = await fileSystem("readString", [ processCwd() + "/human.py" ])
            initString = humanString.split("# python start")[0]
            initString = initString + "\n\n" + "from apps.mother import *\nfrom apps.sqlCloud.context.tools import *" 

            sqlString = await fileSystem("readString", [ self.targetFilePath ])
            sqlStringList = sqlString.split("\n")
            sqlString = "\n".join(sqlStringList[1:])
            sqlString = patternReplace(sqlString, r"query\(", "await query(", True)
            sqlString = patternReplace(sqlString, r"mysql\(", "await mysql(", True)
            sqlString = patternReplace(sqlString, r"sheets\(", "await sheets(", True)
            sqlString = patternReplace(sqlString, r"excel\(", "await excel(", True)
            sqlString = patternReplace(sqlString, r"write\(", "await write(", True)

            sqlStringList = sqlString.split("\n")
            sqlStringList = listMap(sqlStringList, lambda x: "    " + x)
            sqlString = "\n".join(sqlStringList)

            tempScript = initString + "\n\nasync def main():\n\n" + sqlString + "\n\n    return 0\n\n\n\nasyncio.run(main())"
            tempName = self.scriptName + uniqueValue("hex") + ".py"
            tempFile = processCwd() + "/" + tempName
            await fileSystem("writeString", [ tempFile, tempScript ])

            response = await shellExec("python3", [ tempFile ])
            if type(response) is str:
                print(response.strip())

            await shellExec("rm", [ "-rf", tempFile ])

            return 1
        except Exception as e:
            print(e)
            return 0