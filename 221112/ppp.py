import psycopg2

# 接続情報
dsn = "dbname=yasudb host=157.7.64.95 user=yasu password=yasuyasu"

conn = psycopg2.connect(dsn)  # コネクション
cur = conn.cursor()  # カーサー

cur.execute("select version()") # クエリの実行
print(cur.fetchone()) 

# コネクション等は閉じる。
cur.close()
conn.close()
