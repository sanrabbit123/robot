from tools.basicTools import *

(start_year, start_month, start_date) = 2020, 12, 1
(end_year, end_month, end_date)       = 2020, 12, 7

users = readData((start_year, start_month, start_date), (end_year, end_month, end_date))
query_result = query("SELECT * FROM client LIMIT 10;")

#-----------------------------------------------------------------------------------------------------------------------------

view(query_result)
