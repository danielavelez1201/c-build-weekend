import { Stage, Layer, Rect, Text, Circle, Line, Group, Star, Image } from 'react-konva';
import useImage from 'use-image';

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


export const TextObj = (text) => {
    return (<Text
            text={text}
            x={300}
            y={300}
            fontSize={20}
            width={120}
            fontFamily="Courier"
            draggable={true}
            fill={'black'}
        />)
}

export const TitleTextObj = <Text
    text="Project"
    fontFamily="Courier"
    fontSize={50}
    x={800}
    y={20}
    fill={'black'}

/>

export const NoteTextObj = (text) => {
    return (
        <Group
        x={300}
        y={300}
        width={130}
        height={150}
        draggable={true}>
        <Rect
            width={200}
            height={200}
            fill="#B3DFB5"
        />
        
            <Text
                text={text}
                padding={20}
                fontSize={14}
                fontFamily="Courier"
                width={200}
                fill={'black'}
            />

        </Group>

        )
} 

export const CircleTextObj = (text) => {

    return (
        <Group
        x={300}
        y={300}
        width={130}
        height={150}
        draggable={true}>
        <Circle
            radius={100}
            fill="#E0BBE4" 
        />
        
            <Text
                x={-50}
                y={-50}
                width={120}
                text={text}
                padding={5}
                fontSize={14}
                fontFamily="Courier"
                fill={'black'}
            />

        </Group>

        )
} 


export const StarObj = 
    <Star
        x={500}
        y={600}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill="#89b717"
        opacity={0.8}
        draggable
        shadowColor="black"
        shadowOpacity={0.6}
        shadowOffsetX={5}
        shadowOffsetY={5}
        isDragging={false}
      />


export const CorgiObj = () => {
    const [image] = useImage("https://cdn1.vectorstock.com/i/thumb-large/43/95/funny-orange-welsh-corgi-vector-23984395.jpg")

    return(
        <Image
        height={80}
        width={80}
        draggable
        image={image}
        x={32}
        y={200}
        />

    )
}