import { ReactFCWithChildren } from "@/types/props";
import { Admin, AuthStateContext } from "@/types/types";
import { createContext, useContext, useState } from "react";

const StateContext = createContext<AuthStateContext>({
  admin: null,
  setAdmin: () => {},
});

export const AuthContextProvider: React.FC<ReactFCWithChildren> = ({
  children,
}) => {
  const adminData = sessionStorage.getItem("ADMIN_DATA");
  const [admin, _setAdmin] = useState<Admin | null>(
    adminData ? JSON.parse(adminData) : null,
  );

  const setAdmin = (admin: Admin | null): void => {
    if (admin) {
      sessionStorage.setItem("ADMIN_DATA", JSON.stringify(admin));
      _setAdmin(admin);
    } else {
      sessionStorage.removeItem("ADMIN_DATA");
      _setAdmin(null);
    }
  };

  return (
    <StateContext.Provider
      value={{
        admin,
        setAdmin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContext = () => useContext(StateContext);
