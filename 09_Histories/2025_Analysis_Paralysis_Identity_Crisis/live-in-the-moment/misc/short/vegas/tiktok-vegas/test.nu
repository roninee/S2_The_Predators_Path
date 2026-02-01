echo 'pull images'
adb pull /sdcard/Pictures/Screenshots/realtime.png ./backup/
adb pull /sdcard/Pictures/Screenshots/kline.png ./backup/
 let tmp  = c:\Workspace\mysite\trade_simulated\simple_images\build\
 let st = (ls $tmp | sort-by modified | last 1 )
$st  | get name | split row '\' | last 1 | str starts-with 'Screenshot_2021'
 $st | get modified | date to-timezone local
let isss =  ( $st | get modified | date to-timezone local ) <  30min  && ( $st  | get name | split row '\' | last 1 | str starts-with 'Screenshot_2021')
if $isss { cp ($st | get name) ./backup/statistics.png } { echo 'not found 30mintues statistics'}
# last 1 | str starts-with 'Screenshot_2021' )
sleep  1sec
echo 'crop image'
magick .\backup/realtime.png -crop 1080x1360+0+200 ./build/realtime.png
magick .\backup/kline.png -crop 1080x1360+0+200 ./build/kline.png
magick .\backup/statistics.png -crop 1080x1360+0+300 ./build/statistics.png
