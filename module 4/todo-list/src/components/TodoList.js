import { useState } from 'react';

function TodoList() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Learn HTML",
      completed: true
    },
    {
      id: 2,
      name: "Learn CSS",
      completed: false
    }
  ]);

  const [taskName, setTaskName] = useState("");

  const addTask = (event) => {

    event.preventDefault();

    const newTask = {
      id: Math.random(),
      name: taskName,
      completed: false
    };

    setTasks([
      ...tasks,
      newTask
    ]);

    setTaskName("");
  };

  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(
      task => task.id !== id
    );

    setTasks(updatedTasks);
  };

  const completeTask = (id) => {

    const updatedTasks = tasks.map(task => {

      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div>

      <h1>To-Do List App</h1>

      <form onSubmit={addTask}>

        <input
          type="text"
          placeholder="Enter task"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          required
        />

        <button type="submit">
          Add Task
        </button>

      </form>

      <table>

        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr key={task.id}>

              <td>{task.name}</td>

              <td>
                {task.completed
                  ? "Completed"
                  : "Pending"}
              </td>

              <td>

                <button
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TodoList;