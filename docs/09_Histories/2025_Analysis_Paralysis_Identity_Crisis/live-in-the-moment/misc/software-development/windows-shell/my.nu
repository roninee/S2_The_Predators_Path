# config.nu append: source 'D:/My Note/Software.Develop/_Windows.Shell/my.nu'
# C:\Users\weliv\AppData\Roaming\nushell\config.nu
alias v = nvim
# alias y = yt-dlp

def y [ ...url: string ] {
yt-dlp  --no-playlist  -f "bv*[height<=1200]+ba[ext=m4a]"  ...$url
#下面代码中不是分开下载1080p video+ audio；而是直接下载video和audio已经整合到一起的mp4（这种文件很小，而且一般都是480p），
# yt-dlp  --no-playlist  -S "+codec:avc:m4a,res:1080"  ...$url

}

# 带字幕
def yc [ ...url: string ] {
#下面代码中不是分开下载1080p video+ audio；而是直接下载video和audio已经整合到一起的mp4（这种文件很小，而且一般都是480p），
yt-dlp  --no-playlist  -f "bv*[height<=1200]+ba[ext=m4a]"  --sub-langs "en-orig,en,zh,zh-Hans,zh-Hans-en" --write-subs --write-auto-subs   ...$url
}

