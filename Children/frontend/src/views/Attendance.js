import React, { useState } from 'react';
import { Button, Container, Table, Form, Alert } from 'react-bootstrap';

const Attendance = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', checkedIn: false, temperature: '' },
        { id: 2, name: 'Jane Smith', checkedIn: false, temperature: '' },
        { id: 3, name: 'Alex Johnson', checkedIn: false, temperature: '' }
    ]);

    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    const handleCheckInOut = (id) => {
        const student = students.find(s => s.id === id);

        // Validate temperature input when checking in
        if (!student.checkedIn && (student.temperature === '' || isNaN(student.temperature))) {
            setError(`Please enter a valid temperature for ${student.name} before checking in.`);
            return;
        }

        setError(null); // Clear any previous error

        // Update student check-in status and log the temperature during check-in
        setStudents(prevStudents =>
            prevStudents.map(s =>
                s.id === id
                    ? { ...s, checkedIn: !s.checkedIn, temperature: !s.checkedIn ? s.temperature : '' }
                    : s
            )
        );

        // Add to history log with the temperature when checked in
        const action = student.checkedIn ? 'Checked Out' : 'Checked In';
        const temperature = student.checkedIn ? 'N/A' : student.temperature;

        setHistory(prevHistory => [
            ...prevHistory,
            {
                id,
                name: student.name,
                action,
                temperature, // Log the temperature during check-in
                time: new Date().toLocaleString()
            }
        ]);
    };

    const handleTemperatureChange = (id, value) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id
                    ? { ...student, temperature: value }
                    : student
            )
        );
    };

    return (
        <Container>
            <h2 className="mt-4">Student Attendance</h2>
            
            {/* Error Alert */}
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Temperature (°C)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} style={{ height: '70px' }}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.checkedIn ? 'Checked In' : 'Checked Out'}</td>
                            <td>
                                {student.checkedIn ? (
                                    student.temperature || 'N/A'
                                ) : (
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter temperature"
                                        value={student.temperature}
                                        onChange={(e) => handleTemperatureChange(student.id, e.target.value)}
                                        style={{ width: '150px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <Button
                                    variant={student.checkedIn ? 'danger' : 'success'}
                                    onClick={() => handleCheckInOut(student.id)}
                                    disabled={!student.checkedIn && (student.temperature === '' || isNaN(student.temperature))}
                                >
                                    {student.checkedIn ? 'Check Out' : 'Check In'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Attendance History Section */}
            <h3 className="mt-5">Attendance History</h3>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                        <th>Temperature (°C)</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{record.name}</td>
                            <td>{record.action}</td>
                            <td>{record.temperature}</td>
                            <td>{record.time}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Attendance;
