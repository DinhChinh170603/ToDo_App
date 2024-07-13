import "./App.css";

import { useEffect, useMemo, useState } from "react";
import TodoItem from "./components/Todo/TodoItem";
import AddNewItem from "./components/Todo/AddNewItem";
import TaskDetail from "./components/Sidebar/TaskDetail";
import { LeftBar } from "./components/Sidebar/LeftBar";
import { useAppContext } from "./context/AppProvider";

function App() {
  const [activeTodoItem, setActiveTodoItem] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState('None');

  const { taskList, setTaskList, categoriesId, filter } = useAppContext();

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleIsCompleted = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleIsDeleted = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id? {...task, isDeleted:!task.isDeleted } : task
      )
    );
  }

  const onChangeTask = (newTask) => {
    setTaskList(
      taskList.map((task) => (task.id === newTask.id ? newTask : task))
    );
  };

  const idTaskDetail = taskList.find((task) => task.id === activeTodoItem);

  const handleSidebar = (id) => {
    setShowSidebar(true);
    setActiveTodoItem(id);
  };

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredTask = useMemo(() => {
    return taskList.filter((task) => {
      if (!normalizeText(task.name).includes(normalizeText(search)))
        return false;

      if (categoriesId && categoriesId !== task.inCategory) {
        return false;
      }

      switch (filter) {
        case "all":
          return true;
        case "important":
          return task.isImportant;
        case "completed":
          return task.isCompleted;
        case "deleted":
          return task.isDeleted;
        default:
          return true;
      }
    });
  }, [taskList, filter, search, categoriesId]);

  return (
    <div className="container">
      <LeftBar
        categories={categories}
        setCategories={setCategories}
        search={search}
        setSearch={setSearch}
      />
      <div className="main">
        <div className="main-content">
          <AddNewItem taskList={taskList} setTaskList={setTaskList} />
          <div className="task-list">
            {filteredTask.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                inCategory={categories}
                handleIsCompleted={() => handleIsCompleted(task.id)}
                handleIsDeleted={() => handleIsDeleted(task.id)} 
                handleSidebar={() => handleSidebar(task.id)}
              />
            ))}
          </div>
          {showSidebar && (
            <TaskDetail
              key={activeTodoItem}
              taskItem={idTaskDetail}
              onChangeTask={onChangeTask}
              setShowSidebar={setShowSidebar}
              inCategory={categories}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
