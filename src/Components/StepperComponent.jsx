import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import interviewData from "./interviewData";
import InterviewDetails from "./InterviewDetails";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";
import { StepButton } from "@mui/material";


const steps = [
  {
    label: 'Telephonic Round',
    time: '2 Apr, 21:00-21:30',
    panel: 'panel1',
    videoLink: 'https://meet.google.com/ibh-fkcu-uzs',
  },
  {
    label: 'Onsite',
    time: '5 Apr, 10:00-12:00',
    panel: 'panel2',
    videoLink: 'https://meet.google.com/xyz-abc-123',
  },
  {
    label: 'Low level design',
    time: '7 Apr, 14:00-15:30',
    panel: 'panel3',
    videoLink: 'https://meet.google.com/lmn-opq-rst',
  },
  {
    label: 'Hiring manager',
    time: '10 Apr, 16:00-17:00',
    panel: 'panel4',
    videoLink: 'https://meet.google.com/uvw-xyz-456',
  },
];


// Custom Step Icon Component
function CustomStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: completed ? "white" : active ? "orange" : "grey",
      }}
    >
      {completed ? (
        <CheckCircleIcon sx={{ color: "green", fontSize: 32 }} />
      ) : active ? (
        <AccessTimeIcon sx={{ color: "white", fontSize: 20 }} />
      ) : (
        <RemoveIcon sx={{ color: "white", fontSize: 20 }} />
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
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted((prevCompleted) => ({
      ...prevCompleted,
      [activeStep]: true,
    }));
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((round, index) => (
          <Step key={round.label} completed={completed[index]}>
            <StepButton
              // StepIconComponent={CustomStepIcon}
              onClick={() => handleStep(index)}
            >
              {round.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: "black" }}>
            All steps completed - you're finished
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
        <InterviewDetails round={steps[activeStep]} />
          {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            Step {activeStep + 1}
          </Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: 'inline-block', color: 'black' }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? 'Finish'
                    : 'Complete Step'}
                </Button>
              ))}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
