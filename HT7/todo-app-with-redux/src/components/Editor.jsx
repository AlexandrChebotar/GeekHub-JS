import React, { Component } from 'react';
import {Button} from './Button';


class Editor extends Component {
  render() {    
    const {data, onSaveButtonClick, onCancelButtonClick} = this.props;
    let {summary, details} = data;
    return (
      <form className="editor">
          <input 
            type="text" 
            className="summary" 
            placeholder="Что нужно сделать?"
            defaultValue={summary}
            ref={node => {summary = node}}
          /> 
          <textarea rows="3" className="details" placeholder="Детали"
            defaultValue={details}
            ref={node => {details = node}}
          />
          <Button name="Save" onClick={() => onSaveButtonClick(summary.value, details.value)} />
          <Button name="Cancel" onClick={onCancelButtonClick} />
      </form>
    );
  }
}

export {Editor};
