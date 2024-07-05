import "./App.css";

import { useContext, useEffect, useMemo, useState } from "react";
import TodoItem from "./components/Todo/TodoItem";
import AddNewItem from "./components/Todo/AddNewItem";
import TaskDetail from "./components/Sidebar/TaskDetail";
import { LeftBar } from "./components/Sidebar/LeftBar";
import { AppContext } from "./context/AppProvider";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList") ?? "[]");
    if (storedTaskList?.length) {
      return storedTaskList;
    }
    return [];
  });

  const [activeTodoItem, setActiveTodoItem] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState('None');

  const { categoriesId } = useContext(AppContext);

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

      if (categoriesId) {
        if (categoriesId !== task.inCategory) return false;
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

  // Sai, không nên tính toán filter ở đây, tính trực tiếp trong component
  // const allTasksCount = taskList.length;
  // const importantTasksCount = taskList.filter(
  //   (task) => task.isImportant
  // ).length;
  // const completedTasksCount = taskList.filter(
  //   (task) => task.isCompleted
  // ).length;
  // const deletedTasksCount = taskList.filter((task) => task.isDeleted).length;

  return (
    <div className="container">
      <LeftBar
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        setCategories={setCategories}
        taskList={taskList}
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
                id={task.id}
                name={task.name}
                dateTime={task.dateTime}
                isImportant={task.isImportant}
                isCompleted={task.isCompleted}
                isDeleted={task.isDeleted}
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
