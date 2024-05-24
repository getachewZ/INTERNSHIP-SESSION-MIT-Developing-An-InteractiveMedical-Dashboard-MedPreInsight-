import React, { useState } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FAQForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [faqs, setFAQs] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/createFaq', { title, description })
      .then(result => {
        console.log(result);
        const newFAQ = { id: result.data.id, title, description }; // Include ID in the FAQ object
        setTitle('');
        setDescription('');
        setFAQs([...faqs, newFAQ]); // Add new FAQ to the state array
      })
      .catch(err => console.log(err));
  }; 
  const handleDeleteFAQ = (id) => {
    axios.delete(`http://localhost:3000/deleteFaq/${id}`)
      .then(result => {
        console.log(result);
        // Filter out the deleted FAQ from the state
        setFAQs(prevfaqs=>prevfaqs.filter(faq => faq.id !== id));
      })
      .catch(err => console.log(err));
  };
  return (
    <Box display='flex' justifyContent='space-between'>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add FAQ
          </Button>
        </form>
      </Box>
      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{faq.title}</Typography>
              <IconButton onClick={() => handleDeleteFAQ(faq.id)}>
                <DeleteIcon />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQForm;
