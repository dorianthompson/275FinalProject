import React from 'react'
const BasicAssessmentQuestions = [
    'I thrive in a quiet work environment.',
    'I thrive when working in a group.',
    'I prefer a sedentary work style.',
    'I enjoy talking to new people every day.',
    'I enjoy maths and sciences.',
    'I am very interested in creative outlets like film, art, literature, music, etc.',
    'I enjoy looking after children or taking care of people.'
  ]

  const BasicMultipleChoiceQuestions =[
    'Not at all like me',
    'Not much like me',
    'Neutral',
    'Somewhat like me',
    'Very much like me'
  ]
  const basicAssesmentDescription = 'Our Basic Career Assessment asks the user questions surrounding different work situations and gives them 5 options to best describe how they feel in each scenario. Questions like these allow us to get some basic knowledge about the user so we can start forming results on fields the user may best be suited to work in. Please select the answer for each question that best fits your personal interest or working style.'
function BasicAssessment() {
  return (
    <div>
        <h1>Basic Assessment</h1>
        <h2 style={{textAlign: 'center', paddingBottom: '10px'}}>{basicAssesmentDescription}</h2>
      <ol>
        {BasicAssessmentQuestions.map((question:string) => (
            <div>
            <li style={{padding:'5px', fontWeight: 'bold'}}>{question}</li>
            <ul>
                {BasicMultipleChoiceQuestions.map((option:string)=> (
                    <li style={{padding:'5px'}}>{option}</li>
                ))}
            </ul>
            </div>
        ))}
      </ol>
    </div>
  )
}

export default BasicAssessment
