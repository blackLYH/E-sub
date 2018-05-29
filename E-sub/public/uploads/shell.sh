#!/bin/bash
sig=$1
declare -A arr
a=0
cd /root/lyh/E-sub/E-sub/public/uploads/subtitle/
for file in `ls`
do
    if echo "$file" | grep "$sig" &> /dev/null
    then
    let a+=1			
    arr[a]=$file
    else
	if [ -f $file ];
        then
                if cat "$file" | grep "$sig" > /dev/null
                then
                        let a+=1
                        arr[a]=$file
                fi

	fi
    fi
done
echo ${arr[@]}  
