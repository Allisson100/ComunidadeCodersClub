import { create } from "zustand";
import { persist } from "zustand/middleware"

type User = {
    name: string;
    age: number;
}

export const useUSerData = create<User>()(
    persist(
        () => ({
            name: 'Allisson',
            age: 22,
        }),
        {
            name: 'useUSerData',
        }
    )
)