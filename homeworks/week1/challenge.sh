#!/bin/sh

for ((i=1; i<=$1; i++))
do
	touch "$i.js";
	echo "$i.js 檔案建立完成";
done
	echo "共$1個檔案建立完成🥳"
