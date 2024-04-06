from apps.devContext.tools import *

rows = query("SELECT * FROM client;")
sheets(rows)
