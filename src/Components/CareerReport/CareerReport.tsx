import { useLocation } from 'react-router-dom'
import CareerReportCard from '../CareerReportCard/CareerReportCard';

function CareerReport() {
    const {state} = useLocation();
    console.log(state.data.choices[0]);

    function splitString(text: string): string[] {
      return text.split(/\d\./);
    }
    
    const text = state.data.choices[0].message.content;
    const result = splitString(text);
    console.log(result)

    
  return (
    <div>
      <h1 style={{textAlign: 'center', marginBottom: '2vh', marginTop: '-2vh'}}>Your Career Report</h1>
      {/*<h2 style={{marginBottom: '2vh'}}>{result[0]}</h2>*/}
      <ol>{result.slice(1).map((choice) => {
        let split_up_string = choice.split(':')
        let role = split_up_string[0]
        let description = split_up_string[1];
        return <CareerReportCard role={role} description={description}/>
      })}</ol>
  
    </div>
  )
}

export default CareerReport
