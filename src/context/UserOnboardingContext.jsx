import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    surname: '',
    email: '',
    mobile: '',
    gender: '',
    age: '',
    weight: '',
    fitnessLevel: '',
    fitnessGoal: ''
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
