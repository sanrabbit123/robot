from tools.basicTools import *

(start_year, start_month, start_date) = 2020, 12, 1
(end_year, end_month, end_date)       = 2020, 12, 7

users = read((start_year, start_month, start_date), (end_year, end_month, end_date))
result = query("SELECT * FROM client LIMIT 3;")

#-----------------------------------------------------------------------------------------------------------------------------


view(result)


sheets("SELECT * FROM client LIMIT 10;")
sheets(result)
