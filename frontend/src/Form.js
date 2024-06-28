import React, { useState } from 'react';
import { Button, Typography, Box, Grid, Paper, FormControl, InputLabel, FilledInput, InputAdornment, Select, MenuItem } from '@mui/material';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import axios from 'axios';
import main_heading from './main_heading.jpg';

const colors = {
  background: 'rgba(15, 15, 15, 0.8)',
  text: '#E5E5E5',
  button: '#FA8231',
  buttonText: '#0F0F0F',
  inputBackground: '#1C1C1C',
  borderColor: '#3D3D3D',
  headingText: '#EFEFEF',
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    totalMass: '',
    paintedBodyColour: '',
    paintedGlossBlack: '',
    grainedPlastic: '',
    year: '',
    countryOfProduction: '',
    vehicleVolume: '',
    numberOfParts: '',
  });
  const [predictedValue, setPredictedValue] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData); // Update with your API endpoint
      setPredictedValue(response.data.Prediction);
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  // Function to generate past and future years for the dropdown
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear + 12; year >= currentYear - 30; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={main_heading}
        alt="Contact"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'contrast(70%) brightness(70%)',
          zIndex: -1,
        }}
      />
      <Grid container spacing={0} sx={{ minHeight: '100vh', width: '100vw', m: 0, alignItems: 'center' }}>
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 0 }}>
          <Typography variant="h3" sx={{ color: colors.headingText, fontWeight: 'bold', mt: 2 }}>
            {/* Heavy Drivers Cost Predictor */}
            Future Parts Cost Predictor
          </Typography>
          <Typography variant="h5" sx={{ color: colors.headingText, fontWeight: 'bold', mt: 2 }}>
            {/* Heavy Drivers Cost Predictor */}
            Made with ❤️ and ☕ by Heavy Drivers 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              backgroundColor: colors.background,
              color: colors.text,
              padding: 4,
              margin: 2,
              borderRadius: 2,
              width: '80%',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Typography variant="h5" align="center" sx={{ color: colors.headingText, fontWeight: 'bold', mb: 2 }}>
              Enter the details to predict the cost
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Total Mass (in Kg)</InputLabel>
                    <FilledInput
                      name="totalMass"
                      value={formData.totalMass}
                      onChange={handleChange}
                      placeholder="Enter total mass"
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    />
                  </FormControl>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Painted Body Colour (in sq meters)</InputLabel>
                    <FilledInput
                      name="paintedBodyColour"
                      value={formData.paintedBodyColour}
                      onChange={handleChange}
                      placeholder="Enter painted body colour"
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    />
                  </FormControl>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Painted Gloss Black (in sq meters)</InputLabel>
                    <FilledInput
                      name="paintedGlossBlack"
                      value={formData.paintedGlossBlack}
                      onChange={handleChange}
                      placeholder="Enter painted gloss black"
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    />
                  </FormControl>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Grained Plastic (in sq meters)</InputLabel>
                    <FilledInput
                      name="grainedPlastic"
                      value={formData.grainedPlastic}
                      onChange={handleChange}
                      placeholder="Enter grained plastic"
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Job 1 Date</InputLabel>
                    <Select
                      value={formData.year}
                      onChange={handleChange}
                      name="year"
                      fullWidth
                      displayEmpty
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    >
                      <MenuItem value="" disabled>
                        {/* Select year */}
                      </MenuItem>
                      {generateYearOptions().map((year, index) => (
                        <MenuItem key={index} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Country of Production</InputLabel>
                    <Select
                      value={formData.countryOfProduction}
                      onChange={handleChange}
                      name="countryOfProduction"
                      fullWidth
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    >
                      <MenuItem value="UK">UK</MenuItem>
                      <MenuItem value="SVK">SVK</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="filled" fullWidth sx={{ mb: 2 }}>
                    <InputLabel sx={{ color: colors.text }}>Vehicle Volume (per year)</InputLabel>
                    <FilledInput
                      name="vehicleVolume"
                      value={formData.vehicleVolume}
                      onChange={handleChange}
                      placeholder="Enter vehicle volume"
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    />
                  </FormControl>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel sx={{ color: colors.text }}>Number of Parts within Construction</InputLabel>
                    <FilledInput
                      name="numberOfParts"
                      value={formData.numberOfParts}
                      onChange={handleChange}
                      placeholder="Enter number of parts within construction"
                      sx={{ backgroundColor: colors.inputBackground, color: colors.text }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.button,
                  color: colors.buttonText,
                  '&:hover': {
                    bgcolor: colors.button,
                  },
                  mt: 2,
                }}
                type="submit"
              >
                Predict
              </Button>
            </Box>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, width: '80%', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', padding: '0 30px' }}>
            <Typography variant="h6" sx={{ color: colors.headingText, mr: 2, width: '50%', textAlign: 'left' }}>
              Predicted Cost:
            </Typography>
            <FormControl variant="filled" sx={{ width: '50%' }}>
              <FilledInput
                value={predictedValue}
                readOnly
                startAdornment={<InputAdornment position="start" sx={{ color: colors.text, fontSize: '1.5rem' }}><CurrencyPoundIcon /></InputAdornment>}
                sx={{ backgroundColor: colors.inputBackground, color: colors.text, textAlign: 'center', paddingBottom: '5px' }}
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
