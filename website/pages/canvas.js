import { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

<style jsx>{`
    .iframe {
        border: 1px solid rgba(0, 0, 0, 0.1)
    }
    `
}</style>

const rectObj = <Rect
        x={200}
        y={50}
        width={100}
        height={100}
        fill="red"
        shadowBlur={10}
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



export default function Canvas() {

    const [windowVar, setWindowVar] = useState({innerWidth: 0, innerHeight: 0})
    const [rectObjs, setRectObjs] = useState([]);

    const [textObjs, setTextObjs] = useState([]);
    const [circleObjs, setCircleObjs] = useState([]);
    const [lineObjs, setLineObjs] = useState([]);

    useEffect(() => {
        setWindowVar({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        });
    }, [rectObjs, circleObjs])

    const addObject = (shape) => {
        console.log("adding object", shape)
        if (shape === "rect") {
            rectObjs.push(<Rect
                x={20}
                y={50}
                width={100}
                height={100}
                fill="red"
                shadowBlur={10}
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
        if (shape === "circle") {
            circleObjs.push(<Circle x={200} y={100} radius={30} fill="red"/>)
        }
    }

    const buttonRect = <Text fill="green" onMouseDown ={addObject("rect")} />


    const handleDragStart = (e) => {
        const id = e.target.id();
        setRectObjs(
            rectObjs.map((object) => {
                return {
                    ...object,
                    isDragging: object.id === id
                }
            })
        )
    }
    const handleDragEnd = (e) => {
        setRectObjs(
            rectObjs.map((object) => {
                return {
                    ...object,
                    isDragging: false,
                }
            })
        )
    }

    const textObj = <Text
        text="Draggable Text"
        x={20}
        y={50}
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

    

    const circleObj = <Circle x={200} y={100} radius={50} fill="green" />

    const lineObj = <Line
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

    

    const figmaEmbed = <iframe className="iframe"
        width="400" 
        height="200" 
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUKQDEpSXcCgPOUZAMemt7L%2FSample-File%3Fnode-id%3D0%253A2" 
        draggable="true"
        allowfullscreen>
     
    </iframe>

    console.log(rectObjs)

    return (
        <div>
        {figmaEmbed}

      <Stage width={windowVar.innerWidth} height={windowVar.innerHeight}>
        <Layer>
            {rectObjs.map((rect) => (
                <Rect
                key={rect.props.id}
                id={rect.props.id}
                x={rect.props.x}
                y={rect.props.y}
                width={rect.props.width}
                height={rect.props.height}
                fill={rect.props.fill}
                shadowBlur={rect.props.shadowBlur}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />
            ))}

            {buttonRect}
            
          
        </Layer>
      </Stage>      


        </div>
        
    );
}