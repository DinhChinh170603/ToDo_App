import "bootstrap-icons/font/bootstrap-icons.css";
import { CATE_ITEMS } from "../../../constant";

import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppProvider";

const Categories = (props) => {
  const { categoriesId, setCategoriesId } = useContext(AppContext);

  const countByCateType = useMemo(() => {
    return props.taskList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.inCategory === "personal") {
          newAcc["personal"] += 1;
        } else if (cur.inCategory === "company") {
          newAcc["company"] += 1;
        } else if (cur.inCategory === "travel") {
          newAcc["travel"] += 1;
        } else if (cur.inCategory === "idea") {
          newAcc["idea"] += 1;
        }
        return newAcc;
      },
      { personal: 0, company: 0, travel: 0, idea: 0 }
    );
  }, [props.taskList]);

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

Categories.propTypes = {
  taskList: PropTypes.array,
};

export default Categories;
