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

proposalFeeKeyArr = [
    "project.proposalFee0",
    "project.proposalFee1",
    "project.proposalFee2",
    "project.proposalFee3",
    "project.proposalFee4",
    "project.proposalFee5",
    "project.proposalFee6",
    "project.proposalFee7",
    "project.proposalFee8",
    "project.proposalFee9",
]

allProposalFee = []
for obj in projectRows:
    for key in proposalFeeKeyArr:
        allProposalFee.append(obj[key])

allProposalFee = listFilter(allProposalFee, lambda x: x != 0)
proposalLength = len(allProposalFee)
proposalSum = listReduce(allProposalFee, lambda acc, curr: acc + curr, 0)

maxProposal = 0
minProposal = 9000000
for num in allProposalFee:
    if num >= maxProposal:
        maxProposal = num
    if num <= minProposal:
        minProposal = num

totalPyeongTong = []
for obj in projectRows:
    thisCliid = obj["project.cliid"]
    thisQuery = "SELECT client.pyeong FROM client WHERE client.cliid = '" + thisCliid + "';"
    thisResult = query(thisQuery)
    thisResult = thisResult["data"]
    if len(thisResult) > 0:
        thisPyeong = thisResult[0]["client.pyeong"]

        thisProposalFee = []
        for key in proposalFeeKeyArr:
            thisProposalFee.append(obj[key])
        thisProposalFee = listFilter(thisProposalFee, lambda x: x != 0)
        thisProposalFee = listMap(thisProposalFee, lambda x: int(x / thisPyeong))
        for fee in thisProposalFee:
            totalPyeongTong.append(fee)

totalPyeongAverage = int(listReduce(totalPyeongTong, lambda acc, curr: acc + curr, 0) / len(totalPyeongTong))

print(maxProposal)
print(minProposal)
print(int(proposalSum / proposalLength))
print(totalPyeongAverage)

