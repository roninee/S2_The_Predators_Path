import os
from pathlib import Path
import io
import sys

def main():
    args = sys.argv[1:]
    # if len(args) < 1:
    #     print("至少需要一个参数")
    Path("./done").mkdir(parents=True, exist_ok=True)
    lines = []
    for root, dirs, files in os.walk('./'):
        for name in files:
            if name.endswith('.mp4'):
                h265_name = name[:-4] + '_h265.mp4'
                lines.append(f'ffmpeg -i `./{name}`  -c:v libx265 -vtag hvc1 -c:a copy `./{h265_name}`')
                lines.append(f'mv `{name}`  `./done/{name}`')
                lines.append(f'mv `{h265_name}`  `./done/{h265_name}`')

    print('\n'.join(lines))

    with open('./c.nu', 'w', encoding='UTF-8') as f:
        f.write('\n'.join(lines)+'\n')


if __name__ == "__main__":
    main()

