//import React from 'react';
const DetailedAssesmentQuestions = [
    'Imagine you had to teach a class on any subject or skill—what would it be, and what would make you an expert?',
    'If you could develop any new skill or talent – what would it be and how would you use it?',
    'If you could spend all day doing one activity without getting tired, what would it be and why?',
    'If you’re on a sinking ship with one item of your choosing – what would it be and why did you choose that?',
    'If you could have dinner with any professional, who would it be, and what would you ask them?',
    'Describe your ideal workspace. What is there? How does it help you stay in work mode?',
    'If you could be any character in your favorite movie who would it be? Why did you choose that character?'
  ]

function DetailedAssesment() {
  return (
    <div>
    <h1>Detailed Assessment</h1>
    <ul>
      {DetailedAssesmentQuestions.map((question: string) => (<li style={{padding: '50px'}}>{question}</li>))}
    </ul>
    </div>
  )
}

export default DetailedAssesment
