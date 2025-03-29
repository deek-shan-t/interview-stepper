import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InterviewDetails from "./InterviewDetails";
import StepLabel from "@mui/material/StepLabel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";

const steps = [
  { label: "Telephonic Round", time: "2 Apr, 21:00-21:30", panel: "panel1", videoLink: "https://meet.google.com/ibh-fkcu-uzs" },
  { label: "Onsite", time: "5 Apr, 10:00-12:00", panel: "panel2", videoLink: "https://meet.google.com/xyz-abc-123" },
  { label: "Low level design", time: "7 Apr, 14:00-15:30", panel: "panel3", videoLink: "https://meet.google.com/lmn-opq-rst" },
  { label: "Hiring manager", time: "10 Apr, 16:00-17:00", panel: "panel4", videoLink: "https://meet.google.com/uvw-xyz-456" },
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((_, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStep = (step) => () => setActiveStep(step);
  const handleComplete = () => {
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const CustomStepIcon = ({ active, completed }) => {
    if (completed) return <CheckCircleIcon style={{ color: "green", fontSize: 26 }} />;
    return (
      <Box
        sx={{
          backgroundColor: active ? "orange" : "grey",
          borderRadius: "50%",
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {active ? (
          <AccessTimeIcon style={{ color: "white", fontSize: 18 }} />
        ) : (
          <RemoveIcon style={{ color: "white", fontSize: 18 }} />
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>
              <StepLabel StepIconComponent={CustomStepIcon}>{step.label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1, color: "black" }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <InterviewDetails round={steps[activeStep]} />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
              {activeStep !== steps.length && (
                completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: "inline-block" }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
                  </Button>
                )
              )}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
