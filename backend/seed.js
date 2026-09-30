const fs = require('fs');
const path = require('path');
const vm = require('vm');
const supabase = require('./db');

// Use the path you pass in, or look for the file one folder up
const file = process.argv[2] || path.join(__dirname, '..', 'questions-data.js');

(async () => {
  const code = fs.readFileSync(file, 'utf8');
  const quizPools = vm.runInNewContext(code + '\n;quizPools');

  // Safety: don't import twice
  const { count, error: cErr } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true });
  if (cErr) return console.error('FAILED:', cErr.message);
  if (count > 0) {
    return console.log(`questions table already has ${count} rows. Stopping to avoid duplicates.`);
  }

  const rows = [];
  let skipped = 0;
  for (const [tier, list] of Object.entries(quizPools)) {
    let n = 0;
    for (const item of list) {
      const idx = item.options.indexOf(item.answer);
      if (idx === -1) { skipped++; continue; }
      rows.push({
        tier,
        subject: item.category,
        question: item.q,
        options: item.options,
        correct_index: idx,
        explanation: item.explain || null
      });
      n++;
    }
    console.log(`${tier}: ${n} questions ready`);
  }

  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from('questions').insert(rows.slice(i, i + 500));
    if (error) return console.error('FAILED at batch starting', i, ':', error.message);
    console.log(`Inserted ${Math.min(i + 500, rows.length)} / ${rows.length}`);
  }
  console.log(`Done. Inserted ${rows.length}, skipped ${skipped} (answer not found in options).`);
})();