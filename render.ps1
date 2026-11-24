# Renders design.html to entry.png with headless Edge at exactly 1024x1024.
# Run from the repository root:  pwsh -File render.ps1
$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { throw "Edge not found at $edge" }

$html = Join-Path $repo "design.html"
$png = Join-Path $repo "entry.png"
$url = "file:///" + ($html -replace '\\', '/')

& $edge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
        --window-size=1024,1024 --screenshot="$png" $url | Out-Null
Start-Sleep -Seconds 2

if (-not (Test-Path $png)) { throw "render failed: no entry.png" }
$f = Get-Item $png
if ($f.Length -ge 1048576) { throw "entry.png is $($f.Length) bytes, over 1 MiB" }
$hash = (Get-FileHash $png -Algorithm SHA256).Hash.ToLower()
"entry.png: $($f.Length) bytes, sha256 $hash"
