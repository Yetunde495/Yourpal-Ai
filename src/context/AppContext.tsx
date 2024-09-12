import React, { PropsWithChildren, useContext, useReducer } from "react";

export const DATA_CENTER_USER = "@user";
export const DATA_CENTER_TOKEN = "@token";
export const DATA_CENTER_SPACE = "@space"

type dropdownTypes = {
  categories: Array<any>,
  tags: Array<any>,
  view_types: Array<any>,
  media_types: Array<any>,
  source_types: Array<any>,

}

const defaultContext = {
  user: null,
  isLoggedIn: false,
  newChat: false,
  dropdownData: {
  categories: [],
  tags: [],
  view_types: [],
  media_types: [],
  source_types: [],
 
  },
  signIn: (_data: any) => {},
  setNewChat: (_value:boolean) => {},
  signOut: () => {},
  updateUser: (_user: any) => {},
  updateDropdownData: (_dropdownData: any) => {},
  loadData: () => {},
} as any;

interface AppContextInterface {
  user: any | null;
  isLoggedIn: boolean;
  newChat: boolean;
  dropdownData: dropdownTypes | null;
  signIn: (data: any) => void;
  signOut: () => void;
  updateUser: (data:  any) => void;
  updateDropdownData: (data:  any) => void;
  loadData: () => void;
  setNewChat: (value:boolean) => void;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "reset":
      return { ...state, ...defaultContext };
    default:
      return state;
  }
}

export const AppContext =
  React.createContext<AppContextInterface>(defaultContext);

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);

  const update = (payload: any) => {
    dispatch({ type: "update", payload });
  };

  const signIn = (data: any) => {
    update({
      user: data,
      isLoggedIn: true,
    });
    localStorage.setItem(DATA_CENTER_TOKEN, data.token);
    localStorage.setItem(DATA_CENTER_USER, JSON.stringify(data));
  };

  const signOut = () => {
    localStorage.removeItem(DATA_CENTER_TOKEN);
    localStorage.removeItem(DATA_CENTER_USER);
    update({
      user: null,
      isLoggedIn: false,
    });
  };

  const loadData = () => {
    // let d = localStorage.getItem(DATA_CENTER_USER);
    // if (d) {
    //   signIn(JSON.parse(d));
    //   // update({ user: JSON.parse(d), isLoggedIn: true });
    // }
    let token = localStorage.getItem(DATA_CENTER_TOKEN);
  if (token) {
    // Token exists, fetch user data from local storage
    let userData = localStorage.getItem(DATA_CENTER_USER);
    if (userData) {
      // User data found, sign in the user
      signIn(JSON.parse(userData));
    } else {
      // User data not found, sign out the user
      signOut();
    }
  }
  };

  const updateUser = (data: any) => {
    update({ user: data });
  };



  const setNewChat = (value:any) => {
    update({newChat: value})
  }


  const updateDropdownData = (data: any) => {
    update({ dropdownData: data });
  };


  let value: AppContextInterface = {
    user: state?.user,
    isLoggedIn: state?.isLoggedIn,
    dropdownData: state?.dropdownData,
    newChat: state?.newChat,
    setNewChat,
    signIn,
    signOut,
    updateUser,
    updateDropdownData,
    loadData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};