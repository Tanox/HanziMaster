
# 批量修复 HTML 实体字符转义问题

$files = Get-ChildItem -Path "e:\Github\HanziMaster" -Recurse -Include *.ts,*.tsx,*.js,*.jsx

$fixedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    if ($content -match "&amp;lt;|&amp;gt;|&amp;amp;") {
        Write-Host "Fixing: $($file.FullName)"
        
        $fixedContent = $content
        
        # 修复所有 HTML 实体字符
        $fixedContent = $fixedContent -replace "&amp;lt;", "<"
        $fixedContent = $fixedContent -replace "&amp;gt;", ">"
        $fixedContent = $fixedContent -replace "&amp;amp;", "&"
        
        if ($fixedContent -ne $content) {
            Set-Content -Path $file.FullName -Value $fixedContent -Encoding UTF8 -NoNewline
            $fixedCount++
            Write-Host "  ✓ Fixed!" -ForegroundColor Green
        }
    }
}

Write-Host "`nTotal files fixed: $fixedCount" -ForegroundColor Cyan
