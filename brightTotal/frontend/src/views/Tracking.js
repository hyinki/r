import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Import basic styles for ag-grid
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Import the alpine theme
import { Container, Row, Col } from 'react-bootstrap';

// Mock data for tasks and seniors (with DEP participation)
const mockTasks = [
    { id: 1, title: 'Fold Letters', description: 'Fold 100 letters for mailing', stipend: 50, deadline: '2024-12-31' },
    { id: 2, title: 'Organize Files', description: 'Sort files for the next campaign', stipend: 30, deadline: '2024-11-15' },
    { id: 3, title: 'Prepare Newsletters', description: 'Prepare 50 newsletters for printing', stipend: 40, deadline: '2024-11-20' },
    { id: 4, title: 'Data Entry', description: 'Input survey results into the system', stipend: 60, deadline: '2024-12-10' },
    { id: 5, title: 'Event Assistance', description: 'Assist with setting up the community event', stipend: 70, deadline: '2024-11-25' },
    { id: 6, title: 'Telephone Surveys', description: 'Conduct phone surveys with community members', stipend: 35, deadline: '2024-12-05' },
    { id: 7, title: 'Prepare Kits', description: 'Assemble care kits for distribution', stipend: 45, deadline: '2024-11-30' },
];

const mockSeniors = [
  { 
    id: 1, 
    name: 'John Doe', 
    tasksCompleted: [
      { id: 1, stipend: 50 }, 
      { id: 3, stipend: 40 }
    ],
    tasksInProgress: [
      { id: 6, progress: '30%' } // Working on task 6
    ],
    depParticipation: { hasHelped: true, incentiveSubmitted: true }
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    tasksCompleted: [
      { id: 2, stipend: 30 }
    ],
    tasksInProgress: [
      { id: 5, progress: '50%' } // Working on task 5
    ],
    depParticipation: { hasHelped: false, incentiveSubmitted: false }
  },
  { 
    id: 3, 
    name: 'Emily Johnson', 
    tasksCompleted: [
      { id: 4, stipend: 60 }, 
      { id: 7, stipend: 45 }
    ],
    tasksInProgress: [],
    depParticipation: { hasHelped: true, incentiveSubmitted: false }
  },
  { 
    id: 4, 
    name: 'Michael Brown', 
    tasksCompleted: [
      { id: 6, stipend: 35 }
    ],
    tasksInProgress: [
      { id: 1, progress: '75%' } // Working on task 1
    ],
    depParticipation: { hasHelped: true, incentiveSubmitted: true }
  },
  { 
    id: 5, 
    name: 'Sarah Davis', 
    tasksCompleted: [
      { id: 5, stipend: 70 }
    ],
    tasksInProgress: [
      { id: 2, progress: '20%' } // Working on task 2
    ],
    depParticipation: { hasHelped: false, incentiveSubmitted: false }
  },
];

function Tracking({ userRole }) {
  const [tasks] = useState(mockTasks);
  const [seniors] = useState(mockSeniors);

  // Calculate total stipend earned for each senior
  const calculateTotalStipend = (senior) => {
    return senior.tasksCompleted.reduce((total, task) => total + task.stipend, 0);
  };

  // Columns for the Seniors' Progress table
  const seniorsColumns = [
    { headerName: 'Senior Name', field: 'name', sortable: true, filter: true, resizable: true },
    {
      headerName: 'Tasks Completed',
      field: 'tasksCompleted',
      valueGetter: (params) => {
        const taskTitles = params.data.tasksCompleted.map(task =>
          tasks.find(t => t.id === task.id)?.title
        );
        return taskTitles.join(', ');
      },
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Total Stipend Earned',
      field: 'totalStipend',
      valueGetter: (params) => `$${calculateTotalStipend(params.data)}`,
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'DEP Helped',
      field: 'depParticipation.hasHelped',
      valueGetter: (params) => (params.data.depParticipation.hasHelped ? 'Yes' : 'No'),
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Incentive Submitted',
      field: 'depParticipation.incentiveSubmitted',
      valueGetter: (params) => (params.data.depParticipation.incentiveSubmitted ? 'Yes' : 'No'),
      sortable: true,
      resizable: true,
    },
  ];

  // Columns for the Current Task Progress table
  const tasksColumns = [
    { headerName: 'Task Title', field: 'title', sortable: true, filter: true, resizable: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, resizable: true },
    { headerName: 'Deadline', field: 'deadline', sortable: true, filter: true, resizable: true },
    { headerName: 'Stipend', field: 'stipend', valueFormatter: params => `$${params.value}`, sortable: true, resizable: true },
    {
      headerName: 'Assigned Seniors',
      field: 'assignedSeniors',
      valueGetter: (params) => {
        const assignedSeniors = seniors.filter(senior =>
          senior.tasksCompleted.some(task => task.id === params.data.id)
        ).map(senior => senior.name);
        return assignedSeniors.join(', ');
      },
      resizable: true,
    },
  ];

  // Render the dashboard only if the userRole is 'manager'
  if (userRole !== 'manager') {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <Container>
      <h2 className="m-4 text-center">Manager Dashboard</h2>

      {/* Seniors' Progress Table */}
      <Row className="mb-4">
        <Col>
          <h4>Seniors' Progress</h4>
          <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
            <AgGridReact
              rowData={seniors}
              columnDefs={seniorsColumns}
              defaultColDef={{ flex: 1, minWidth: 150 }}
              pagination={true}
              paginationPageSize={5}
            />
          </div>
        </Col>
      </Row>

      {/* Current Task Progress Table */}
      <Row className="mb-4">
        <Col>
          <h4>Current Task Progress</h4>
          <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
            <AgGridReact
              rowData={tasks}
              columnDefs={tasksColumns}
              defaultColDef={{ flex: 1, minWidth: 150 }}
              pagination={true}
              paginationPageSize={5}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Tracking;
