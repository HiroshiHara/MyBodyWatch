# 本番環境デプロイ時に実行するスクリプト
start=$(date "+%Y/%m/%d-%H:%M:%S")
echo "deploy.sh start. ${start}"

# webpackで各種ファイルのバンドリング
echo "run webpack..."
webpack --mode production

# srcディレクトリの削除
echo "removing **src** directory..."
rm -rf src

end=$(date "+%Y/%m/%d-%H%M%S")
echo "deploy.sh successfull. ${end}"
