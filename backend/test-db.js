const supabase = require('./db');

(async () => {
  const { data, error } = await supabase.from('questions').select('*').limit(1);
  console.log(error ? 'FAILED: ' + error.message : 'Connected. Rows found: ' + data.length);
})();