import { collection, getDocs, doc, getDoc, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface PortfolioItem {
  id: string;
  ticker: string;
  name: string;
  count: number;
  holdingValue: number;
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const querySnapshot = await getDocs(collection(db, 'portfolio'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as PortfolioItem));
}

export async function getPortfolioItemByTicker(ticker: string): Promise<PortfolioItem | null> {
  const q = query(collection(db, 'portfolio'), where('ticker', '==', ticker));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  } as PortfolioItem;
}

export async function addPortfolioItem(item: Omit<PortfolioItem, 'id'>): Promise<void> {
  const existingItem = await getPortfolioItemByTicker(item.ticker);
  
  if (existingItem) {
    // Update existing record
    const newCount = existingItem.count + item.count;
    const newHoldingValue = existingItem.holdingValue + item.holdingValue;
    
    await updateDoc(doc(db, 'portfolio', existingItem.id), {
      count: newCount,
      holdingValue: newHoldingValue
    });
  } else {
    // Insert new record
    await setDoc(doc(collection(db, 'portfolio')), item);
  }
} 