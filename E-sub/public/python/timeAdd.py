import time
import datetime
import sys

def doing(in_path, seconds, min, hours):
    format = '%H:%M:%S,%f'
    format2 = '%H:%M:%S,%f'

    fin = open(in_path, 'r')
    lines = []
    str = ""
    n = 0  # 行号
    for line in fin:
        lines.append("")
        n = n + 1
        if n % 4 == 2:  # 有效文字为每四行一个
            str += line
            str1 = str.split()[0]
            str2 = str.split()[2]
            a = datetime.datetime.strptime(str1, format)
            a = a + datetime.timedelta(seconds=int(seconds))
            a = a + datetime.timedelta(minutes=int(min))
            a = a + datetime.timedelta(hours=int(hours))
            str1 = a.strftime(format)
            str1 = str1[:-3]
            b = datetime.datetime.strptime(str2, format)
            b = b + datetime.timedelta(seconds=int(seconds))
            b = b + datetime.timedelta(minutes=int(min))
            b = b + datetime.timedelta(hours=int(hours))
            str2 = b.strftime(format)
            str2 = str2[:-3]
            result = str1 + ' ' + str.split()[1] + ' ' + str2 + '\n'
            lines[n - 1] = result
        else:
            lines[n - 1] = line
        str = ""
    fin.close()
    fout = open(in_path, "w")
    for line in lines:
        fout.write(line)
    fout.close()


# def tranTimeAdd():
doing(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
# def main():
#     print("开始")
#     doing("F:/学习/英语/first.srt", 2,0,0)
#     print("结束")


# if __name__ == "__main__":
#     main()
