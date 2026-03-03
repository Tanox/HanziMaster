const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'app', 'locales');
fs.readdirSync(localesDir).forEach(file => {
  if (file.endsWith('.ts') && file !== 'index.ts') {
    const filePath = path.join(localesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace statsTotal with statsLearned only if it follows progressTitle
    // Use non-greedy match for the content between progressTitle and statsTotal
    if (content.includes('progressTitle:') && content.includes('statsTotal:')) {
        const newContent = content.replace(/(progressTitle:[\s\S]*?)statsTotal:/, '$1statsLearned:');
        
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Fixed ${file}`);
        } else {
            console.log(`Skipped ${file} (replacement failed)`);
        }
    } else {
        console.log(`Skipped ${file} (keys not found)`);
    }
  }
});
