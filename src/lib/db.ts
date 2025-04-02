import sqlite3 from 'sqlite3';

export interface PortfolioItem {
  id: number;
  ticker: string;
  name: string;
  count: number;
  holdingValue: number;
}

let db: sqlite3.Database;

export function getDB() {
  if (!db) {
    db = new sqlite3.Database('./portfolio.db', (err) => {
      if (err) {
        console.error('Error opening database:', err);
        return;
      }
      console.log('Connected to SQLite database');
      createTables();
    });
  }
  return db;
}

function createTables() {
  const db = getDB();
  db.run(`
    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      count REAL NOT NULL,
      holdingValue REAL NOT NULL
    )
  `);
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all('SELECT * FROM portfolio', [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows as PortfolioItem[]);
    });
  });
}

export async function getPortfolioItemByTicker(ticker: string): Promise<PortfolioItem | null> {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.get('SELECT * FROM portfolio WHERE ticker = ?', [ticker], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row as PortfolioItem || null);
    });
  });
}

export async function addPortfolioItem(item: Omit<PortfolioItem, 'id'>): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const db = getDB();
    
    try {
      const existingItem = await getPortfolioItemByTicker(item.ticker);
      
      if (existingItem) {
        // Update existing record
        const newCount = existingItem.count + item.count;
        const newHoldingValue = existingItem.holdingValue + item.holdingValue;
        
        db.run(
          'UPDATE portfolio SET count = ?, holdingValue = ? WHERE ticker = ?',
          [newCount, newHoldingValue, item.ticker],
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      } else {
        // Insert new record
        db.run(
          'INSERT INTO portfolio (ticker, name, count, holdingValue) VALUES (?, ?, ?, ?)',
          [item.ticker, item.name, item.count, item.holdingValue],
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
} 