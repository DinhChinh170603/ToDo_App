import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [taskList, setTaskList] = useState(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList") ?? "[]");
    if (storedTaskList?.length) {
      return storedTaskList;
    }
    return [];
  });

  const [categoriesId, setCategoriesId] = useState();
  const [filter, setFilter] = useState("all");

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <AppContext.Provider
      value={{
        taskList,
        setTaskList,
        categoriesId,
        setCategoriesId,
        filter,
        setFilter,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propsTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
