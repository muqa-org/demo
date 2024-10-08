import { createContext, useState } from 'react';
import { Application, CartAllocation } from '@allo/kit';

export type CartContextType = {
	items: CartAllocation[];
	addItem: (item: Application) => void;
	removeItem: (id: string) => void;
  setAmount: (id: string, amount: bigint) => void;
	clearCart: () => void;
};

const [items, setItems] = useState<CartAllocation[]>([]);

/**
 * Adds a project (accepted application) to the cart.
 * @param project An Application object representing an accepted application to a round.
 */
const addItem = (project: Application) => {
  const existingItem = items.find((item) => item.id === item.id);
  if (existingItem) return;

  const item: CartAllocation = {
    id: project.id,
    recipientAddress: project.recipient,
    amount: BigInt(0)
  };
  setItems([...items, item]);
};

const removeItem = (id: string) => {
  const existingItem = items.find((it) => it.id === id);
  if (!existingItem) return;

  setItems(items.filter((it) => it.id !== id));
};

const setAmount = (id: string, amount: bigint) => {
  const existingItem = items.find((it) => it.id === id);
  if (!existingItem) return;

  existingItem.amount = amount;
  setItems(items.map((it) => it.id === id ? existingItem : it));
}

const clearCart = () => {
  setItems([]);
}

export const defaultCartContext: CartContextType = {
	items,
	addItem,
	removeItem,
  setAmount,
	clearCart,
};

export const CartContext = createContext<CartContextType>(defaultCartContext);
