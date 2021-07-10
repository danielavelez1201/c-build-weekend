import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export const RectObj = <Rect
    x={50}
    y={100}
    width={200}
    height={200}
    fill="#B3DFB5"
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

export const LineObj = <Line
    x={20}
    y={200}
    points={[0, 0, 100, 0, 100, 100]}
    tension={0.5}
    closed
    stroke="black"
    fillLinearGradientStartPoint={{ x: -50, y: -50 }}
    fillLinearGradientEndPoint={{ x: 50, y: 50 }}
    fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
/>

export const CircleObj = <Circle 
    x={150} 
    y={450} 
    radius={100} 
    fill="#E0BBE4" 
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
}}/>

export const TextObj = <Text
        text="Draggable Text"
        x={20}
        y={500}
        draggable
        fill={'black'}
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

export const TitleTextObj = <Text
    text="Project"
    fontFamily="Courier"
    fontSize={50}
    x={800}
    y={20}
    fill={'black'}

/>

export const NoteTextObj = (text) => {
    return (<Text
        text={text}
        fontSize={20}
        fontFamily="Courier"
        x={300}
        y={300}
        width={50}
        zIndex={0}
        draggable
        fill={'black'}
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
    />)
} 