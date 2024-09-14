import React from 'react';
//import TaskForm from './components/TaskForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
