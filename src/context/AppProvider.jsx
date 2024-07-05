import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [categoriesId, setCategoriesId] = useState();

  return (
    <AppContext.Provider value={{ categoriesId, setCategoriesId }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propsTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
