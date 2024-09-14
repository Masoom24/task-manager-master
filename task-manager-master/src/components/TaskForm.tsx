import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, DatePicker, Select } from 'antd';
import './TaskForm.css';
import 'antd/dist/reset.css';

const { TextArea } = Input;

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | undefined>(undefined);
  const [status, setStatus] = useState<'In Progress' | 'Completed' | undefined>(undefined);

  const options = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
  ];
  const statusOptions = [
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' }
  ];

  const handleSubmit = () => {
    if (priority === undefined || status === undefined) {
      alert('Please select priority and status');
      return;
    }
    
    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      priority,
      status,
    };
    dispatch(addTask(newTask));
    // Clear form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority(undefined);
    setStatus(undefined);
  };

  return (
    <div className="p-4">
      <h1 className="task-heading">Task Manager</h1>
      <Input
        placeholder="Task Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />

      <TextArea
        rows={4}
        placeholder="Task Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        className="mt-2"
      />

      <DatePicker
        className="mt-2"
        onChange={(date, dateString: string | string[]) => {
          if (Array.isArray(dateString)) {
            setDueDate(dateString[0]);
          } else {
            setDueDate(dateString);
          }
        }}
      />

      <Select
        value={priority}
        onChange={setPriority}
        placeholder="Select Priority"
        options={options}
      />

      <Select
        value={status}
        onChange={setStatus}
        placeholder="Select Status"
        className="mt-2"
        options={statusOptions}
      />

      <Button type="primary" className="mt-4" onClick={handleSubmit}>
        Add Task
      </Button>
    </div>
  );
};

export default TaskForm;
