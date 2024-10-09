import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

// Mock data for tasks
const mockTasks = [
  { id: 1, title: 'Fold Letters', description: 'Fold 100 letters for mailing', stipend: 50, deadline: '2024-12-31' },
  { id: 2, title: 'Organize Files', description: 'Sort files for the next campaign', stipend: 30, deadline: '2024-11-15' },
];

function Tasks({ userRole }) {
  const [tasks, setTasks] = useState(mockTasks);
  const [progress, setProgress] = useState({});
  const [newTask, setNewTask] = useState({ title: '', description: '', stipend: '', deadline: '' });

  // Handle task progress update by seniors
  const handleProgressChange = (taskId, value) => {
    setProgress({ ...progress, [taskId]: value });
  };

  const handleSubmitProgress = (taskId) => {
    console.log(`Task ${taskId} progress submitted: ${progress[taskId]}`);
  };

  // Handle new task submission by manager
  const handleNewTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    const taskId = tasks.length + 1;
    const newTaskToAdd = { ...newTask, id: taskId };
    setTasks([...tasks, newTaskToAdd]);
    setNewTask({ title: '', description: '', stipend: '', deadline: '' });
    console.log('New task created:', newTaskToAdd);
  };

  // Handle task deletion by manager
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    console.log(`Task ${taskId} deleted`);
  };

  return (
    <Container>
      <h2 className="m-5 text-center">Seniors Empowerment Program (SEP) Tasks</h2>

      {/* Show task form only for managers */}
      {userRole === 'manager' && (
        <div className="mb-4">
          <h3>Create New Task</h3>
          <Form onSubmit={handleNewTaskSubmit}>
            <Form.Group className="mb-3" controlId="formTaskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Task Title"
                value={newTask.title}
                onChange={handleNewTaskChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter Task Description"
                value={newTask.description}
                onChange={handleNewTaskChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskStipend">
              <Form.Label>Stipend</Form.Label>
              <Form.Control
                type="number"
                name="stipend"
                placeholder="Enter Stipend Amount"
                value={newTask.stipend}
                onChange={handleNewTaskChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskDeadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={newTask.deadline}
                onChange={handleNewTaskChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Task
            </Button>
          </Form>
        </div>
      )}

      {/* Display tasks for seniors and managers */}
      <Row>
        {tasks.map((task) => (
          <Col md={4} className="mb-4" key={task.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text><strong>Stipend:</strong> ${task.stipend}</Card.Text>
                <Card.Text><strong>Deadline:</strong> {task.deadline}</Card.Text>

                {/* Managers can delete tasks */}
                {userRole === 'manager' && (
                  <>
                    <Button
                      variant="danger"
                      className="mt-2"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete Task
                    </Button>
                  </>
                )}

                {/* Seniors can submit progress */}
                {userRole === 'senior' && (
                  <>
                    <Form.Group className="mb-3" controlId={`progressInput-${task.id}`}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your progress"
                        value={progress[task.id] || ''}
                        onChange={(e) => handleProgressChange(task.id, e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={() => handleSubmitProgress(task.id)}
                    >
                      Submit Progress
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Tasks;
