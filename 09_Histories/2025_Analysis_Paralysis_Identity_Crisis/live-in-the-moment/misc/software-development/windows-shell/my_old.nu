let-env DOC_PATH = 'C:/Workspace/Documents'
let-env DICT_PATH = 'C:/Workspace/text.dictionary'
let-env VIM_CFG = '~\AppData\Local\nvim\init.vim'

alias v = nvim

def grep [ key :string ] {

 #each {|it| $it | find $key  }
 # 不能直接replace，因为 每一行是一条记录，要取出name，所以要先判断是否是表
# ls | find $key | str find-replace $key $'(ansi cr)($key)((ansi reset))'  

# 遍历 column
ls |  find $key | str find-replace -a $key $'(ansi cr)($key)((ansi reset))' name

}

def list_my_cmd [] {
	open ( $env.DOC_PATH | path join 'All.Config/my.nu') | lines | each {|it| $it | find -r '^\s*def\s'}

}

def latest [...arg:string] {
	if ( $arg | length ) == 0 {
		ls |  where type == 'file' |    sort-by modified | reverse | first 1	
	}	else  {
		ls |  where type == 'file' |    sort-by modified | reverse | first ( $arg | get 0 | into int)
	}
}

def list_sub_title [ url: string ] {
youtube-dl --list-subs $url
}
def ytb-sub [
	url: string
] {
	yt-dlp  --skip-download --write-subs --sub-lang en   -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' $url
}


def ytb-auto-sub [
	url: string
] {
	yt-dlp --skip-download --write-auto-subs --sub-lang en   -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' $url
}

def ytb-sub-zh [
	url: string
] {
	yt-dlp --skip-download --write-subs --sub-lang en --write-auto-subs --sub-lang zh-Hans   -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' $url
}


def ytb [
	url: string
] {
# Download the best mp4 video available, or the best video if no mp4 available
# $ yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b"

# Download the best video with the best extension
# (For video, mp4 > webm > flv. For audio, m4a > aac > mp3 ...)
# $ yt-dlp -S "ext"

	yt-dlp -S "ext" $url
	yt-dlp -f "(bv*[vcodec~='^(avc|h264)']+ba) / (bv*+ba/b)"     -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' $url
}

def cutmp3 [
file: string   # file name
start_time: string # start time 
--duration (-t): string   # default none
] {

	#let dur = if ($duration | empty? ) {''} else {  build-string ' -t ' $duration  }
	
	let new_file = ( $file |str substring ',-4' | build-string $in '_new1' ($file | str substring '-4,') )
	
	if ($duration | empty? )  { 
		ffmpeg -hide_banner -loglevel 24 -i $file -ss $start_time -c copy -y $new_file
	 } else { 
		 
		ffmpeg -hide_banner -loglevel 24 -i $file -ss $start_time -t $duration -c copy -y $new_file
	 }
	
	
	
	#	echo -e "input:\e[1;32m filename start_time [duration]"
}


def cat [
	names: string 	# ex: cat */*.md
	#--limit (-l): int # ex: limit 10 (files)
] { 
	ls $names | get name |  each { |it| (open $it) | lines } |  flatten 
 }


 def dict [
	word: string 	# ex: dict 统计
] { 
	$env.DICT_PATH | path join '*.plain' | cat $in | find   $word | str find-replace $word $'(ansi cr)($word)((ansi reset))'
	# cat C:\Workspace\text.dictionary\*.plain | find  $word
 }


 def docs [
	word: string 	# ex: cat */*.md
] { 
	$env.DOC_PATH | path join '*/*.md' | cat $in | find   $word | str find-replace $word $'(ansi cr)($word)((ansi reset))'
	# cat C:\Workspace\Documents\*/*.md | find  $word
 }

list_my_cmd
#ls .\Python_Life.is.Short,You.Need.Python\*.md | each {|it| (open $it.name |  lines | each {|row| $row | find youtube  }  )   }  | where ($it | length) > 0

