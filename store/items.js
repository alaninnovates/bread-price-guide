import create from 'zustand';

// causes some wonky hydration errors that i am too lazy to solve
export const useItemsStore = create((set, get) => ({
    items: [],
    setItems: (items) => set({items}),
    updateItem: (itemId, item) => {
        const items = get().items;
        items.find(itm => itm._)
    },
    deleteItem: (itemId) => set({
        items: get().items.filter(itm => itm._id !== itemId)
    })
}));