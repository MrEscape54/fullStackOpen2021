import { useState } from "react";

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const Anecdote = ({ anecdote }) => <p>{anecdote}</p>;
const Votes = ({ votes }) => <p>Has {votes} votes</p>;
const BestAnecdote = ({ anecdote }) => <p>Anecdote with more votes: {anecdote}</p>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const handleAnecdote = () => {
    let randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    while (randomAnecdote === selected) {
      randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomAnecdote);
  };

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };
  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={votes[selected]} />
      <BestAnecdote anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} />
      <Button handleClick={handleVotes} text="Vote" />
      <Button handleClick={handleAnecdote} text="Next Anecdote" />
    </div>
  );
};

export default App;
