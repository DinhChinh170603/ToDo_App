import PropTypes from "prop-types";
import { useMemo } from "react";
import { FILTER_ITEMS } from "../../../constant";

const Filter = (props) => {
  const countByFilterType = useMemo(() => {
    return props.taskList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        newAcc[
          cur.isCompleted
            ? "completed"
            : cur.isImportant
            ? "important"
            : cur.isDeleted
            ? "deleted"
            : ""
        ] += 1;
        return newAcc;
      },
      { all: props.taskList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [props.taskList]);

  return (
    <div>
      <div className="grid-filter">
        {FILTER_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`type-filter ${
              item.id === props.filter ? "active" : ""
            }`}
            onClick={() => props.setFilter(item.id)}
          >
            <div className="name-filter">
              <div>
                <i className={item.icon}></i>
              </div>
              <p>{item.name}</p>
            </div>
            <p>{countByFilterType[item.id]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Filter.propTypes = {
  taskList: PropTypes.array,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

export default Filter;
