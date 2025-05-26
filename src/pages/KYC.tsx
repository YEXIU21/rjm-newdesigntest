import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';
import '../styles/KYC.css';

const KYC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    idType: '',
    idNumber: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    frontIdImage: null as File | null,
    backIdImage: null as File | null,
    selfieImage: null as File | null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadPreview, setUploadPreview] = useState({
    frontId: '',
    backId: '',
    selfie: ''
  });

  const steps = [
    'Personal Information',
    'Document Upload',
    'Verification'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'frontIdImage' | 'backIdImage' | 'selfieImage', previewField: 'frontId' | 'backId' | 'selfie') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [field]: 'File must be JPG, JPEG, or PNG'
        });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({
          ...errors,
          [field]: 'File size must be less than 5MB'
        });
        return;
      }
      
      // Clear error if any
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: ''
        });
      }
      
      // Update form data with file
      setFormData({
        ...formData,
        [field]: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setUploadPreview({
            ...uploadPreview,
            [previewField]: e.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (activeStep) {
      case 0:
        if (!formData.idType) newErrors.idType = 'ID type is required';
        if (!formData.idNumber) newErrors.idNumber = 'ID number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP/Postal code is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
      case 1:
        if (!formData.frontIdImage) newErrors.frontIdImage = 'Front side of ID is required';
        if (!formData.backIdImage) newErrors.backIdImage = 'Back side of ID is required';
        if (!formData.selfieImage) newErrors.selfieImage = 'Selfie with ID is required';
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
      // Submit KYC data to API
      console.log('KYC data:', formData);
      // Show success message or redirect
      setActiveStep(steps.length);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="step-content">
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.idType} margin="normal">
                  <InputLabel id="id-type-label">ID Type</InputLabel>
                  <Select
                    labelId="id-type-label"
                    name="idType"
                    value={formData.idType}
                    label="ID Type"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="nationalId">National ID</MenuItem>
                    <MenuItem value="drivingLicense">Driving License</MenuItem>
                  </Select>
                  {errors.idType && <FormHelperText>{errors.idType}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ID Number"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  error={!!errors.idNumber}
                  helperText={errors.idNumber}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.nationality} margin="normal">
                  <InputLabel id="nationality-label">Nationality</InputLabel>
                  <Select
                    labelId="nationality-label"
                    name="nationality"
                    value={formData.nationality}
                    label="Nationality"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="philippines">Philippines</MenuItem>
                    <MenuItem value="singapore">Singapore</MenuItem>
                    <MenuItem value="malaysia">Malaysia</MenuItem>
                    <MenuItem value="indonesia">Indonesia</MenuItem>
                    <MenuItem value="thailand">Thailand</MenuItem>
                    <MenuItem value="vietnam">Vietnam</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.nationality && <FormHelperText>{errors.nationality}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.country} margin="normal">
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    name="country"
                    value={formData.country}
                    label="Country"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="philippines">Philippines</MenuItem>
                    <MenuItem value="singapore">Singapore</MenuItem>
                    <MenuItem value="malaysia">Malaysia</MenuItem>
                    <MenuItem value="indonesia">Indonesia</MenuItem>
                    <MenuItem value="thailand">Thailand</MenuItem>
                    <MenuItem value="vietnam">Vietnam</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box className="step-content">
            <Alert severity="info" sx={{ mb: 3 }}>
              Please upload clear images of your ID document and a selfie holding your ID
            </Alert>
            
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Paper className="upload-container" elevation={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Front side of ID
                  </Typography>
                  <Box className="upload-preview">
                    {uploadPreview.frontId ? (
                      <img src={uploadPreview.frontId} alt="Front ID Preview" className="preview-image" />
                    ) : (
                      <BadgeIcon className="upload-icon" />
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    className="upload-button"
                  >
                    Upload Front
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'frontIdImage', 'frontId')}
                    />
                  </Button>
                  {errors.frontIdImage && (
                    <Typography color="error" variant="caption" className="error-text">
                      {errors.frontIdImage}
                    </Typography>
                  )}
                </Paper>
              </Grid>
              
              <Grid xs={12} md={4}>
                <Paper className="upload-container" elevation={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Back side of ID
                  </Typography>
                  <Box className="upload-preview">
                    {uploadPreview.backId ? (
                      <img src={uploadPreview.backId} alt="Back ID Preview" className="preview-image" />
                    ) : (
                      <BadgeIcon className="upload-icon" />
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    className="upload-button"
                  >
                    Upload Back
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'backIdImage', 'backId')}
                    />
                  </Button>
                  {errors.backIdImage && (
                    <Typography color="error" variant="caption" className="error-text">
                      {errors.backIdImage}
                    </Typography>
                  )}
                </Paper>
              </Grid>
              
              <Grid xs={12} md={4}>
                <Paper className="upload-container" elevation={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Selfie with ID
                  </Typography>
                  <Box className="upload-preview">
                    {uploadPreview.selfie ? (
                      <img src={uploadPreview.selfie} alt="Selfie Preview" className="preview-image" />
                    ) : (
                      <BadgeIcon className="upload-icon" />
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    className="upload-button"
                  >
                    Upload Selfie
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'selfieImage', 'selfie')}
                    />
                  </Button>
                  {errors.selfieImage && (
                    <Typography color="error" variant="caption" className="error-text">
                      {errors.selfieImage}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box className="step-content verification-step">
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your information before submitting
            </Alert>
            <Typography variant="body1" gutterBottom>
              <strong>ID Type:</strong> {formData.idType === 'passport' ? 'Passport' : 
                formData.idType === 'nationalId' ? 'National ID' : 
                formData.idType === 'drivingLicense' ? 'Driving License' : ''}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>ID Number:</strong> {formData.idNumber}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Date of Birth:</strong> {formData.dateOfBirth}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Nationality:</strong> {formData.nationality}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {formData.address}, {formData.city}, {formData.zipCode}, {formData.country}
            </Typography>
            
            <Box className="document-review">
              <Typography variant="subtitle1" gutterBottom>
                Uploaded Documents:
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Box className="document-thumbnail">
                    {uploadPreview.frontId && (
                      <img src={uploadPreview.frontId} alt="Front ID" className="thumbnail-image" />
                    )}
                    <Typography variant="caption">Front ID</Typography>
                  </Box>
                </Grid>
                <Grid xs={4}>
                  <Box className="document-thumbnail">
                    {uploadPreview.backId && (
                      <img src={uploadPreview.backId} alt="Back ID" className="thumbnail-image" />
                    )}
                    <Typography variant="caption">Back ID</Typography>
                  </Box>
                </Grid>
                <Grid xs={4}>
                  <Box className="document-thumbnail">
                    {uploadPreview.selfie && (
                      <img src={uploadPreview.selfie} alt="Selfie" className="thumbnail-image" />
                    )}
                    <Typography variant="caption">Selfie with ID</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className="kyc-container">
      <Paper elevation={3} className="kyc-paper">
        <Box className="kyc-header">
          <VerifiedUserIcon className="kyc-icon" />
          <Typography variant="h4" component="h1" gutterBottom className="kyc-title">
            KYC Verification
          </Typography>
        </Box>
        
        <Stepper activeStep={activeStep} alternativeLabel className="kyc-stepper">
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
                Your KYC verification has been submitted successfully! We will review your documents and update you within 24-48 hours.
              </Alert>
              <Button
                variant="contained"
                color="primary"
                href="/account"
                className="action-button"
              >
                Go to Account
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

export default KYC; 