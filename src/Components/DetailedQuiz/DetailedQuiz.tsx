import React from "react";
import { ProgressBar } from "react-bootstrap";
export function DetailedQuiz() {
  const progress = 40;
    return (
      <div>
        <h1>Detailed Quiz</h1>
        <p>This interactive career quiz is designed to help you discover your strengths, interests, and ideal work environment through thoughtful, imaginative questions. By exploring your values, preferences, and aspirations, the quiz offers insights into potential career paths that align with your personality and passions. Whether you're dreaming big or thinking practically, each question helps paint a clearer picture of what careers might be the best fit for you.</p>
        <ProgressBar now={progress} label={`${progress}%`}/>
      </div>
    );
  }