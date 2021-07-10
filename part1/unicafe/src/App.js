import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ feedback, total }) => {
  if (total) {
    return (
      <table>
        <tbody>
          <Statistic value={feedback.good} text="Good" />
          <Statistic value={feedback.neutral} text="Neutral" />
          <Statistic value={feedback.bad} text="Bad" />
          <Statistic value={total} text="Total" />
          <Statistic value={(feedback.good - feedback.bad) / total} text="Average" />
          <Statistic value={(feedback.good / total) * 100} text="Positive" />
        </tbody>
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
  } else if (text === "Positive") {
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
  );
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
  const total = feedback.good + feedback.neutral + feedback.bad;

  const handleGood = () => setFeedback({ ...feedback, good: feedback.good + 1 });
  const handleNeutral = () => setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  const handleBad = () => setFeedback({ ...feedback, bad: feedback.bad + 1 });

  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />

      <Header text="Statistics" />
      <Statistics feedback={feedback} total={total} />
    </div>
  );
};

export default App;
