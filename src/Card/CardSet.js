import React, {Fragment} from "react";
import Card from "./Card";
import {propData as data} from "./Stored-Links/Anchor-List";
import {spliceCheck, a} from './helpers'

// const a = function(l){ return console.log(l)}; for (let i = 0; i = 3; i++){
// a(i); }
// console.log(data);
// a(data)

let sectioned = spliceCheck(data);
// a(sectioned)

const Cards = () => (

  <Fragment>
    <div className="container">

      <div className="columns">
        {sectioned[0].map(single => <Card
          projectTitle={single.projectTitle}
          projectTags={single.projectTags}
          backSummary={single.backSummary}
          frontSummary={single.frontSummary}
          liveSiteHref={single.liveSiteHref}
          caption={single.caption}
          imgLinkThmb={single.imgLinkThmb}
          imgLink={single.imgLink[0]}
          altTxt={single.altTxt}
          imageSet={single.imageSet}
          caption2={single.caption}
          key={single.projectTitle}/>)}
      </div>

      <div className="columns">
        {sectioned[1].map(single => <Card
          projectTitle={single.projectTitle}
          projectTags={single.projectTags}
          backSummary={single.backSummary}
          frontSummary={single.frontSummary}
          liveSiteHref={single.liveSiteHref}
          caption={single.caption}
          imgLinkThmb={single.imgLinkThmb}
          imgLink={single.imgLink[0]}
          altTxt={single.altTxt}
          imageSet={single.imageSet}
          caption2={single.caption}
          key={single.projectTitle}/>)}
      </div>

      <div className="columns">
        {sectioned[2].map(single => <Card
          projectTitle={single.projectTitle}
          projectTags={single.projectTags}
          backSummary={single.backSummary}
          frontSummary={single.frontSummary}
          liveSiteHref={single.liveSiteHref}
          caption={single.caption}
          imgLinkThmb={single.imgLinkThmb}
          imgLink={single.imgLink[0]}
          altTxt={single.altTxt}
          imageSet={single.imageSet}
          caption2={single.caption}
          key={single.projectTitle}/>)}
      </div>

      <div className="columns">
        {sectioned[3].map(single => <Card
          projectTitle={single.projectTitle}
          projectTags={single.projectTags}
          backSummary={single.backSummary}
          frontSummary={single.frontSummary}
          liveSiteHref={single.liveSiteHref}
          caption={single.caption}
          imgLinkThmb={single.imgLinkThmb}
          imgLink={single.imgLink[0]}
          altTxt={single.altTxt}
          imageSet={single.imageSet}
          caption2={single.caption}
          key={single.projectTitle}/>)}
      </div>

      <div className="columns">
        {sectioned[4].map(single => <Card
          projectTitle={single.projectTitle}
          projectTags={single.projectTags}
          backSummary={single.backSummary}
          frontSummary={single.frontSummary}
          liveSiteHref={single.liveSiteHref}
          caption={single.caption}
          imgLinkThmb={single.imgLinkThmb}
          imgLink={single.imgLink[0]}
          altTxt={single.altTxt}
          imageSet={single.imageSet}
          caption2={single.caption}
          key={single.projectTitle}/>)}
      </div>
      <div className="columns">
        {sectioned[5].map(single => <Card
          projectTitle={single.projectTitle}
          projectTags={single.projectTags}
          backSummary={single.backSummary}
          frontSummary={single.frontSummary}
          liveSiteHref={single.liveSiteHref}
          caption={single.caption}
          imgLinkThmb={single.imgLinkThmb}
          imgLink={single.imgLink[0]}
          altTxt={single.altTxt}
          imageSet={single.imageSet}
          caption2={single.caption}
          key={single.projectTitle}/>)}
      </div>

    </div>

  </Fragment>

);

export default Cards;

/* {data.map(single => <Card data = {single} />) } */