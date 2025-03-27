import { getDB } from '@/lib/db';

const sampleData = [
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    count: 0.5,
    holdingValue: 25000,
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    count: 2.5,
    holdingValue: 7500,
  },
  {
    ticker: 'BNB',
    name: 'Binance Coin',
    count: 5,
    holdingValue: 1500,
  },
  {
    ticker: 'SOL',
    name: 'Solana',
    count: 25,
    holdingValue: 2000,
  },
  {
    ticker: 'ADA',
    name: 'Cardano',
    count: 1000,
    holdingValue: 1000,
  },
];

async function seedDatabase() {
  const db = getDB();
  
  // Clear existing data
  db.run('DELETE FROM portfolio', [], (err) => {
    if (err) {
      console.error('Error clearing database:', err);
      return;
    }
    console.log('Cleared existing data');
  });

  // Insert sample data
  const stmt = db.prepare('INSERT INTO portfolio (ticker, name, count, holdingValue) VALUES (?, ?, ?, ?)');
  
  sampleData.forEach((item) => {
    stmt.run([item.ticker, item.name, item.count, item.holdingValue], (err) => {
      if (err) {
        console.error(`Error inserting ${item.ticker}:`, err);
      } else {
        console.log(`Inserted ${item.ticker}`);
      }
    });
  });

  stmt.finalize();
  console.log('Database seeding completed');
}

seedDatabase(); 