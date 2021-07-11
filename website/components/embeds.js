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

export const GithubEmbed = (data, image, linkFunction, deleteImage, deleteFunction) => {
    let counter = 230;
    console.log("embed data", data)

    const group = <Group
    x={350}
    y={100}
    width={130}
    height={150}
    draggable={true}
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
        text={"branches"}
        width={300}
        fontFamily="Courier"
        fill={'black'}
        fontSize ={22}
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
        {data.map((branch) => {

            counter += 30

            return (
            <Text
            padding={20}
            text={branch.branch}
            width = {250}
            wrap = "none"
            ellipsis = {true}
            x={40}
            y={counter}
            fontFamily="Courier"
            fill={'gray'}
            fontSize={12}
            align='center' 
            onDblClick={() => linkFunction(url)}/>
)
            
        }
        )}
        

    </Group>


    return group

}

