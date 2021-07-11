import Router from 'next/dist/next-server/lib/router/router';
import { Text, Group, Rect, Image, Line } from 'react-konva';
const figmaSrc = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUKQDEpSXcCgPOUZAMemt7L%2FSample-File%3Fnode-id%3D0%253A2"
import useImage from 'use-image';

export const FigmaEmbed = (src) => {
    return(<iframe className="iframe"
        width="600" 
        height="400" 
        src={"https://www.figma.com/embed?embed_host=share&url=" + src}
        >
    </iframe>)
}


    
export const NotionEmbed = (title, text, latest, url, draggable, image, linkFunction, deleteImage, deleteFunction) => {
    let counter = 230;

    const group = <Group
    x={350}
    y={100}
    width={130}
    height={150}
    draggable={draggable}
    onDblClick={() => linkFunction(url)}
    >
        <Rect
        width={300}
        height={400}
        fill="white"
        stroke="gray"
        cornerRadius={10}
        />
        <Text
        padding={30}
        text={title}
        width={300}
        fontFamily="Courier"
        fill={'black'}
        fontSize ={22}
        align= 'center'
        />
        <Text
        padding={30}
        y={60}
        width = {300}
        height = {400}
        text={text + "..."}
        fontFamily="Courier"
        fill={'gray'}
        fontSize ={12}
        align= 'center'
        />
        <Text
        padding={20}
        text="Latest updates:"
        fontFamily="Courier"
        fill={'gray'}
        fontSize={18}
        x={75}
        y={210}
        />
        <Line
            x={0}
            y={200}
            fill="dark-grey"
            points={[0, 0, 300, 0]}
            closed
            stroke="grey"
        />

        <Image
        width={15}
        height={15}
        x={270}
        y={370}
        image={deleteImage}
        onClick={deleteFunction}
        />
        
        <Image
        width={70}
        height={70}
        x={15}
        y={205}
        image={image}
        />
        {latest.map((line) => {
            counter += 30

            return (<Text
            padding={20}
            text={line.text}
            width = {250}
            wrap = "none"
            ellipsis = {true}
            x={40}
            y={counter}
            fontFamily="Courier"
            fill={'gray'}
            fontSize={12}
            align='center' />)
            
        }
        )}
        

    </Group>


    return group

}

export const WebLinkEmbed = (data) => {
    const themeColor = data['theme-color']
    const title = data.title
    const description = data.description
    const keywords = data.keywords
    const group = <Group
    x={350}
    y={100}
    width={130}
    height={150}
    draggable={true}
    onDblClick={() => window.open(data.url, '_ blank')}
    >
        
        <Rect
        width={300}
        height={220}
        fill="white"
        stroke="gray"
        cornerRadius={5}
        />
        <Rect
        width={300}
        height={30}
        fill={themeColor}
        stroke="gray"
        cornerRadius={10}
        />
        <Text
        padding={50}
        text={title}
        width={300}
        fontFamily="Courier"
        fill={'black'}
        fontSize ={22}
        align= 'center'
        />
        <Text
        padding={20}
        text={description}
        fontFamily="Courier"
        fill={'gray'}
        fontSize={14}
        width={300}
        x={10}
        y={80}
        />
        <Line
            x={0}
            y={150}
            fill="dark-grey"
            points={[0, 0, 300, 0]}
            closed
            stroke="grey"
        />
        <Text
        padding={20}
        text={keywords}
        fontFamily="Courier"
        fill={'gray'}
        fontSize={10}
        width={300}
        x={10}
        y={160}
        />
    </Group>

    return group
}

export const GithubEmbed = (data, githubUsername, githubRepo, image, linkFunction, deleteImage, deleteFunction) => {
    let counter = 50;

    const group = <Group
    x={350}
    y={100}
    width={130}
    height={150}
    draggable={true}
    onDblClick={() => window.open("https://github.com/" + githubUsername + "/" + githubRepo, '_ blank')}
    >
        <Rect
        width={300}
        height={250}
        fill="white"
        stroke="gray"
        cornerRadius={10}
        />
        <Text
        padding={20}
        y={30}
        x={20}
        text={githubRepo}
        width={300}
        fontFamily="Courier"
        fill={'black'}
        fontSize ={22}
        align= 'center'
        />

        <Line
            x={0}
            y={100}
            fill="dark-grey"
            points={[0, 0, 300, 0]}
            closed
            stroke="grey"
        />
        <Line
            x={0}
            y={150}
            fill="dark-grey"
            points={[0, 0, 300, 0]}
            closed
            stroke="grey"
        />
        <Line
            x={0}
            y={200}
            fill="dark-grey"
            points={[0, 0, 300, 0]}
            closed
            stroke="grey"
        />

        <Image
        width={70}
        height={70}
        x={10}
        y={20}
        image={image}
        />
        {data.map((branch) => {

            counter += 50

            return (
            <Text
            padding={20}
            text={branch.name}
            width = {250}
            wrap = "none"
            ellipsis = {true}
            x={20}
            y={counter}
            fontFamily="Courier"
            fill={'gray'}
            fontSize={16}
            align='center' 
            onDblClick={() => linkFunction(url)}/>
)
            
        }
        )}
        

    </Group>


    return group

}

