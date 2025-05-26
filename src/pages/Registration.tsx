import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  Stepper, 
  Step, 
  StepLabel,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SecurityIcon from '@mui/icons-material/Security';
import '../styles/Registration.css';

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    'Personal Information', 
    'Contact Details', 
    'Account Setup', 
    'Verification'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (activeStep) {
      case 0:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        break;
      case 1:
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10,12}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
        break;
      case 2:
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
      case 3:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Submit registration data to API
      console.log('Registration data:', formData);
      // Show success message or redirect
      setActiveStep(steps.length);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="step-content">
            <Box className="form-row">
              <Box className="form-field">
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: <PersonAddIcon className="input-icon" />,
                  }}
                />
              </Box>
              <Box className="form-field">
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: <PersonAddIcon className="input-icon" />,
                  }}
                />
              </Box>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box className="step-content">
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <EmailIcon className="input-icon" />,
              }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <PhoneAndroidIcon className="input-icon" />,
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box className="step-content">
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <SecurityIcon className="input-icon" />,
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <SecurityIcon className="input-icon" />,
              }}
            />
          </Box>
        );
      case 3:
        return (
          <Box className="step-content">
            <Alert severity="info" sx={{ mb: 2 }}>
              Please review your information before submitting
            </Alert>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {formData.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Username:</strong> {formData.username}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
            />
            {errors.termsAccepted && (
              <Typography color="error" variant="caption">
                {errors.termsAccepted}
              </Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <Paper elevation={3} className="registration-paper">
        <Typography variant="h4" component="h1" gutterBottom className="registration-title">
          Player Registration
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel className="registration-stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
          {activeStep === steps.length ? (
            <Box className="success-message">
              <Alert severity="success">
                Registration successful! You can now log in to your account.
              </Alert>
              <Button
                variant="contained"
                color="primary"
                href="/login"
                className="action-button"
              >
                Go to Login
              </Button>
            </Box>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box className="button-container">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="back-button"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className="next-button"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="next-button"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </>
          )}
        </form>
      </Paper>
    </div>
  );
};

export default Registration; 