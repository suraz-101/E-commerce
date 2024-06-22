import { useState, createContext } from "react";

export const toggleContext = createContext(null);

export const ToggleContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <toggleContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme}`}>{children}</div>
    </toggleContext.Provider>
  );
};
