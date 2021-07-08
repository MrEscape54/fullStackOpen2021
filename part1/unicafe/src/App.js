import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ feedback }) => {
  if (feedback.total) {
    return (
      <table>
        <Statistic value={feedback.good} text="Good" />
        <Statistic value={feedback.neutral} text="Neutral" />
        <Statistic value={feedback.bad} text="Bad" />
        <Statistic value={feedback.total} text="Total" />
        <Statistic value={(feedback.good - feedback.bad) / feedback.total} text="Average" />
        <Statistic value={feedback.good / feedback.total * 100} text="Positive" />
      </table>
    );
  }
  return <div>No feedback given</div>;
};

const Statistic = ({ value, text }) => {
  if (text === "Average") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(1)}</td>
      </tr>
    );
  }
  else if (text === "Positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(1)} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0, total: 0 });

  const handleGood = () =>
    setFeedback({ 
      ...feedback, 
      good: feedback.good + 1, 
      total: feedback.total + 1 
    });

  const handleNeutral = () =>
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
      total: feedback.total + 1,
    });

  const handleBad = () =>
    setFeedback({ ...feedback, 
      bad: feedback.bad + 1, 
      total: feedback.total + 1 
    });

  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />

      <Header text="Statistics" />
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
