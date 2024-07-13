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
  const [categories, setCategories] = useState("None");
  const [filter, setFilter] = useState("all");

  return (
    <AppContext.Provider
      value={{
        taskList,
        setTaskList,
        categoriesId,
        setCategoriesId,
        categories,
        setCategories,
        filter,
        setFilter,
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
