import { useEffect, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';

export default function Canvas() {
  const [state, setState] = useState({
    isDragging: false,
    x: 50,
    y: 50
  });
  const [windowVar, setWindowVar] = useState({innerWidth: 0, innerHeight: 0})
  useEffect(() => {
      setWindowVar({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight
      })

  })

    return (
      <Stage width={windowVar.innerWidth} height={windowVar.innerHeight}>
        <Layer>
          <Text
            text="Draggable Text"
            x={state.x}
            y={state.y}
            draggable
            fill={state.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              setState({
                isDragging: true
              });
            }}
            onDragEnd={e => {
              setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y()
              });
            }}
          />
        </Layer>
      </Stage>
    );
}