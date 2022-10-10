import { createContext, useState } from 'react';

export const MenuContext = createContext();

export function MenuContextProvider(props){
  const [modalState, setModalState] = useState({
    registerModal: false,
    signInModal: false
  })
  const toggleModals = (modal="") => {
    switch (modal) {
      case "register":
          setModalState(
            {
              registerModal: true,
              signInModal: false
            }
          )
        break;
      case "login":
        setModalState(
          {
            registerModal: false,
            signInModal: true
          }
        )
        break
      default:
        setModalState(
          {
            registerModal: false,
            signInModal: false
          }
        )
        break;
    }
  }
  return (
    <MenuContext.Provider value={{modalState,toggleModals}}>
      {props.children}
    </MenuContext.Provider>
  )
}