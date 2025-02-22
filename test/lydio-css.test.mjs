import { RuleCollection } from '../src/index.mjs';

// Define expected output
const expectedCss = `body {
  color: var(--text);
  background: var(--background);
  font-family: var(--font-body);
}

.l-clamp-800 {
  margin: 0 auto;
  width: 800px;
}`;

// Create CSS rules
const styles = new RuleCollection();
styles.rule()
    .select('body')
    .prop('color', 'var(--text)')
    .prop('background', 'var(--background)')
    .prop('font-family', 'var(--font-body)');

styles.rule()
    .select('.l-clamp-800')
    .prop('margin', '0 auto')
    .prop('width', '800px');

// Convert to CSS and run the test
const generatedCss = styles.toCss().trim();

// Basic test output
console.log('Generated CSS:');
console.log(generatedCss);
console.log('\nExpected CSS:');
console.log(expectedCss);

// Check correctness
if (generatedCss === expectedCss) {
    console.log('\n✅ Lydio: CSS Test Passed!');
    process.exit(0); // Exit successfully
} else {
    console.error('\n❌ Lydio: CSS Test Failed!');
    process.exit(1); // Exit with error
}
