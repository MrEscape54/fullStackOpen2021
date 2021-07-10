const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Content = ({ parts }) => {
  const total = parts.reduce((accum, currentPart) => accum + currentPart.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <h3>Total of {total} exercises</h3>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
