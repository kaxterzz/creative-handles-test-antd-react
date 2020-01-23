import React from 'react';

function DynamicCard(props) {
    const { caption } = props;
    const { color } = props;
    const { invColor } = props;
    const {lines, setLines} = props.pstate;
    return <button onClick={() => {
      setLines([...lines, lines.length]);
    }}>
      {caption}
    </button>;
}
  
export default DynamicCard;