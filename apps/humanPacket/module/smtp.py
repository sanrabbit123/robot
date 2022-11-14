import smtplib
from pathlib import Path
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from email import encoders
from json import dumps

sendTo = "____sendTo____"
subject = "____subject____"
message = """
____html____
"""
files = []

id = "____id____"
pwd = "____pwd____"

try:
    msg = MIMEMultipart()
    msg["From"] = id
    msg["To"] = sendTo
    msg["Date"] = formatdate(localtime=True)
    msg["Subject"] = subject

    msg.attach(MIMEText(message, "html"))

    for path in files:
        part = MIMEBase("application", "octet-stream")
        with open(path, "rb") as file:
            part.set_payload(file.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", "attachment; filename={}".format(Path(path).name))
        msg.attach(part)

    smtp = smtplib.SMTP("____host____", ____port____)
    smtp.starttls()
    smtp.login(id, pwd)
    smtp.sendmail(id, sendTo, msg.as_string())
    smtp.quit()

    print(dumps({ "message": "success" }))
except Exception as e:
    print(dumps({ "message": "error" }))
