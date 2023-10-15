import React, { useState } from 'react';
import { FeedbackOptions } from 'components/FeedBackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';
import css from './App.module.css';

export function App() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const totalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const positivePercentage = () => {
    if (totalFeedback() === 0) {
      return 0;
    }
    return Math.round((feedback.good / totalFeedback()) * 100);
  };

  const options = Object.keys(feedback);

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback() !== 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback()}
            positivePercentage={positivePercentage()}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
}
