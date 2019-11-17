import React, {Fragment, Component} from 'react';
import {render} from 'react-dom';
import Cards from './Card/CardSet'


class App extends Component {
  render() {
    return (
      <Fragment>
<Cards/>

      </Fragment>
    ); 
  }
}




render(<App/>, document.querySelector('.root'))


