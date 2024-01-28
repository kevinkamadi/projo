import React from 'react';
import { format, isValid } from 'date-fns';

const GameScoresPanel = ({ scores, onClose }) => {

  console.log(Date.now())
  return (
    <div className="scores-panel">
      <div className="scores-header">
        <h2>Game Scores</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      <div className="scores-list">
        {scores && scores.length > 0 ? (
          scores.map((score, index) => (
            <div key={index} className="score-item">
              <div>
                <strong>Player 1 Total Jail Years:</strong> {score.totalJailYearsPlayer1}
              </div>
              <div>
                <strong>Player 2 Total Jail Years:</strong> {score.totalJailYearsPlayer2}
              </div>
              <div>
                <strong>Winner:</strong> {score.winner}
              </div>
              <div>
                <strong>Date and Time</strong> {isValid(new Date(score.timestamp))
                  ? format(new Date(score.timestamp), 'MM/dd/yyyy HH:mm:ss')
                  : 'Could not get date and time '}
              </div>
            </div>
          ))
        ) : (
          <div>No game scores available.</div>
        )}
      </div>
    </div>
  );
};

export default GameScoresPanel;