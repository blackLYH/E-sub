import urllib.request
import _thread
import json
from HandleJs import Py4Js

def  open_url(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
    req = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(req)
    data = response.read().decode('utf-8')
    return data


def translate(sl, rl, content, tk, lines, gof, g):
    if len(content) > 4891:
        print("翻译的长度超过限制！！！")
        return

    content = urllib.parse.quote(content)

    url = "http://translate.google.cn/translate_a/single?client=t" \
          "&sl="+sl+"&tl="+rl+"&hl="+rl+"&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca" \
          "&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&clearbtn=1&otf=1&pc=1" \
          "&srcrom=0&ssel=0&tsel=0&kc=2&tk=%s&q=%s" % (tk, content)

    result = open_url(url)
    jr = json.loads(result)
    r = jr[0];
    
    for index in range(0, len(r) - 2):
        lines[gof * g + index * 4 + 2] = r[index][0]
        print(r[index][0])

    index = index + 1
    lines[gof * g + index * 4 + 2] = r[index][0]+"\n"
    
def t_thread(sl, rl, line, lines, gof, g):
    js = Py4Js()
    tk = js.getTk(line)
    r = translate(sl, rl, line, tk, lines, gof, g)


def doing(sl, rl, in_path,out_path):
    fin = open(in_path,'r')
    fout = open(out_path,'w')

    n = 1
    lines = []
    g = 200

    str = ""
    for line in fin:
        lines.append("")
        n=n+1

        if n%4 ==0: #有效文字为每四行一个
            str +=line
        else:
            lines[n-2] = line

        if n%g == 0:#达到一组
            _str = str
            _thread.start_new_thread(t_thread,(sl, rl, _str,  lines, (int(n/g) - 1), g))
            str=""

    #剩余未达到一组归为一组
    _str = str
    _thread.start_new_thread(t_thread,(sl, rl, _str,  lines, int(n/g), g))
        
    fin.close

    #判断线程翻译结束
    end = True
    while end == True :
        end = True
        for line in lines:
            if line == "":
                end = True
                break
            else:
                end = False

    for line in lines:
        print(line)
        fout.write(line)
    fout.close();

def main():
    print("开始")
    doing("en","zh-CN","D:/Desktop/first.srt","D:/Desktop/out.txt")
    print("结束")

if __name__ == "__main__":
    main()  