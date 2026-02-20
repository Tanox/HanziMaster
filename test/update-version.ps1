
# 批量更新 HanziMaster 项目版本号脚本
# 将所有文件中的版本号从 v1.0.1 或 v1.1.5 更新为 v1.1.6

$projectRoot = "e:\Github\HanziMaster"
$oldVersions = @("v1.0.1", "v1.1.5")
$newVersion = "v1.1.6"

# 需要处理的文件类型
$filePatterns = @("*.ts", "*.tsx", "*.js", "*.json")

Write-Host "开始更新版本号到 $newVersion..." -ForegroundColor Green

$updatedCount = 0

foreach ($pattern in $filePatterns) {
    $files = Get-ChildItem -Path $projectRoot -Filter $pattern -Recurse -File
    
    foreach ($file in $files) {
        # 跳过 node_modules 和 .git 目录
        if ($file.FullName -match "node_modules" -or $file.FullName -match "\.git") {
            continue
        }
        
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        
        foreach ($oldVer in $oldVersions) {
            $content = $content -replace [regex]::Escape($oldVer), $newVersion
        }
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "已更新: $($file.FullName)" -ForegroundColor Cyan
            $updatedCount++
        }
    }
}

Write-Host "`n完成！共更新了 $updatedCount 个文件。" -ForegroundColor Green
