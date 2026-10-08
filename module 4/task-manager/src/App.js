import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import TaskDashboard from './components/TaskDashboard';
import AddTask from './components/AddTask';

import { useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Learn HTML",
      status: "Completed"
    },
    {
      id: 2,
      name: "Learn CSS",
      status: "In Progress"
    }
  ]);

  const addTask = (newTask) => {

    setTasks([
      ...tasks,
      newTask
    ]);

  };

  const deleteTask = (id) => {

    const updated = tasks.filter(
      task => task.id !== id
    );

    setTasks(updated);

  };

  return (
    <div className="App">

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={
              <TaskDashboard
                tasks={tasks}
                deleteTask={deleteTask}
              />
            }
          />

          <Route
            path="/addtask"
            element={
              <AddTask
                addTask={addTask}
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;