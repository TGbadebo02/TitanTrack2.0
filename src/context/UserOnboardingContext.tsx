import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export type UserInfo = {
  firstname: string;
  surname: string;
  email: string;
  mobile: string;
  gender: string;
  age: string;
  weight: string;
  fitnessLevel: string;
  fitnessGoal: string;
};

type UserContextValue = {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
};

type UserProviderProps = {
  children: ReactNode;
};

export const initialUserInfo: UserInfo = {
  firstname: '',
  surname: '',
  email: '',
  mobile: '',
  gender: '',
  age: '',
  weight: '',
  fitnessLevel: '',
  fitnessGoal: '',
};

export const UserContext = createContext<UserContextValue>({
  userInfo: initialUserInfo,
  setUserInfo: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
