const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

db.all(`
  SELECT
    r.rating,
    r.comment,
    r.status,
    r.createdAt,
    p.slug as productSlug
  FROM Review r
  JOIN Product p ON r.productId = p.id
  WHERE r.status = 'APPROVED'
  ORDER BY r.createdAt ASC
`, [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }

  const outputPath = path.join(__dirname, 'reviews-export.json');
  fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2));
  console.log(`✅ Exported ${rows.length} reviews to ${outputPath}`);

  db.close();
});
