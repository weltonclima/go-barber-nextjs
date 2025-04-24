"use client"
import { ISignIn } from "../interfaces/signin"
import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { api } from "../services/api";

type InputType = {
  email: string;
  password: string;
}

interface Props {
  isAuthenticated: boolean;
  user: ISignIn | null;
  signIn: (user: InputType) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (user: InputType) => Promise<void>;
  forgout: (email: string) => Promise<void>;
}

export const useStorage = create<Props>()(
  persist((set) => ({
    isAuthenticated: false,
    user: {} as ISignIn,
    signIn: async ({ email, password }) => {
      const { data } = await api.post<ISignIn>("/signin", { email, password });
      set({ isAuthenticated: true, user: data });
    },
    signOut: async () => {
      await api.get("/signout");
      set({ isAuthenticated: false, user: null });
    },
    signUp: async ({ email, password }) => {
      const { data } = await api.post("/signup", { email, password });
      set({ isAuthenticated: true, user: data });
    },
    forgout: async (email) => await api.post("/forgout", { email })
  }),
    { name: "user-storage" }
  )
);