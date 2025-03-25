import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import interviewData from './interviewData';
import InterviewDetails from './InterviewDetails';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';

// Custom Step Icon Component
function CustomStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: completed ? 'white' : active ? 'orange' : 'grey',
      }}
    >
      {completed ? (
        <CheckCircleIcon sx={{ color: 'green', fontSize: 32 }} />
      ) : active ? (
        <AccessTimeIcon sx={{ color: 'white', fontSize: 20 }} />
      ) : (
        <RemoveIcon sx={{ color: 'white', fontSize: 20 }} />
      )}
    </Box>
  );
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {interviewData.map((round) => (
          <Step key={round.label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{round.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === interviewData.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: 'black' }}>
            All steps completed - you're finished
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <InterviewDetails round={interviewData[activeStep]} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              sx={{
                mr: 1,
                bgcolor: activeStep === 0 ? 'grey' : 'red',
                color: 'white',
                '&:hover': { bgcolor: activeStep === 0 ? 'grey' : 'darkred' },
              }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {activeStep === interviewData.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}