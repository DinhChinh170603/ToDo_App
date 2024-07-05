import "./sidebar.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { CATE_ITEMS } from "../../constant";

const TaskDetail = (props) => {
  const task = props.taskItem;

  const [name, setName] = useState(task.name);
  const [isImportant, setIsImportant] = useState(task.isImportant);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [category, setCategory] = useState(task.inCategory);

  const onSubmit = () => {
    const newTask = { ...task, name, isImportant, isCompleted, inCategory: category };
    props.onChangeTask(newTask);
    props.setShowSidebar(false);
  };

  return (
    <div className="side-bar">
      <div className="content-side-bar">
        <div className="form-field">
          <label htmlFor="sb-name">Task Name</label>
          <input
            type="text"
            id="sb-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="sb-important">Is important ?</label>
          <input
            type="checkbox"
            id="sb-important"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="sb-completed">Is completed ?</label>
          <input
            type="checkbox"
            id="sb-completed"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="sb-cate">Categories</label>
          <select id="sb-cate" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATE_ITEMS.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="sb-footer">
        <button onClick={onSubmit}>Save</button>
        <button onClick={() => props.setShowSidebar(false)}>Cancel</button>
      </div>
    </div>
  );
};

TaskDetail.propTypes = {
  taskItem: PropTypes.object,
  onChangeTask: PropTypes.func,
  setShowSidebar: PropTypes.func,
  inCategory: PropTypes.string
};

export default TaskDetail;
