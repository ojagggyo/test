# #############################################
 未完成
# #############################################


# １日分の投稿後画像をまとめて、それを投稿する。

* 画像を作る
* 投稿する

## 問題対応
https://www.memory-lovers.blog/entry/2020/02/08/120000

新しいバージョンはNG
npm install sharp
npm install sharp@0.31.1

バージョンを下げるのOK
npm install sharp@0.23.2 


## 環境設定(開発)
npm install sharp 
npm install dsteem
npm install sync-request
npm install request
mkdir images

## 環境設定(本番)
sudo apt install npm
npm init
npm i

## 環境設定(PM2)
config.jsonにcategory、username、ポスティングキーを設定する
pm2 start app.js
pm2 status
pm2 log

## 実行
node app.js <username> <posting_key>


