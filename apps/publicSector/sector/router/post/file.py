from router.mother import *
import json

async def postFile(request, mongoConnection):
    reader = await request.multipart()
    static = returnStaticFolder()["static"]
    field = await reader.next()
    while field != None:
        arr = field.name.split("/")
        staticCopied = static
        for i in range(arr.__len__()):
            staticCopied += "/" + arr[i]
            await shellExec([ "mkdir", staticCopied ])

        with open((static + "/" + "/".join(arr) + "/" + field.filename), "wb") as f:
            while True:
                chunk = await field.read_chunk()
                if not chunk:
                    break
                f.write(chunk)
        field = await reader.next()

    return { "message": "done" }

=> @routes.post("/file")
=> web.json_response(await postFile(request, mongoConnection))
