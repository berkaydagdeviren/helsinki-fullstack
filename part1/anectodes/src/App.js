import { useState } from 'react'

const Button = ({ onClick, text }) => <div>
  <button onClick={onClick}>{text}</button>
</div>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const points = [0, 0, 0, 0, 0, 0, 0]
  
   
 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)
  const handleClick = () => {
    const randInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randInt)
  }
  const bestVoted= votes.indexOf(Math.max(...votes))
  const handleVote= () => {
    const copy =  [...votes]
    copy[selected] += 1
    setVotes(copy);
    console.log(copy)
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} has {votes[selected]} votes
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleClick} text="next anecdote" />
      <div>
        <h1>Anecdote with best votes</h1>
        {anecdotes[bestVoted]} <b> has {votes[bestVoted]} votes</b>
      </div>
    </div>
  )
}

export default App