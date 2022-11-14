# データベースに接続する。

## 参考記事
[【Node.js入門】PostgreSQLに接続してデータを操作するためのチュートリアル！](https://www.sejuku.net/blog/81358)


## 環境構築

npm install pg

sudo ufw allow 5432/tcp
sudo ufw status


sudo -u postgres psql
createuser --interactive
createdb yasudb

sudo nano /etc/postgresql/12/main/postgresql.conf
listen_addresses = '*' 

sudo nano /etc/postgresql/12/main/pg_hba.conf
host yasudb yasu 0.0.0.0/0 md5

psql
alter role yasu with password 'yasuyasu';

create table users (
  name varchar(100), 
  email varchar(100)
);



ダウンロード
D:\Python39\python.exe -m pip install pg




## 実行方法

node app.js

