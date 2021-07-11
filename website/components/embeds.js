import { Text, Group, Rect, Image, Line } from 'react-konva';
const figmaSrc = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUKQDEpSXcCgPOUZAMemt7L%2FSample-File%3Fnode-id%3D0%253A2"
import useImage from 'use-image';

export const FigmaEmbed = (src) => {
    return(<iframe className="iframe"
        width="600" 
        height="400" 
        src={src}
        allowfullscreen>
    </iframe>)
}


    
export const NotionEmbed = (title, text, latest) => {
    const [image] = useImage("https://i.pinimg.com/originals/99/7b/0a/997b0a243df40b681d8c8177724f1b45.png")
    let counter = 230;

    const group = <Group
    x={350}
    y={100}
    width={130}
    height={150}
    draggable={true}>
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
        fontFamily="Courier"
        fill={'black'}
        fontSize ={22}
        align= 'center'
        />
        <Text
        padding={30}
        y={40}
        text={text}
        fontFamily="Courier"
        fill={'black'}
        fontSize ={18}
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
