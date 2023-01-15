import { useState } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

export default function Counter() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalCount = good + neutral + bad;
  const pcositivePercentageCount = Math.round((good * 100) / totalCount);

  const onButtonClik = event => {
    const target = event.target.textContent.toLowerCase();
    switch (target) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onButtonClik}
        />
      </Section>

      <Section title={'Statistics'}>
        {totalCount > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalCount}
            positivePercentage={pcositivePercentageCount}
          />
        ) : (
          <Notification message={'There is no feedback'}></Notification>
        )}
      </Section>
    </div>
  );
}
