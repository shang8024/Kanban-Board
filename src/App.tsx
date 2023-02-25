import React from 'react';
import './App.css';
import { KanbanBoard } from './components/KanbanBoard';

const data = [
  {
    title: 'To Do',
    tasks: [
      {
        title: 'Task 1',
        description: 'Description 1',
      }
    ]
  },
  {
    title: 'In Progress',
    tasks: [
      {
        title: 'Task 2',
        description: 'Description 2',
      },
      {
        title: 'Task 3',
        description: 'Description 3',
      }
    ]
  },
  {
    title: 'Testing',
    tasks: [
      {
        title: 'Task 9',
        description: 'Description 9',
      }
    ]
  },
  {
    title: 'Done',
    tasks: [
      {
        title: 'Task 5',
        description: 'Description 5',
      },
      {
        title: 'Task 6',
        description: 'Description 6',
      },
      {
        title: 'Task 7',
        description: 'Description 7',
      },
      {
        title: 'Task 8',
        description: 'Description 8',
      },
    ]
  },
  {
    title: 'Blocked',
    tasks: [
      {
        title: 'Task 4',
        description: 'Description 4',
      },
    ]
  }
]

function App() {
  // here fetch data from server

  return (
    <div className="App">
      <KanbanBoard title='Kanban Board' data={data}>
      </KanbanBoard>
    </div>
  );
}

export default App;
