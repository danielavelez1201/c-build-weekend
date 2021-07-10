import { createContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import { RectObj, LineObj, CircleObj, TextObj, TitleTextObj, NoteTextObj } from './shapes';
import { FigmaEmbed } from './embeds'
import { Html } from 'react-konva-utils';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './canvas.module.css';



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
    const [headerOpen, setHeaderOpen] = useState(true);

    const [noteText, setNoteText] = useState("");

    const noteChange = (e) => {
        setNoteText(e.target.value)
    }

    const noteSubmit = () => {
        console.log("note submit")
        const currentTextObjs = textObjs
        currentTextObjs.push(NoteTextObj(noteText))
        setTextObjs(currentTextObjs)
        setNoteText("")
    }
    const stageRef = useRef();


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

    const addComment = (text) => {
        console.log(text)
    }


    console.log(textObjs)

    return (
        <div>
        
        {headerOpen && <div className={styles.header}>
            <Container fluid>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" weight="20px" height="200px" src="https://cdn.dribbble.com/users/7162/screenshots/4108029/the-writer-patch.png?compress=1&resize=800x600" />
                        <Card.Body>
                            <Card.Title>Note</Card.Title>
                            <Card.Text>
                            <textarea value={noteText} onChange={noteChange} type="text" name="name" placeholder="Add note"/>
                            </Card.Text>
                            <Button variant="primary" onClick={noteSubmit}>Add</Button>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png" />
                    <Card.Body>
                        <Card.Title>Notion doc</Card.Title>
                        <Card.Text>
                        <textarea value={noteText} onChange={noteChange} type="text" name="name" placeholder="Doc link"/>
                        </Card.Text>
                        <Button variant="primary">Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png" />
                    <Card.Body>
                        <Card.Title>Notion doc</Card.Title>
                        <Card.Text>
                        <textarea value={noteText} onChange={noteChange} type="text" name="name" placeholder="Doc link"/>
                        </Card.Text>
                        <Button variant="primary">Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png" />
                    <Card.Body>
                        <Card.Title>Notion doc</Card.Title>
                        <Card.Text>
                        <textarea value={noteText} onChange={noteChange} type="text" name="name" placeholder="Doc link"/>
                        </Card.Text>
                        <Button variant="primary">Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png" />
                    <Card.Body>
                        <Card.Title>Notion doc</Card.Title>
                        <Card.Text>
                        <textarea value={noteText} onChange={noteChange} type="text" name="name" placeholder="Doc link"/>
                        </Card.Text>
                        <Button variant="primary">Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                </Row>
            </Container>
        </div>}        
        <div>
        <br></br>
        <button onClick={() => setHeaderOpen(!headerOpen)}><img height="30px" src="https://static.thenounproject.com/png/551749-200.png"></img></button>
        <Stage ref={stageRef} width={windowVar.innerWidth} height={windowVar.innerHeight} style={{border: '1px solid grey'}}>
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
        
        </div>
                  
    );
}