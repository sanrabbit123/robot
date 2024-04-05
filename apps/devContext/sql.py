from apps.mother import *
from apps.infoObj import returnAddress
from apps.devContext.tools import *

address = returnAddress()

# ===================================================================================================================

rows = query("SELECT * FROM client;")
sheets(rows)
