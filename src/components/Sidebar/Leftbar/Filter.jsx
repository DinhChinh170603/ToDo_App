import { useMemo } from "react";
import { FILTER_ITEMS } from "../../../constant";
import { useAppContext } from "../../../context/AppProvider";

const Filter = () => {
  const { taskList, filter, setFilter } = useAppContext();

  const countByFilterType = useMemo(() => {
    return taskList.reduce(
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
      { all: taskList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [taskList]);

  return (
    <div>
      <div className="grid-filter">
        {FILTER_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`type-filter ${
              item.id === filter ? "active" : ""
            }`}
            onClick={() => setFilter(item.id)}
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

export default Filter;
