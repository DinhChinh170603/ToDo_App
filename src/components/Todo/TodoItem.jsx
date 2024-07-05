import "./todo.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import PropTypes from "prop-types";

const TodoItem = (props) => {
  return (
    <li
      key={props.id}
      className="todo-item-text"
      onClick={() => {
        props.handleSidebar(props.id);
      }}
    >
      <div className="is-completed">
        <div
          className="checkbox-item-is-completed"
          onClick={(e) => {
            e.stopPropagation();
            props.handleIsCompleted(props.id);
          }}
        >
          {props.isCompleted && props.isCompleted ? (
            <span className="done-item">✔</span>
          ) : (
            <span className="not-done-item">✔</span>
          )}
        </div>
        <div className="item-content">
          <p className="item-name">{props.name}</p>
          {/* {props.isImportant && ( */}
            <div className="item-date">
              <span>
                <i className="bi bi-calendar2-event"></i>
              </span>
              <p className="item-text">{props.dateTime}</p>
            </div>
          {/* )} */}
        </div>
      </div>

      <div className="item-opt">
        {props.isImportant && (
          <p>
            <i className="bi bi-star-fill"></i>
          </p>
        )}
        <i
          className="bi bi-trash-fill"
          onClick={(e) => {
            e.stopPropagation();
            props.handleIsDeleted(props.id);
          }}
        ></i>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  dateTime: PropTypes.string,
  isCompleted: PropTypes.bool,
  isImportant: PropTypes.bool,
  isDeleted: PropTypes.bool,
  handleIsCompleted: PropTypes.func,
  handleIsDeleted: PropTypes.func,
  handleSidebar: PropTypes.func,
};

export default TodoItem;
