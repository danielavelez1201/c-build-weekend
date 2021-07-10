import { createContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import {
  RectObj,
  LineObj,
  CircleObj,
  TextObj,
  TitleTextObj,
  NoteTextObj
} from '../components/shapes';
import { FigmaEmbed } from '../components/embeds';
import { Html } from 'react-konva-utils';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './canvas.module.css';
import { Client } from '@notionhq/client';
// import paintbrush from '../public/paintbrush.svg';

const notion = new Client({
  auth: 'secret_wgPV8akvo0FRjsUofyfFZ4dYfRYocDLVmGEUsNd8qSx'
});

const sampleFile =
  'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUKQDEpSXcCgPOUZAMemt7L%2FSample-File%3Fnode-id%3D0%253A2';

const getDatabase = async (databaseId) => {
  console.log('in get database');
  const response = await notion.databases.query({
    database_id: databaseId
  });
  return response.results;
};

const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

<style jsx>{`
  .iframe {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`}</style>;

export default function Canvas() {
  const [windowVar, setWindowVar] = useState({ innerWidth: 0, innerHeight: 0 });
  const [rectObjs, setRectObjs] = useState([RectObj, RectObj, RectObj]);
  const [textObjs, setTextObjs] = useState([TitleTextObj]);
  const [circleObjs, setCircleObjs] = useState([CircleObj]);
  const [lineObjs, setLineObjs] = useState([LineObj]);
  const [objNum, setObjNum] = useState(0);
  const [headerOpen, setHeaderOpen] = useState(true);
  const [data, setData] = useState(null);
  const [figmaEmbedFrame, setFigmaEmbedFrame] = useState(null);

  const [noteText, setNoteText] = useState('');
  const [notionSrc, setNotionSrc] = useState('');
  const [figmaSrc, setFigmaSrc] = useState('');
  const [otherSrc, setOtherSrc] = useState('');
  const [other2Src, setOtherSrc2] = useState('');

  const [tool, setTool] = useState('');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    if (!tool) {
      return;
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  /*  useEffect(() => {
        const fetchData = async () => {
            const result = await getPage("https://www.notion.so/Initialize-project-cd69e214e8184f3092422d192bd9e5ec");
            console.log("notion result", result.json())
            setData(result.data);
        }
        fetchData()
        console.log(data)
    }, [])
 */

  const noteChange = (e) => {
    setNoteText(e.target.value);
  };

  const figmaSrcChange = (e) => {
    setFigmaSrc(e.target.value);
  };

  const noteSubmit = () => {
    console.log('note submit');
    const currentTextObjs = textObjs;
    currentTextObjs.push(NoteTextObj(noteText));
    setTextObjs(currentTextObjs);
    setNoteText('');
  };

  const figmaSubmit = () => {
    console.log('figma submit');
    setFigmaEmbedFrame(FigmaEmbed(figmaSrc));
  };

  const stageRef = useRef();

  const addObject = () => {
    if (tool) {
      return;
    }
    const currentRectObjs = rectObjs;
    for (let i = 0; i < 10; i++) {
      currentRectObjs.push(RectObj);
    }
    setRectObjs(currentRectObjs);

    const currentCircleObjs = circleObjs;
    for (let i = 0; i < 10; i++) {
      currentCircleObjs.push(CircleObj);
    }
    setCircleObjs(currentCircleObjs);
    setObjNum(objNum + 1);
  };

  useEffect(() => {
    setWindowVar({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    });
  }, [rectObjs, circleObjs, textObjs, objNum]);

  const handleDragStart = (e) => {
    const id = e.target.id();
    if (tool) {
      return;
    }
    console.log('drags');
    setRectObjs(
      rectObjs.map((object) => {
        return {
          ...object,
          isDragging: object.id === id
        };
      })
    );
    setCircleObjs(
      circleObjs.map((object) => {
        return {
          ...object,
          isDragging: object.id === id
        };
      })
    );
    setTextObjs(
      textObjs.map((object) => {
        return {
          ...object,
          isDragging: object.id === id
        };
      })
    );
    setObjNum(objNum + 1);
  };
  const handleDragEnd = (e) => {
    const id = e.target.id();
    setRectObjs(
      rectObjs.map((object) => {
        return {
          ...object,
          isDragging: false
        };
      })
    );
    setCircleObjs(
      circleObjs.map((object) => {
        return {
          ...object,
          isDragging: false
        };
      })
    );
    setTextObjs(
      textObjs.map((object) => {
        return {
          ...object,
          isDragging: false
        };
      })
    );
  };

  const createText = (e) => {
    const x = e.evt.x;
    const y = e.evt.y;
    const currentTextObjs = textObjs;
    currentTextObjs.push(
      <Text
        text='New Text'
        x={x}
        y={y}
        draggable
        fill={'black'}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    );
    setTextObjs(currentTextObjs);
    setObjNum(objNum + 1);
  };

  const addComment = (text) => {
    console.log(text);
  };

  const adjustToolType = () => {
    if (!tool) {
      setTool('pen');
    } else {
      setTool('');
    }
  };

  console.log(textObjs);

  return (
    <div>
      {headerOpen && (
        <div className={styles.header}>
          <Container fluid>
            <Row>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    weight='20px'
                    height='200px'
                    src='https://cdn.dribbble.com/users/7162/screenshots/4108029/the-writer-patch.png?compress=1&resize=800x600'
                  />
                  <Card.Body>
                    <Card.Title>Note</Card.Title>
                    <Card.Text>
                      <textarea
                        value={noteText}
                        onChange={noteChange}
                        type='text'
                        name='name'
                        placeholder='Add note'
                      />
                    </Card.Text>
                    <Button variant='primary' onClick={noteSubmit}>
                      Add
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    weight='20px'
                    height='200px'
                    src='https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png'
                  />
                  <Card.Body>
                    <Card.Title>Notion doc</Card.Title>
                    <Card.Text>
                      <textarea
                        value={notionSrc}
                        onChange={noteChange}
                        type='text'
                        name='name'
                        placeholder='Doc link'
                      />
                    </Card.Text>
                    <Button variant='primary'>Add</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    weight='20px'
                    height='200px'
                    src='data:image/png;base64,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'
                  />
                  <Card.Body>
                    <div>
                      <Card.Title>Figma</Card.Title>
                      <Card.Text>
                        <textarea
                          value={figmaSrc}
                          onChange={figmaSrcChange}
                          type='text'
                          name='name'
                          placeholder='Figma link'
                        />
                      </Card.Text>
                      <Button onClick={figmaSubmit} variant='primary'>
                        Add
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    weight='20px'
                    height='200px'
                    src='https://cdn.worldvectorlogo.com/logos/jira-1.svg'
                  />
                  <Card.Body>
                    <Card.Title>Jira</Card.Title>
                    <Card.Text>
                      <textarea
                        value={otherSrc}
                        onChange={noteChange}
                        type='text'
                        name='name'
                        placeholder='Jira link'
                      />
                    </Card.Text>
                    <Button variant='primary'>Add</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    weight='20px'
                    height='200px'
                    src='https://i.pcmag.com/imagery/reviews/03ErPVuqnBDCwlLsh8EzpBM-5..1569477508.jpg'
                  />
                  <Card.Body>
                    <Card.Title>Google resource</Card.Title>
                    <Card.Text>
                      <textarea
                        value={other2Src}
                        onChange={noteChange}
                        type='text'
                        name='name'
                        placeholder='Link'
                      />
                    </Card.Text>
                    <Button variant='primary'>Add</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <div>
        <br></br>
        <button onClick={() => setHeaderOpen(!headerOpen)}>
          <img
            height='30px'
            src='https://static.thenounproject.com/png/551749-200.png'
          ></img>
        </button>
        <span>
          <button
            onClick={() => adjustToolType()}
            style={{
              backgroundColor: tool ? 'gray' : ''
            }}
          >
            <img src='/paintbrush.svg' width='30px' />
          </button>
          {tool && (
            <select
              value={tool}
              onChange={(e) => {
                setTool(e.target.value);
              }}
            >
              <option value='pen'>Pen</option>
              <option value='eraser'>Eraser</option>
            </select>
          )}
        </span>
        <Stage
          ref={stageRef}
          width={windowVar.innerWidth}
          height={windowVar.innerHeight}
          style={{ border: '1px solid grey' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            <Html
              divProps={{
                style: {
                  position: 'absolute',
                  'margin-top': '100px',
                  'margin-left': '1200px',
                  'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.2)',
                  'border-radius': '5px',
                  padding: '5px'
                }
              }}
            >
              {figmaEmbedFrame}
            </Html>

            <Rect
              x={50}
              y={100}
              width={200}
              height={200}
              fill='#B3DFB5'
              shadowBlur={10}
              onMouseDown={() => addObject()}
            />
            <Circle
              x={150}
              y={450}
              radius={100}
              fill='#E0BBE4'
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
                fill={'dark-grey'}
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
                draggable={!tool}
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
                draggable={!tool}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => addObject}
              />
            ))}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke='gray'
                strokeWidth={2}
                tension={0.5}
                lineCap='round'
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
