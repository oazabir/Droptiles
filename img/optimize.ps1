optipng -o7 *.png
optipng -o7 AppStore\*.png

gci -include *.jpg -recurse | foreach { $fileName = $_.FullName; $newFileName = $fileName + ".tmp"; cmd /c "jpegtran.exe -optimize ""$fileName"" ""$newFileName"""; copy $newFileName $fileName; del $newFileName; }
