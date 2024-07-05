import "./todo.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const AddNewItem = ({ taskList, setTaskList }) => {
  const newItem = useRef();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Decem"];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  };

  const addNewTask = () => {
    if (newItem.current.value === "") return alert("Please enter a task");
    const aNewTask = {
      id: uuidv4(),
      name: newItem.current.value,
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      dateTime: formatDate(new Date()),
      categories: 'None',
    };
    setTaskList([aNewTask, ...taskList]);
    newItem.current.value = "";
  };

  return (
    <div className="todo-item-text new-item">
      <div className="is-completed">
        <div
          // checked={props.isCompleted}
          className="checkbox-item-is-completed new-item"
          onClick={(e) => {
            e.stopPropagation();
            addNewTask();
          }}
        ><i className="bi bi-plus-circle-fill"></i></div>
      </div>
      <input
        ref={newItem}
        type="text"
        placeholder="Add new task"
        className="todo-item-text new-item"
        name="add-new-task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewTask();
          }
        }}
      />
    </div>
  );
};

AddNewItem.propTypes = {
  taskList: PropTypes.array,
  setTaskList: PropTypes.func,
};

export default AddNewItem;
