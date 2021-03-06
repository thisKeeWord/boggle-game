import React, { Component } from 'react';

export default class ScoreCard extends Component {
  // mouseEnter(word) {
  // this.props.setSelected(word);
  // }

  // mouseLeave() {
  //   this.props.setSelected('');
  // }

  render() {
    let foundLabels = [], wordLabels = [];
    this.props.found.map((word, i) => {
      foundLabels.push(<span className="label label-warning" key={i} onMouseEnter={() => this.props.setSelected(word)} onMouseLeave={() => this.props.setSelected('')}>{word}</span>, ' ');
    });
    if (this.props.gameStatus) {
      this.props.stash.map((word, i) => {
        if (!this.props.found.includes(word)) {
          wordLabels.push(<span className="label label-default" key={i} onMouseEnter={() => this.props.setSelected(word)} onMouseLeave={() => this.props.setSelected('')}>{word}</span>, ' ')
        }
      });
    }
    return (
      <div className="panel score-card animated slideInRight">
        <div className="panel-heading">
          {this.props.len}-letter
        </div>
        <div className="panel-body">
          <div className="progress">
            <div className="progress-bar progress-bar-primary" role="progressbar" style={{ width: Math.floor(this.props.found.length / this.props.stash.length * 100) + '%' }}>
              {Math.floor(this.props.found.length / this.props.stash.length * 100)}%
            </div>
          </div>
          {foundLabels}
          {wordLabels}
        </div>
      </div>
    );
  }
}