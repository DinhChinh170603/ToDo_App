import "./todo.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import PropTypes from "prop-types";

const TodoItem = (props) => {
  const task = props.task;

  return (
    <li
      key={task.id}
      className="todo-item-text"
      onClick={() => {
        props.handleSidebar(task.id);
      }}
    >
      <div className="is-completed">
        <div
          className="checkbox-item-is-completed"
          onClick={(e) => {
            e.stopPropagation();
            props.handleIsCompleted(task.id);
          }}
        >
          {task.isCompleted ? (
            <span className="done-item">✔</span>
          ) : (
            <span className="not-done-item">✔</span>
          )}
        </div>
        <div className="item-content">
          <p className="item-name">{task.name}</p>
          {/* {props.isImportant && ( */}
            <div className="item-date">
              <span>
                <i className="bi bi-calendar2-event"></i>
              </span>
              <p className="item-text">{task.dateTime}</p>
            </div>
          {/* )} */}
        </div>
      </div>

      <div className="item-opt">
        {task.isImportant && (
          <p>
            <i className="bi bi-star-fill"></i>
          </p>
        )}
        <i
          className="bi bi-trash-fill"
          onClick={(e) => {
            e.stopPropagation();
            props.handleIsDeleted(task.id);
          }}
        ></i>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  task: PropTypes.object,
  handleIsCompleted: PropTypes.func,
  handleIsDeleted: PropTypes.func,
  handleSidebar: PropTypes.func,
};

export default TodoItem;
