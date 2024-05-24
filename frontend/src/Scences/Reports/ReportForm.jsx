import React, { useState } from 'react';

const ReportForm = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can implement the logic to send the report
    console.log('Sending report to:', recipient);
    console.log('Message:', message);
    console.log('Attached file:', file);
    // Reset the form fields after submission
    setRecipient('');
    setMessage('');
    setFile(null);
  };

  return (
    <div>
      <h2>Report Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Attach File:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Send Report</button>
      </form>
    </div>
  );
};
export default ReportForm;