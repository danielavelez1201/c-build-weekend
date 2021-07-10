import { createContext, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import { RectObj, LineObj, CircleObj, TextObj, TitleTextObj } from './shapes';
import { FigmaEmbed } from './embeds'

<style jsx>{`
    .iframe {
        border: 1px solid rgba(0, 0, 0, 0.1)
    }
    `
}</style>


export default function Canvas() {
    const [windowVar, setWindowVar] = useState({innerWidth: 0, innerHeight: 0})
    const [rectObjs, setRectObjs] = useState([RectObj, RectObj, RectObj]);
    const [textObjs, setTextObjs] = useState([TitleTextObj]);
    const [circleObjs, setCircleObjs] = useState([CircleObj]);
    const [lineObjs, setLineObjs] = useState([LineObj]);
    const [objNum, setObjNum] = useState(0);

    const addObject = () => {
        const currentRectObjs = rectObjs;
        for (let i =0; i<10; i++) {
            currentRectObjs.push(RectObj)
        }
        setRectObjs(currentRectObjs)

        const currentCircleObjs = circleObjs;
        for (let i =0; i<10; i++) {
            currentCircleObjs.push(CircleObj)
        }
        setCircleObjs(currentCircleObjs)
        setObjNum(objNum + 1)
    }


    useEffect(() => {
        setWindowVar({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        });
    }, [rectObjs, circleObjs, textObjs, objNum])

    

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
        setCircleObjs(
            circleObjs.map((object) => {
                return {
                    ...object,
                    isDragging: object.id === id
                }
            })
        )
        setTextObjs(
            textObjs.map((object) => {
                return {
                    ...object,
                    isDragging: object.id === id
                }
            })
        )
        setObjNum(objNum + 1)
    }
    const handleDragEnd = (e) => {
        const id = e.target.id();
        setRectObjs(
            rectObjs.map((object) => {
                return {
                    ...object,
                    isDragging: false,
                }
            })
        )
        setCircleObjs(
            circleObjs.map((object) => {
                return {
                    ...object,
                    isDragging: false
                }
            })
        )
        setTextObjs(
            textObjs.map((object) => {
                return {
                    ...object,
                    isDragging: false
                }
            })
        )
    }

    const createText = (e) => {
        const x = e.evt.x
        const y = e.evt.y
        const currentTextObjs = textObjs
        currentTextObjs.push(<Text
            text="New Text"
            x= {x}
            y= {y}
            draggable
            fill={'black'}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        />)
        setTextObjs(currentTextObjs)
        setObjNum(objNum + 1)
    }


    console.log(textObjs)

    return (
        <div>
      <Stage width={windowVar.innerWidth} height={windowVar.innerHeight} onDblClick={(e) => createText(e)}>
        <Layer>
            <Rect
                x={50}
                y={100}
                width={100}
                height={100}
                fill="red"
                shadowBlur={10}
                onMouseDown={() => addObject()}
            />
            <Circle 
            x={100} 
            y={300} 
            radius={50} 
            fill="green" 
            shadowBlur={10}
            onMouseDown={() => addObject()}
            />
            {textObjs.map((text) => (
                <Text
                text={text.props.text}
                x={text.props.x}
                y={text.props.y}
                fontSize={text.props.fontSize}
                fontFamily={text.props.fontFamily}
                draggable
                fill={'black'}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onMouseDown={() => addObject()}
            />
            ))}
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
            {circleObjs.map((circle) => (
                <Circle 
                key={circle.props.id}
                id={circle.props.id}
                x={circle.props.x} 
                y={circle.props.y} 
                radius={circle.props.radius} 
                fill={circle.props.fill}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => addObject}
                />
            ))}            
          
        </Layer>
      </Stage>      


        </div>
        
    );
}