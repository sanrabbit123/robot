from router.mother import *

def getBase(request, mongoConnection):
    result = f"""
    <!DOCTYPE html>
    <html lang="ko" dir="ltr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
            <title>{request.match_info['name']}</title>
            <style></style>
        </head>
        <body>
            <div id="totalcontents"></div>
            <script src='/publicSector/{request.match_info['name']}.js'></script>
        </body>
    </html>"""
    return result


=> @routes.get("/{name}")
=> web.Response(content_type="text/html", text=getBase(request, mongoConnection))
