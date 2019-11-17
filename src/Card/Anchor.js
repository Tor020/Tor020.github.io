import React from 'react'

export const Anchor = (props) => {
 
return  (
 
    <a href={props.imgLink}>{props.text}</a>
 
  ); 

}


export const LiBoxThmb = (props) => {

return  (

    <a href={props.imgLink} data-lightbox={props.imageSet} data-title={props.caption}> 

      <img src={props.imgLinkThmb} className="Thumbnail" alt={props.altTxt}/>

    </a>

  );

}


export const LiBoxNoThmb = (props) => {

return  (

    <a  href={props.imgLink} data-lightbox={props.imageSet} data-title={props.caption}>
    
    </a>

  );

}

    LiBoxNoThmb.defaultProps = {
      imgLink: '#HREF',
      imageSet: 'guest',
      caption: 'guest',
      imgLinkThmb: 'guest',
      altTxt: 'guest',

    };
    LiBoxThmb.defaultProps = {
      imgLink: '#HREF',
      imageSet: 'guest',
      caption: 'guest',
      imgLinkThmb: 'guest',
      altTxt: 'guest',

    };
    Anchor.defaultProps = {
      imgLink: '#HREF',
      imageSet: 'guest',
      caption: 'guest',
    };
