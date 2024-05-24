const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') 
const app = express();
const authRouter = require('./routes/authRoute')
const NewModel = require('./models/Patient');
const financialModel = require('./models/CasherRecord');
const faqModel = require('./models/FaqModel')
const triageModel = require('./models/Data')
const AppointmentModel = require('./models/Appointment')
const AddmittedModel = require('./models/Addmitted')
const DischargedModel = require('./models/Discharge')
const ReferedModel = require('./models/Refered')
const totalpatientsModel = require('./models/PatientLists')
const MonthlyDataModel = require('./models/MonthlyData')
//middlewares!!
app.use(cors())
app.use(express.json());
//routing
app.use('/api/auth', authRouter)
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
.then(()=>
  console.log('Connected')
  )
  .catch((error)=>console.error('Failed to connect to mongodb', error))
//////////////////
app.get('/totalpatients', (req, res)=>{
  totalpatientsModel.find({})
  .then(users=>res.json(users))
  .catch((err)=>console.log(err))
})
// registaring the new Patient
app.post('/newPatient', (req, res)=>{
  NewModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
/////////////////////////
app.get('/', (req, res) => {
  NewModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});
////
app.get('/search', (req, res) => {
  const { query } = req.query; // Assuming query is the search parameter
  NewModel.find({
    $or: [
      { First_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      { Last_name: { $regex: query, $options: 'i' } },
      // Add other fields you want to search here
    ]
  })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});
///
app.get('/getdata', (req, res) => {
  MonthlyDataModel.find({})
    .then(patients => {
      const groupedData = patients.reduce((acc, patient) => {
        const key = `${patient.RegistrationYear}-${patient.RegistrationMonth}`;
        if (!acc[key]) {
          acc[key] = { month: patient.RegistrationMonth, year: patient.RegistrationYear, count: 0 };
        }
        acc[key].count += 1;
        return acc;
      }, {});

      const result = Object.values(groupedData);

      result.sort((a, b) => {
        if (a.year === b.year) {
          return new Date(`${a.month} 1, 2000`) - new Date(`${b.month} 1, 2000`);
        }
        return a.year - b.year;
      });

      console.log(result); // Add this line to check the data
      res.json(result);
    })
    .catch(err => {
      console.error('Error during finding data:', err.message, err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
// submitting financial record when clicking pay button.
app.post('/financial-record', (req, res)=>{
  financialModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
//accessing the new patient in triage
app.get('/financialrecord', (req, res) => {
  financialModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});
// accessing for single new patient in triage.
app.get('/view/:id', (req, res)=>{
  const id = req.params.id;
  financialModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.status(500).json(err));
})
//viewing the patient and adding some components in triage and post it.
app.post('/PatientCheck', (req, res)=>{
  triageModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
// accessing the modeified one from the triagemodel
app.get('/viewpatients', (req, res) => {
  triageModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});
/////////////////
app.get('/patientView/:id', (req, res)=>{
  const id = req.params.id;
  triageModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.status(500).json(err));
})
//
app.get('/financialrecord/search', (req, res) => {
  const { query } = req.query; // Assuming query is the search parameter

  financialModel.find({
    $or: [
      { First_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      { Last_name: { $regex: query, $options: 'i' } },
      // Add other fields you want to search here
    ]
  })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

//////////////////////
app.post('/Appointmentlist', (req, res)=>{
  AppointmentModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
app.post('/addmittedlist', (req, res)=>{
  AddmittedModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
app.post('/dischargedlist', (req, res)=>{
  DischargedModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
app.post('/referedlist', (req, res)=>{
  ReferedModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
//getting the appointed, addmitted, and refered patient list from the database
app.get('/Appointment', (req, res) => {
  AppointmentModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});
/////////////////
app.get('/Appointment/search', (req, res) => {
  const { query } = req.query; // Assuming query is the search parameter

  AppointmentModel.find({})
  .find({
    $or: [
      { First_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      { Last_name: { $regex: query, $options: 'i' } },
      // Add other fields you want to search here
    ]
  })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/admitted', (req, res) => {
  AddmittedModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});
app.get('/admitted/search', (req, res) => {
  const { query } = req.query; // Assuming query is the search parameter

  AddmittedModel.find({
    $or: [
      { First_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      { Last_name: { $regex: query, $options: 'i' } },
      // Add other fields you want to search here
    ]
  })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/////////////////
app.get('/referedlists', (req, res) => {
  ReferedModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.get('/referedLists/search', (req, res) => {
  const { query } = req.query; // Assuming query is the search parameter

  ReferedModel.find({
    $or: [
      { First_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      { Last_name: { $regex: query, $options: 'i' } },
      // Add other fields you want to search here
    ]
  })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/dischargedlist', (req, res) => {
  DischargedModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});
app.get('/dischargedlist/search', (req, res) => {
  const { query } = req.query; // Assuming query is the search parameter

  DischargedModel.find({
    $or: [
      { First_name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      { Last_name: { $regex: query, $options: 'i' } },
      // Add other fields you want to search here
    ]
  })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

//create faqs 
app.post('/createFaq', (req, res)=>{
  faqModel.create(req.body)
  .then(patient=>res.json(patient))
  .catch(err=>console.log(err))
})
//deleting faq
app.delete('/deleteFaq/:id', (req, res)=>{
  const id = req.params.id;
  faqModel.findByIdAndDelete({_id: id})
 .then(() => res.json({ message: 'User deleted successfully' }))
  .catch(err=>res.status(500).json(err));
})
///
app.get('/getfaq', (req, res)=>{
  faqModel.find({})
  .then(result => res.json(result))
  .catch(err=>res.status(500).json(err))
})
///////////////////////
app.delete('/deleteuser/:id', (req, res)=>{
  const id = req.params.id;
  NewModel.findByIdAndDelete({_id: id})
 .then(() => res.json({ message: 'User deleted successfully' }))
  .catch(err=>res.status(500).json(err));
})
//Global ERROR Handler
app.use((err, req, res, next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message:err.message,
  });
});
//server
const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`App running on ${PORT}`)
})