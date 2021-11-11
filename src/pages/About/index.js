import React, { Component } from 'react'

import './styles.scss'


export default class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="col-md-6 col-sm-8 about">
          <p className="contact">
            If you would like to contact me, please send me an
            {' '}
            <a
              className="email"
              href="mailto:lkeesoftware@gmail.com?subject=Boggle5"
              target="_blank"
              rel="noreferrer"
            >
              email
            </a>
            {' '}
            with &quot;Boggle5&quot; as the subject.
          </p>

          <p className="more">
            For more of my projects, please visit my <a href="https://leonardk.herokuapp.com" target="_blank" rel="noopener noreferrer">portfolio</a>.
          </p>

          <div className="icons" data-testid="social-icons">
            <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
              <i className="fa fa-linkedin fa-lg li grow icon-link" />
            </a>
            <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
              <i className="fa fa-github-alt fa-lg gh grow icon-link" />
            </a>
            <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
              <i className="fa fa-instagram fa-lg gh grow icon-link" />
            </a>
            <a href="https://leonardk.herokuapp.com" target="_blank" rel="noreferrer" data-testid="media-icon">
              <i className="fa fa-laptop fa-lg gh grow icon-link" />
            </a>
          </div>


        </div>
      </div>
    )
  }
}



