import { useLocation } from 'react-router-dom'

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
      <h2 style={{marginBottom: '2vh'}}>{result[0]}</h2>
      <ol>{result.slice(1).map((choice) => <li>{choice + "\n"}</li>)}</ol>
      
    </div>
  )
}

export default CareerReport
