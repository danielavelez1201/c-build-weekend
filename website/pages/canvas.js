import { createContext, useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Star, Group } from 'react-konva';
import { RectObj, LineObj, CircleObj, TextObj, TitleTextObj, NoteTextObj, CircleTextObj, StarObj, CorgiObj } from '../components/shapes';
import { FigmaEmbed, NotionEmbed, GithubEmbed, WebLinkEmbed } from '../components/embeds'
import { useRouter } from 'next/router'
import useImage from 'use-image';

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
import axios from 'axios';
import { isLineBreak } from 'typescript';

const notion = new Client({
  auth: 'secret_wgPV8akvo0FRjsUofyfFZ4dYfRYocDLVmGEUsNd8qSx'
});

const sampleFile =
  'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUKQDEpSXcCgPOUZAMemt7L%2FSample-File%3Fnode-id%3D0%253A2';

const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

<style jsx>{`
  .iframe {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`}</style>;

const WebEmbed = props => {
    const data = props.data
    return (
        WebLinkEmbed(data)
    )
}

export default function Canvas() {
    const [windowVar, setWindowVar] = useState({innerWidth: 0, innerHeight: 0})
    const [stars, setStars] = useState([StarObj]);
    const [corgis, setCorgis] = useState([CorgiObj, CorgiObj, CorgiObj, CorgiObj, CorgiObj, CorgiObj, CorgiObj, CorgiObj, CorgiObj]);
    const [lineObjs, setLineObjs] = useState([LineObj]);
    const [textObjs, setTextObjs] = useState([]);
    const [squareObjs, setSquareObjs] = useState([]);
    const [circleObjs, setCircleObjs] = useState([]);
    const [objNum, setObjNum] = useState(0);
    const [headerOpen, setHeaderOpen] = useState(true);
    const [data, setData] = useState(null);
    const [figmaEmbedFrame, setFigmaEmbedFrame] = useState(null);
    const [notionObjs, setNotionObjs] = useState([]);

    const [noteText, setNoteText] = useState("");
    const [notionSrc, setNotionSrc] = useState("");
    const [figmaSrc, setFigmaSrc] = useState("");
    const [otherSrc, setOtherSrc] = useState("");
    const [other2Src, setOtherSrc2] = useState("");

    const [tool, setTool] = useState('');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const textRef = useRef(null);
    const [notionImage] = useImage("https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png")
    const [githubImage] = useImage("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
    const [deleteImage] = useImage("https://static-00.iconduck.com/assets.00/x-close-delete-icon-512x512-hvworgpt.png")
    const [iconSizeT, setIconSizeT] = useState("30px");
    const [iconSizeSquare, setIconSizeSquare] = useState("30px");
    const [iconSizeCircle, setIconSizeCircle] = useState("30px");
    const [githubUsername, setGithubUsername] = useState("");
    const [githubRepo, setGithubRepo] = useState("");
    const [githubEmbed, setGithubEmbed] = useState(null);
    const [webLink, setWebLink] = useState("");
    const [webLinks, setWebLinks] = useState([]);

    const router = useRouter()

    const parseNotionId = (url) => {
        const idString = url.split('-').pop();
        const piece1 = idString.slice(0, 8)
        const piece2 = idString.slice(8, 12)
        const piece3 = idString.slice(12, 16)
        const piece4 = idString.slice(16, 20)
        const piece5 = idString.slice(20, 32)
        const finalIdString = piece1 + "-" + piece2 + "-" + piece3 + "-" + piece4 + "-" + piece5
        return finalIdString
    }

    const parseNotionTitle = (url) => {
        var longString = url.split('/').pop()
        var title = ""
        var continuing = true
        var i = 0
        var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        while (continuing && i < longString.length) {
            if (!longString.slice(i).includes('-')) {
                continuing = false
            }
            else if (numbers.includes(longString[i])) {
                continuing = false
            }
            else if (longString[i] === '-') {
                title += " "
            }
            else {
                title += longString[i]
            }
            i++
        }
        return title;
    }


    async function notionSubmit(url) {
        const id = parseNotionId(url)
        await axios.get('/api/notion_api', { params: { src: id }})
            .then(function(response) {
                const result = response.data
                console.log("response", result)
                //setNotionObjs({summary: result.summary[0].text, latest: result.latest})
                const currentNotionObjs = notionObjs
                //const title = result.title.properties.title.title[0].plain_text
                currentNotionObjs.push({title: parseNotionTitle(url), summary: result.summary[0].text, latest: result.latest, url: url})
                setNotionObjs(currentNotionObjs)
                console.log(notionObjs)
                setObjNum(objNum + 1)
            })
        
    }

    async function githubSubmit() {
        console.log("async func")
        await axios.get('/api/github_api', {params: {username: githubUsername, repo: githubRepo}})
            .then(function(response) {
                console.log(response)
                setGithubEmbed(GithubEmbed(response.data, githubUsername, githubRepo, githubImage, linkFunction, deleteImage, deleteFunction))
                setObjNum(objNum + 1)
            })  
    } 

    async function webLinkSubmit() {
        await axios.get('/api/web_api', {params: {url: webLink}})
            .then(function(response) {
                const currentWebLinks = webLinks
                currentWebLinks.push(response.data)
                setWebLinks(currentWebLinks)
                console.log(webLinks)
                setObjNum(objNum + 1)
            })
    }
  

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

  async function getNotionData(url) {
    const id = parseNotionId(url);
    await axios
      .get('/api/notion_api', { params: { src: id } })
      .then(function (response) {
        console.log(response.data.properties);
        console.log(response.data.properties.title.title.plain_text);
        setNotionObjs(response.data.properties);
      });
  }

  const noteChange = (e) => {
    setNoteText(e.target.value);
  };

  const webLinkChange = (e) => {
      setWebLink(e.target.value);
  }

  const githubUsernameChange = (e) => {
      setGithubUsername(e.target.value);
  }

  const githubRepoChange = (e) => {
    setGithubRepo(e.target.value);
}

  const notionSrcChange = (e) => {
    setNotionSrc(e.target.value);
  };

  const figmaSrcChange = (e) => {
    console.log(encodeURIComponent(e.target.value))
    setFigmaSrc(encodeURIComponent(e.target.value));
  };

  const noteSubmit = () => {
    console.log('note submit');
    const currentTextObjs = textObjs;
    currentTextObjs.push(TextObj(noteText));
    setTextObjs(currentTextObjs);
    setNoteText('');
  };

  const squareSubmit = () => {
    console.log('note submit');
    const currentTextObjs = textObjs;
    currentTextObjs.push(NoteTextObj(noteText));
    setTextObjs(currentTextObjs);
    setNoteText('');
  };

  const circleSubmit = () => {
    console.log('note submit');
    const currentTextObjs = textObjs;
    currentTextObjs.push(CircleTextObj(noteText));
    setTextObjs(currentTextObjs);
    setNoteText('');
  };
  

  const figmaSubmit = () => {
    console.log('figma submit');
    setFigmaEmbedFrame(FigmaEmbed(figmaSrc));
  };


    const stageRef = useRef();


    const addObject = () => {
        
        const currentStars = stars;
        for (let i =0; i<10; i++) {
            currentStars.push(StarObj)
        }
        setStars(currentStars)

        const currentCorgis = corgis;
        for (let i =0; i<10; i++) {
            currentCorgis.push(CorgiObj)
        }
        setCorgis(currentCorgis)
        setObjNum(objNum + 1)
    }


    useEffect(() => {
        setWindowVar({
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        });
        
        // openAI()
    }, [objNum, notionObjs, stars, corgis, textObjs, webLinks, githubEmbed])

    const deleteNotion = (i) => {
        const newNotionObjs = [...notionObjs]
        notionObjs.splice(i, 1)
        setNotionObjs(newNotionObjs)
    }

    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
            stars.map((object) => {
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
        setStars(
            stars.map((object) => {
                return {
                    ...object,
                    isDragging: false
                }
            })
        )
    }

  const addComment = (text) => {
    console.log(text);
  };

  const linkFunction = (url) => {
      window.open(url, '_ blank')
  }

  const deleteFunction = (e) => {
      var newNotionObjs = notionObjs
      console.log(e, notionObjs)
      for (var i = 0; i < notionObjs.length; i ++) {
        if (notionObjs[i].id === e.target.id) {
            newNotionObjs.splice(i, 1)
        }
      }
      setNotionObjs([])
  }

  const adjustToolType = () => {
    if (!tool) {
      setTool('pen');
    } else {
      setTool('');
    }
}

    console.log(notionObjs)

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
                            <img height={iconSizeT} src="https://img.icons8.com/ios/500/text.png" onMouseOut={() => setIconSizeT("30px")} onMouseOver={() => setIconSizeT("35px")} onClick={noteSubmit} />
                            <img height={iconSizeSquare} onMouseOut={() => setIconSizeSquare("30px")} onMouseOver={() => setIconSizeSquare("35px")} onClick={squareSubmit} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAAAwMDCWlpb09PSysrJDQ0OGhobm5uagoKBoaGiurq7x8fH6+vrDw8OhoaE3Nzff399bW1va2tpgYGDQ0NAzMzO9vb1BQUEiIiJJSUlQUFB7e3uHh4cnJydvb28ZGRmRkZETExN0dHTJycmpTN17AAAEZ0lEQVR4nO2d6ZaiMBBGFZQdBZd213b0/Z9xYDzNYrekTAoqPee7f+WEXBOqCvBYoxEAAAAAAAAAAAAAAAAAAMBvJJ2FkZc5cmReFM7SvvQmcTa2gyye9OAX+NJeLfyAW9CVVvrGldUvd6R9fsBZ8glOpWVeMOUSDKVNXhL+74JMirZu0QcMGzV/GtKLTq4cfuQ9zSc3NmxFUWfOnobeJpi3Cg/HdLxWHow5ZshA3JyUazZW0Bhqn/DMj4Fk35iX2bZqlGqr3gpeHVb1xHyTcSaNFbRKcJQ2VtGkDG9seHu26IOEJzxkLKP0Q/3tZ/qDpHwxuQfqPKZ/Ac2qMeaMM+OiriZnDGPIJ/rv1JlMvzqNvobwGCfGR1XARZJD9AnDAlSh1Cip9kZVjugH0ypaGdZ+PVHVzPqRHobCwJAADIWBIQEYCgNDAjAUBoYEYCgMDAnAUBgYEoChMDAkAENhYEgAhsLAkAAMhYEhARgKA0MCMBQGhgRgKAwMCcBQGBgSgKEwMCQAQ2FgSACGwsCQAAyFgSEBGAoDQwIwFAaGBGAoDAwJwFAYGBKAoTAwJABDYWBIAIbCwJAADIWBIQEYCgNDAjAUBoYEYCgMDAnAUBgYEoChMDAkAENhYEgAhhVpH/2XlAxnmBzPY89fD245mGH++Thot5gO+7ffgxk2+6KcXcYmTCqGMlyOn7htBuqjMJThT72EDoMspaRhuV9v+v/nT0TY8N9S9ttayALDgsxf93ZV2mFY8Lmamred+glrDEs+3LX2LF5ilWHJbcq8X4c3XG4uu27JBWsWGd6wKEzT5fWjW9I5svWCFTEsSaaLbsnxIWbJImKGBendV3TWdU5346tS0rAknyuW8k9kmEWkDQsms2O3pFkWscCwZBluFZYX3SxiiWFBoMwixb2IRoC1x7Bgsr6qQs/t/u5jEKsMS5LpatzN/r0sYp1hiTKL7E70J1pWGo7KLKJYyiKL0JbSVsOCyUaVRbaULMJgSOq7VvWS/HwrUhCyyEYRXxn6rpF659Xf5LsBP9hE527JQ5h3DMrQO480xOHroIXGGYossn/WapMdZ68KAobmhaQeltUxN82zJLHevQhHD0tKH9IN4Rg192Or//d3dtf1836dVx/qP7ek9JKtNunY8PZdfS9yaS8lRy9ZQj/gepkZGuomyiyyr7NI3Q94a3BKZU/ntA6GJ4PzNFBnkdumTEtMPZ2Vfbkb5QnfM9FEmUX2Yc7Ul1vVW72xqXRyxWsm65Mii9SYtYENGiPtnzdq2iww+V82Bcos8sDwqZbbHKu94TfNj3SToYK7r9ivDL+iaOUpJ/z6woK4FRDO/b3ED+Ko6wmBeQjPn0b0It89XZ4vkkXo9kYYHjvCK0OAI7+XEGFqLtisjuxDvyL9JYpMgvZuVJYt+iBXVP4iOLxvlkP1GQeG/deEga8+6YD4ffzKYxIrnnUOxjburcBIZ2HkZY4cmReFbO+QAQAAAAAAAAAAAAAAAAAAhuUvNus7niK479EAAAAASUVORK5CYII=" />
                            <img height={iconSizeCircle} src="https://previews.123rf.com/images/martialred/martialred1803/martialred180300017/97216890-blank-round-sticker-with-corner-peel-line-art-vector-icon-for-apps-and-websites.jpg" onMouseOut={() => setIconSizeCircle("30px")} onMouseOver={() => setIconSizeCircle("35px")} onClick={circleSubmit} />
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png" />
                    <Card.Body>
                        <Card.Title>Notion doc</Card.Title>
                        <Card.Text>
                        <textarea value={notionSrc} onChange={notionSrcChange} type="text" name="name" placeholder="Page url"/>
                        </Card.Text>
                        <Button variant="primary" onClick={() => notionSubmit(notionSrc)}>Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="data:image/png;base64,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" />
                    <Card.Body>
                        <div>
                            <Card.Title>Figma</Card.Title>
                            <Card.Text>
                                <textarea value={figmaSrc} onChange={figmaSrcChange} type="text" name="name" placeholder="Figma url"/>
                            </Card.Text>
                        <Button onClick={figmaSubmit} variant="primary">Add</Button>
                        </div>
                        
                    </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://cdn.afterdawn.fi/v3/news/600x400/github-logo.jpg" />
                    <Card.Body>
                        <Card.Title>Github</Card.Title>
                        <Card.Text>
                        <input value={githubUsername} onChange={githubUsernameChange} type="text" name="name" placeholder="Github username"/>
                        <br></br>
                        <input value={githubRepo} onChange={githubRepoChange} type = "text" name="name" placeholder="Github repo" />
                        </Card.Text>
                        <Button variant="primary" onClick={() => githubSubmit()}>Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                    <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" weight="20px" height="200px" src="https://cdn.dribbble.com/users/159716/screenshots/15897999/media/a94ecbced7e3bd548253b2739d817e45.png?compress=1&resize=1600x1200" />
                    <Card.Body>
                        <Card.Title>Web links</Card.Title>
                        <Card.Text>
                        <input value={webLink} onChange={webLinkChange} type="text" name="name" placeholder="Link"/>
                        </Card.Text>
                        <Button onClick={() => webLinkSubmit()} variant="primary">Add</Button>
                    </Card.Body>
                    </Card>
                    
                    </Col>
                </Row>
            </Container>
        </div>}
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
            {webLinks.map(item => <WebEmbed image={item.image} data={item}/>)}
            {notionObjs ? (notionObjs.map((notionObj) => (NotionEmbed(notionObj.title, notionObj.summary, notionObj.latest, notionObj.url, tool === '', notionImage, linkFunction, deleteImage, deleteFunction)))) : (<></>)}
            {githubEmbed ? githubEmbed : (<></>)}
            <Rect
            x={30}
            y={60}
            width={90}
            height={300}
            stroke="gray"
            cornerRadius={10}
            />
            
            <Star
            x={70}
            y={120}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            shadowColor="black"
            shadowOpacity={0.6}
            shadowOffsetX={5}
            shadowOffsetY={5}
            draggable={!tool}
            isDragging={false}
            onMouseDown={() => addObject()}
            />
            <CorgiObj
            draggable={!tool}
            onMouseDown={() => addObject()}
            />
            {corgis.map((corgi) => (
            <CorgiObj
                key={corgi.id}
                id={corgi.id}
                x={30}
                y={200}
                draggable={!tool}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />
         ))}
            {stars.map((star) => (
            <Star
                key={star.id}
                id={star.id}
                x={70}
                y={120}
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
                fill="#89b717"
                opacity={0.8}
                draggable={!tool}
                shadowOffsetX={5}
                shadowOpacity={0.6}
                shadowOffsetY={5}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />
         ))}
            {textObjs.map((text) => {
                return {
                    ...text,
                    draggable: !tool
                }
            })}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke='gray'
                strokeWidth={!line.tool === 'eraser' ? 20 : 3}
                tension={0.5}
                lineCap='round'
                draggable={!tool}
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