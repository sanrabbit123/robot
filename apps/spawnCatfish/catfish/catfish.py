from tools.basicTools import *

(start_year, start_month, start_date) = 2020, 12, 1
(end_year, end_month, end_date)       = 2020, 12, 7

users = read((start_year, start_month, start_date), (end_year, end_month, end_date))
result = query("SELECT * FROM client LIMIT 3;")

def tuple_toString(tp):
    return 0

def consulting_complex(users, inner, toSheets=False):
    return 0


#-----------------------------------------------------------------------------------------------------------------------------
