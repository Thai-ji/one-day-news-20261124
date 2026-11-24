# render.ps1 — draw design.html to entry.png with the local Edge in headless mode.
# Canvas is fixed at 1024x1024, so the screenshot must come out at exactly that size.
# Edge is invoked directly (call operator) with a throwaway profile; the caller sees
# Edge's own stderr, and we fail loudly if no PNG lands.
param(
    [string]$Root = $PSScriptRoot
)

$ErrorActionPreference = 'Continue'
$html = Join-Path $Root 'design.html'
$png  = Join-Path $Root 'entry.png'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
if (-not (Test-Path $edge)) { throw 'Edge not found' }

if (Test-Path $png) { Remove-Item $png -Force }

$profileDir = Join-Path $env:TEMP ('news24-render-' + [guid]::NewGuid().ToString('N'))
$uri = ([uri]$html).AbsoluteUri

$sw = [System.Diagnostics.Stopwatch]::StartNew()
& $edge `
    '--headless=new' `
    '--disable-gpu' `
    '--hide-scrollbars' `
    '--force-device-scale-factor=1' `
    '--window-size=1024,1024' `
    ('--screenshot=' + $png) `
    ('--user-data-dir=' + $profileDir) `
    '--virtual-time-budget=3000' `
    '--no-first-run' `
    '--disable-extensions' `
    $uri 2>&1 | Out-Null
$sw.Stop()
Remove-Item $profileDir -Recurse -Force -ErrorAction SilentlyContinue

if (-not (Test-Path $png)) { throw 'Edge produced no screenshot' }
$len = (Get-Item $png).Length
Write-Host ('render.ps1: entry.png {0} bytes in {1:N1}s' -f $len, $sw.Elapsed.TotalSeconds)
if ($len -gt 1048576) { throw ('entry.png is {0} bytes, over the 1 MiB cap' -f $len) }
