## Add Subtitles

VTT-soft 

> ffmpeg -i x.mp4 -i x.vtt -map 0:0 -map 0:1 -map 1:0 -vcodec copy -acodec: copy -c:s copy new.mkv

### Hard

> srt不能定义字体大小，所以可以用fontsize定义大小
>
> ffmpeg -i {filename }-vf subtitles={x}.srt:force_style='Fontsize=24'  -c copy

Sort

> Mp4不支持软字幕，Mkv支持，所以输出必须是mkv
> 这里字体用ffmpeg转成*ass*
>
> ffmpeg -i {x}.mp4 -i {x}.*ass* -c copy  out3.*mkv*
>
> ass的字体更改如下：*Roboto, 24*
> ![img](images/image-20231213202651139.webp)
>
> 

### Merge

> ffmpeg -f concat -safe 0 -i list.txt  -c copy output.mp4    
>
> list.txt: 
>
> file './1.mp4'
> file './2.mp4'

ffmpeg转换视频上传youtube：

ffmpeg -loop 1 -i cover.png -i '.\Cambridge.Beginner.Big.Hair.Day.01.mp3' -c:v libx264 -acodec copy -b:a 192k -shortest Cambridge.Beginner.Big.Hair.Day.01.mp4

抽取音频命令
ffmpeg -i 3.mp4 -vn -y -acodec copy 3.aac
ffmpeg -i 3.mp4 -vn -y -acodec copy 3.m4a


 提取视频 （Extract Video）
ffmpeg -i Life.of.Pi.has.subtitles.mkv -vcodec copy –an  videoNoAudioSubtitle.mp4



音视频合成命令
ffmpeg -i video2.avi -i audio.mp3 -vcodec copy -acodec copy output.avi


查看音视频文件信息命令
ffmpeg -i 3.mp4
ffmpeg -i 3.aac
ffmpeg -i 3.m4a


aac和ac3是音频编码格式，acc是什么，反正不是音频格式。
aac全名是Advanced Audio Coding，后缀名一般为m4a、aac、mp4、mkv等，其中mp4、mkv为视频格式，采样率一般为44.1khz，码率一般是64kbps到192kbps，声道一般为双声道立体声。
ac3全称是（Dolby）Audio Codec 3，一般出现在DVD视频格式中，后缀名为vob，采样率一般为48khz，码率一般是192kbps到384kbps，声道为双声道或6声道。

[ffmpeg实现视频的翻转与旋转(ffmpeg4.2.2) - 刘宏缔的架构森林 - 博客园 (cnblogs.com)](https://www.cnblogs.com/architectforest/p/12818543.html)

1,顺时针旋转90度:

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "transpose=1" /data/dev/think_file/html/8_t1.mp4
```

2,逆时针旋转90度

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "transpose=2" /data/dev/think_file/html/8_t2.mp4
```

3,顺时针旋转90度后并垂直翻转

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "transpose=3" /data/dev/think_file/html/8_t3.mp4    
```

4,顺时针旋转180度

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "transpose=2,transpose=2" /data/dev/think_file/html/8_t5.mp4
```

5,指定角度:90度

\#PI/2: 90度，注意，视频旋转90度后，原宽高没变，所以显示两侧有黑边

\#画面有被隐藏掉的部分

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "rotate=PI/2" /data/dev/think_file/html/8_rpi2.mp4 
```

6,指定角度:180度

\#因为旋转180度仍然与原宽高相等，所以没有黑边，也没有被隐藏的画面

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "rotate=PI" /data/dev/think_file/html/8_rpi1.mp4
```

7, 指定角度:60度

\#原宽高不变，出现黑底，也有画面被隐藏

```
[root@blog 1]# ffmpeg -i 8_9f6fa300bacded7b.mp4 -vf "rotate=PI/3" /data/dev/think_file/html/8_rpi3.mp4
```