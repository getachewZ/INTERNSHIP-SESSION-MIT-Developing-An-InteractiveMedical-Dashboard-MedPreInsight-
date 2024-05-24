import React, { useState } from 'react';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const handleDelete = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleUpdate = (id) => {
    const updatedDateStr = prompt('Enter new date for the appointment (YYYY-MM-DD):');
    if (updatedDateStr) {
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === id ? { ...appointment, date: updatedDateStr } : appointment
      );
      setAppointments(updatedAppointments);
    }
  };

  const addAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Math.random().toString(36).substring(7),
      name,
      date
    };
    setAppointments([...appointments, newAppointment]);
    setName('');
    setDate('');
    setOpen(false)
  };

  // Filter out appointments that have passed their date
  const filteredAppointments = appointments.filter(appointment => new Date(appointment.date) > new Date());

  return (
    <div>
      <h1>Appointment Scheduler</h1>
      <form onSubmit={addAppointment}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Schedule Appointment</button>
      </form>
      <h2>Appointments</h2>
      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.name} - {appointment.date}{' '}
            <button onClick={() => handleUpdate(appointment.id)}>Update</button>{' '}
            <button onClick={() => handleDelete(appointment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;