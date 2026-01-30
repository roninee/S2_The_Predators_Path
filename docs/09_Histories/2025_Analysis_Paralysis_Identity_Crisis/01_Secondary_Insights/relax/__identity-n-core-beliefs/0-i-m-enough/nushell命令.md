

删除图片元信息：

ls *.jpg  | get name | each {|file| exiftool -all= -overwrite_original $file}