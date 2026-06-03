const fs = require('fs');

const transcriptPath = 'C:/Users/SingPC/.gemini/antigravity/brain/35832369-542c-4184-a381-e2abc4977372/.system_generated/logs/transcript.jsonl';

if (fs.existsSync(transcriptPath)) {
  const content = fs.readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n');
  let matchCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT') {
        matchCount++;
        console.log(`=== USER INPUT #${matchCount} at line ${i + 1} ===`);
        console.log(obj.content);
      }
    } catch (e) {
      // Ignored
    }
  }
} else {
  console.log("Transcript not found at", transcriptPath);
}
