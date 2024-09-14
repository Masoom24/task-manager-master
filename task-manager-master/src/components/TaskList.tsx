import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteTask } from '../features/tasks/taskSlice';
import { Button, List, Tag } from 'antd';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={task => (
        <List.Item
          actions={[
            <Button type="link" onClick={() => handleDelete(task.id)}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={task.title}
            description={task.description}
          />
          <div>
            <Tag color={task.status === 'Completed' ? 'green' : 'blue'}>
              {task.status}
            </Tag>
            <Tag>{task.priority}</Tag>
            <Tag>{task.dueDate}</Tag>
          </div>
        </List.Item>
      )}
    />
  );
};

export default TaskList;
