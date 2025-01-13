import React, { createContext, useContext, useState } from 'react';

export namespace User {
  export interface Props {
    children: React.ReactNode;
  }

  export interface Login {
    username: string;
    password: string;
  }

  export interface Export {
    user: User.Type | null;
    setUser: React.Dispatch<React.SetStateAction<User.Type | null>>;
    login: (obj: Login) => Promise<User.Type | null>;
    logout: () => void;
  }

  export type Type = Record<string, string | undefined>;

  export const Context = createContext<User.Export | undefined>(undefined);

  export const use = () => useContext(Context)!;

  export const Provider = ({ children }: User.Props) => {
    const [user, setUser] = useState<User.Type | null>(null);
  
    const login = async ({ username, password }: User.Login) => {
      // api('/login', {
      //   method: 'POST',
  
      // })

      setUser({
        username,
        password
      })
  
      return user;
    }
  
    const logout = () => {
      setUser(null);
      return;
    }
  
    return (
      <User.Context.Provider value={{ user, setUser, login, logout } satisfies User.Export}>
        {children}
      </User.Context.Provider>
    );
  };
}
