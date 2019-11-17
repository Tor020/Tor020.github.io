import React, {Component} from 'react';

import BackFooter from '../components/BackFooter'
import FrontFooter from '../components/FrontFooter'
import {Anchor, LiBoxThmb, LiBoxNoThmb } from "./Anchor"

 
class Card extends Component {

  render() {
    return (
      <div className="is-4 column">
        <div className="card cardFlipIn">
          <div className="card-content">
            <div className="media">
              <div className="media-left"></div>

              <div className="media-content">
                <p className="is-4 title">{this.props.projectTitle}</p>
                <p className="subtitle is-6 project-tag">
                  <a>{this.props.projectTags}
                  </a>

                </p>
              </div>
            </div>

            <div className="content">
              {this.props.frontSummary}
            </div>
            <FrontFooter/>
          </div>
        </div>
        
        <div className="card cardFlipInReverse card-hidden">
          <div className="card-image"> 
      <figure className="image is-4by3">
        <LiBoxThmb
          imgLinkThmb = {this.props.imgLinkThmb}
          imgLink  = {this.props.imgLink}
          altTxt = {this.props.altTxt}
          imageSet = {this.props.imageSet}
          caption = {this.props.caption}  
          />
        <LiBoxNoThmb 
          imgLink = {this.props.imgLink2}
          imageSet = {this.props.imageSet}  
          caption = {this.props.caption2}
          />
      </figure>
      
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">

                <p className="is-4 title">{this.props.projectTitle}</p>

                <p className="subtitle is-6 project-tag">
                  <a>{this.props.projectTags}</a>
                </p>

              </div>
            </div>
            <div className="content">

              {this.props.backSummary}

            </div>
            <div className="content">

              <a href={this.props.liveSiteHref}>Live Website</a>

            </div>
            <BackFooter/>
          </div>
        </div>
      </div>
    );
  }
}
    Card.defaultProps = {
      // projectTitle: 'default',
      projectTags: 'default',
      backSummary: 'default',
      frontSummary: 'default',
      liveSiteHref: 'default',

    };


export default Card;
