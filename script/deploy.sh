# 本番環境デプロイ時に実行するスクリプト
start=$(date "+%Y/%m/%d-%H:%M:%S")
echo "deploy.sh start. ${start}"

# webpackで各種ファイルのバンドリング
# 環境変数NODE_ENVを作成、値を設定することでソースマップを作成させないようにする
echo "run webpack..."
NODE_ENV=production webpack --mode production

# srcディレクトリの削除
echo "removing **src** directory..."
rm -rf src

end=$(date "+%Y/%m/%d-%H%M%S")
echo "deploy.sh successfull. ${end}"
