const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    'Blood Type': {
        type: String,
        required: true
    },
    'Medical Condition': {
        type: String,
        required: true
    },
    'Date of Admission': {
        type: Date,
        required: true
    },
    Doctor: {
        type: String,
        required: true
    },
    Hospital: {
        type: String,
        required: true
    },
    'Insurance Provider': {
        type: String,
        required: true
    },
    'Billing Amount': {
        type: Number,
        required: true
    },
    'Room Number': {
        type: Number,
        required: true
    },
    'Admission Type': {
        type: String,
        required: true
    },
    'Discharge Date': {
        type: Date,
        required: true
    },
    Medication: {
        type: String,
        required: true
    },
    'Test Results': {
        type: String,
        required: true
    }
});
const Patient = mongoose.model('totalpatientslists', patientSchema);

module.exports = Patient;