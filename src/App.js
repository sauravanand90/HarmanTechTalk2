import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from './components/Carousel';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [inputFeedback, setFeedbackValue] = useState('');

  function handleInputChange(event){
    setInputValue(event.target.value); // event-bubbling.
    console.log(event.target.value);
  }

  function handleFeedbackChange(event){
    setFeedbackValue(event.target.value); // event-bubbling.
    console.log(event.target.value);
  }

  async function submit(event){
    event.preventDefault();
    // console.log(inputValue);
    // console.log(inputFeedback);
    let formData = {name : inputValue, feedback: inputFeedback};
    try {
      const response = await axios.post('/api/feedback', formData);
      console.log('API response:', response.data);
      // You can display a success message to the user or perform other actions here
    } catch (error) {
      console.error('API error:', error);
      // You can display an error message to the user or perform other actions here
    }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/data');
      setData(response.data);
    }
    // fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        HARMAN TECH TALK : WEB DEV AND DEPLOY PART 2. 
      </header>
        <div className='center-align'>
          <h1>APPLEICIOUS</h1>
          <Carousel />
        </div>

        <div className='center-align'>
          <h1> Interested !!! </h1>
          <h2> Please fill in your details, we will get in touch ... </h2>
        </div>
        <form className='responsive' onSubmit={submit}>
          <input type="text" value={inputValue} onChange={handleInputChange} required placeholder='Your Name' className="form-style"></input>
            <textarea
              required
              placeholder='We are new to selling apples. Please suggest some ideas like selling Apple Pies !!'
              value={inputFeedback}
              onChange={handleFeedbackChange}
              style={{ resize: 'vertical', minHeight: '50px', minWidth : '50%' }}
            />
            <button type='submit'>Submit</button>
        </form>


        <table className='center'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Suggestions </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr>
                <td style={{border: '2px solid blue'}}>{item.name}</td>
                <td>{item.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>


    </div>
  );
}

export default App;