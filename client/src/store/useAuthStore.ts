import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IUser {
  id: string;
  username: string;
  email: string;
  accessToken: string;
}

interface IAuthState {
  user: IUser;
  login: (accessToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: {
        id: "",
        username: "",
        email: "",
        accessToken: "",
      },
      login: (accessToken: string) => {
        const user = jwtDecode(accessToken) as IUser;
        set({ user: { ...user, accessToken } });
      },
      logout: () =>
        set({
          user: {
            id: "",
            username: "",
            email: "",
            accessToken: "",
          },
        }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;