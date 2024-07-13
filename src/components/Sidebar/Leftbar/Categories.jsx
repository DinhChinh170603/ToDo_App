import "bootstrap-icons/font/bootstrap-icons.css";
import { CATE_ITEMS } from "../../../constant";

import { useMemo } from "react";
import { useAppContext } from "../../../context/AppProvider";

const Categories = () => {
  const { taskList, categoriesId, setCategoriesId } = useAppContext();

  const countByCateType = useMemo(() => {
    return taskList.reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur.inCategory]: acc[cur.inCategory] + 1, 
        };
      },
      { personal: 0, company: 0, travel: 0, idea: 0 }
    );
  }, [taskList]);

  return (
    <div className="cate-list">
      {CATE_ITEMS.map(
        (cate) =>
          cate.id !== "none" && (
            <div
              key={cate.id}
              className={`cate-type ${
                cate.id === categoriesId ? "active" : ""
              }`}
              onClick={() =>
                setCategoriesId(cate.id === categoriesId ? null : cate.id)
              }
            >
              <div className="cate-name">
                <i className={cate.icon}></i>
                <p>{cate.name}</p>
              </div>
              <div className="cate-count">
                <p>{countByCateType[cate.id]}</p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Categories;
