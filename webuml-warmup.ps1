$counter1 = Get-Counter '\Processor(_Total)\% Processor Time'
$counter1Value =  $counter1.CounterSamples[0].CookedValue
"$counter1Value"

Start-Sleep -s 2
$counter2 = Get-Counter '\Processor(_Total)\% Processor Time'
$counter2Value =  $counter2.CounterSamples[0].CookedValue
"$counter2Value"

Start-Sleep -s 2
$counter3 = Get-Counter '\Processor(_Total)\% Processor Time'
$counter3Value = $counter3.CounterSamples[0].CookedValue
"$counter3Value"

if (($counter1Value -gt 90.0) -and ($counter2Value -gt 90.0) -and ($counter3Value -gt 90.0)) 
{
	"Time to kill"
	Stop-Process -processname dot
}
else
{
	"Server doing fine"
}



function generateDiagram (
    [string]$diagramText,
    [string]$fileName
    )
    {
		try {
			$input = new-object System.Collections.Specialized.NameValueCollection;
			$input.Add("uml", $diagramText);
			$wc = new-object System.Net.WebClient;
			$response = $wc.UploadValues("http://codeuml.com/SendUml.ashx", $input);
			$key = [System.Text.Encoding]::UTF8.GetString($response);
			$downloadUrl = "http://codeuml.com/getimage.ashx?key=" + $key;
			$wc.DownloadFile($downloadUrl, $fileName);
			$wc.Dispose();
		
		}
		
		catch [Net.WebException] {
				$exception = $_.Exception.ToString();

			Add-content c:\stuff\monitor\umllog.txt $exception
		
		}
    }
    
del class.png
del usecase.png    
generateDiagram "A->B: Hello" "class.png"
generateDiagram "(A)->(B): Hello" "usecase.png"