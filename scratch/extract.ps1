Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "scratch\Documento maestro textos originales Ok.zip"
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

[xml]$doc = $xmlText
$ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $doc.SelectNodes("//w:p", $ns)
$lines = [System.Collections.Generic.List[string]]::new()

foreach ($p in $paragraphs) {
    $texts = $p.SelectNodes(".//w:t", $ns)
    $pText = ""
    foreach ($t in $texts) {
        $pText += $t.InnerText
    }
    if ($pText.Trim().Length -gt 0) {
        $lines.Add($pText)
    }
}

[System.IO.File]::WriteAllLines("scratch\extracted_doc_text.txt", $lines, [System.Text.Encoding]::UTF8)
Write-Host "Total lineas extraidas:" $lines.Count
