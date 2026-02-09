const fs = require('fs');

const content = fs.readFileSync('content/sermons/FAITH-AND-THE-INNER-MAN.mdx', 'utf-8');
const match = content.match(/^---\n([\s\S]*?)\n---/);

console.log('Match found:', !!match);
if (match) {
  console.log('Frontmatter raw:');
  console.log(match[1]);
  console.log('\nLines:');
  match[1].split('\n').forEach((line, i) => {
    console.log(`${i}: "${line}"`);
  });
}
