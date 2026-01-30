2023.11.29 最新 yt-dlp命令

不要超过 1080

> 重要：yt-dlp -S "*+*codec:avc:m4a,res:1080,ext"=> **h264**` > `h265` > `**vp9**` > `vp9.2` > `av01` > `vp8` > `h263` > `theora
>
> yt-dlp -S "vcodec,res:1080,ext" => av01` > `**vp9.2**` > `vp9` > `h265` > `**h264**` > `vp8 
>
> 

> `yt-dlp  --no-playlist -f  "bv[vcodec~='^(avc|h26[45]|hevc)']+ba[acodec~='mp4a|aac|vorbis|mp3|ac3']"`
>
> 包含字幕：
>
> `yt-dlp  --no-playlist -f  "bv[vcodec~='^(avc|h26[45]|hevc)']+ba[acodec~='mp4a|aac|vorbis|mp3|ac3']"  --sub-langs "en-orig,en,zh,zh-Hans,zh-Hans-en" --write-auto-subs  --write-subs  `

```
下载列表，并且分目录，有index
# Download all playlists of YouTube channel/user keeping each playlist in separate directory:
$ yt-dlp -o "%(uploader)s/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" "https://www.youtube.com/user/TheLinuxFoundation/playlists"
```

只下载 字幕 
`yt-dlp  --no-playlist --sub-langs "en-orig,en,zh,zh-Hans,zh-Hans-en" --write-subs --write-auto-subs --skip-download `

`yt-dlp --write-subs --sub-langs "en-uYU-mmqFLq8" --sub-format "srt/vtt" <视频链接/ID>`

编译成h265/hevc

`ffmpeg -i input.mp4 -c:v libx265 -vtag hvc1 -c:a copy output.mp4`

2022年 youtube-dl  --skip-download --write-sub --sub-lang en   -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' 

 -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' 

合并图片：

ffmpeg -loop 1 -i cover.jpg -i 2.mp3 -c:v libx264 -acodec copy -b:a 192k -shortest 2.mp4

