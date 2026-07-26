import { useEffect, useState } from "react";

function Checklist() {
  const defaultTasks = [
    { id: "devices", text: "Turn off all devices", completed: false, isCustom: false },
    { id: "teeth", text: "Brush your teeth", completed: false, isCustom: false },
  ];
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("checklistTasks")) || defaultTasks;
  });
  const completed = tasks.filter((task) => task.completed).length;

  useEffect(() => {
    localStorage.setItem("checklistTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  };
  const handleAdd = () => {
    const newTask = prompt("Enter a new task:");
    for (let task of tasks) {
      if (task.text === newTask) {
        alert("You already have this task on your checklist!");
        return;
      }
    }
    if (newTask) {
      setTasks([
        ...tasks,
        { id: crypto.randomUUID(), text: newTask, completed: false, isCustom: true },
      ]);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <section className="page-section checklist-page">
      <h2>Sleep Checklist</h2>
      <p>
        Make sure you've done all the things you need to do before you sleep!
        <br />
        Having a consistent routine is essential for good sleep hygiene. Here
        <br />
        are a few suggestions to start with:
      </p>
      <div className="checkboxes">
        {tasks.map((task) => {
          return (
            <div key={task.id} className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTask(task.id)}
                id={`task-${task.id}`}
                name={task.text}
              />
              <label htmlFor={`task-${task.id}`}>{task.text}</label>
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="completed">
        Completed: {completed}/{tasks.length}
      </h3>
      <button onClick={() => handleAdd()}>Add Task</button>
    </section>
  );
}

export default Checklist;
