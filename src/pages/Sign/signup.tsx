import React from "react";
import * as S from "./styled";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
// Icons
import WestIcon from "@mui/icons-material/West";

interface CheckboxTypes {
  type: "mentor" | "mentee";
  id: string;
}
const steps = ["회원 유형 선택", "개인 정보 입력", "선배 등록", "완료"];
const SignUp: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("현재 단계에서 건너뛰기를 할 수 없습니다.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <S.Wrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          padding: "0.3rem 24px",
        }}
      >
        <S.LogInTitle>회원가입</S.LogInTitle>
        <Link to="/index">
          <WestIcon sx={{ fontSize: "28px" }} />
        </Link>
      </Box>
      {/* stepper */}
      <Box sx={{ padding: "0px 24px" }}>
        <S.SignStepper activeStep={activeStep} sx={{ margin: "1.5rem 0" }}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <S.StepperLabel {...labelProps}>{label}</S.StepperLabel>
              </Step>
            );
          })}
        </S.SignStepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              모든 회원 가입 절차가 끝났습니다.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handleReset}>
                홈으로 돌아가기
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1 }}>
              {/* 회원 유형 선택 */}
              {activeStep + 1 === 1 && <ChooseMemberType />}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                pt: 2,
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  fontSize: "0.5rem",
                  fontWeight: "bold",
                  padding: "0.5rem 0",
                  borderRadius: "14px",
                }}
              >
                이전
              </Button>
              <Box
                sx={{
                  flex: "1 1 auto",
                  fontSize: "0.5rem",
                  fontWeight: "bold",
                }}
              />
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleSkip}
                  sx={{
                    mr: 1,
                    fontSize: "0.5rem",
                    fontWeight: "bold",
                    padding: "0.5rem 0px",
                    borderRadius: "14px",
                  }}
                >
                  건너뛰기
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  fontSize: "0.5rem",
                  fontWeight: "bold",
                  padding: "0.5rem 0px",
                  borderRadius: "14px",
                }}
              >
                {activeStep === steps.length - 1 ? "완료" : "다음으로"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </S.Wrapper>
  );
};

function ChooseMemberType() {
  return (
    <Box>
      <S.SignUpSubTitle>회원가입</S.SignUpSubTitle>
      <S.SignUpTitle>회원 유형 선택</S.SignUpTitle>
      <Box>
        <Checkbox type="mentor" id="mentor" />
        <Checkbox type="mentee" id="mentee" />
      </Box>
    </Box>
  );
}

function Checkbox({ type, id }: CheckboxTypes) {
  const [activeCheck, setActiveCheck] = React.useState<string | null>(null);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setActiveCheck(id);
    } else {
      setActiveCheck(null);
    }
  };

  return (
    <S.SignUpLabel className={activeCheck === id ? "active" : ""}>
      <S.CheckInput
        type="checkbox"
        onChange={handleClick}
        name="member"
        checked={activeCheck === id}
      />
      {/* <S.CheckSubText> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          fontSize: "0.5rem",
          marginLeft: "0.7rem",
        }}
      >
        <S.ChooseMemberTypeTitle>
          {type === "mentor" ? "선배" : "후배"}
        </S.ChooseMemberTypeTitle>
        <S.ChooseMemberTypeContext>
          {type === "mentor"
            ? "코딩을 가르쳐 줄거에요! (대학생만 가능합니다!)"
            : "코딩을 배울거에요!"}
        </S.ChooseMemberTypeContext>
      </Box>
      {/* </S.CheckSubText> */}
    </S.SignUpLabel>
  );
}

export default SignUp;
