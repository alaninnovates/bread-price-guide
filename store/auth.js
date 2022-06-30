import create from 'zustand';
import {persist} from 'zustand/middleware';

export const useAuthStore = create(persist((set, get) => ({
    token: undefined,
    login: (token) => set({token}),
    logout: () => set({token: undefined}),
}), {
    name: 'auth'
}));