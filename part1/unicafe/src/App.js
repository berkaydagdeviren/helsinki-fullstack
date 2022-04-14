import { useState } from 'react'

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return(
    <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}{text === 'Positive'? <span>%</span>: null}</td>
        </tr>
      </tbody>
  </table>
    )
}


const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='All Clicks' value={good + neutral + bad} />
      <StatisticLine text='Avarage Score' value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text='Positive' value={good / (good + bad) * 100} />
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const [allClicks, setAll] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => { setGood(good + 1) }} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App