const mongoose = require('mongoose');

const FinancialRecordSchema = new mongoose.Schema({
  First_name: {
    type: String,
    required: true
  },
  Last_name: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true,
    lowercase: true, // Ensure the gender value is stored in lowercase
    set: function(gender) {
      // Convert "male" to "M" and "female" to "F"
      return gender.toLowerCase() === 'male' ? 'M' : (gender.toLowerCase() === 'female' ? 'F' : gender);
    },
    get: function(gender) {
      // Convert "M" to "Male" and "F" to "Female"
      return gender.toUpperCase() === 'M' ? 'Male' : (gender.toUpperCase() === 'F' ? 'Female' : gender);
    }
  },
  Age: {
    type: Number,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  Zone: {
    type: String,
    required: true
  },
  Woreda: {
    type: String,
    required: true
  },
  Tabiya: {
    type: String,
    required: true
  },
  DateTime: {
    type: Date,
    required: true
  },
  RegistrationYear: {
    type: Number,
    required: true
  },
  RegistrationMonth: {
    type: String,
    required: true
  },
  RegistrationWeek: {
    type: Number,
    required: true
  },
  RegistrationDayOfWeek: {
    type: String,
    required: true
  },
  amount:Number,
  method:String,
});
const FinancialRecord = mongoose.model('FinancialRecord', FinancialRecordSchema);
module.exports = FinancialRecord;
