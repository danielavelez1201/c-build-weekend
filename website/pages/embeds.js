const figmaSrc = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUKQDEpSXcCgPOUZAMemt7L%2FSample-File%3Fnode-id%3D0%253A2"

export const FigmaEmbed = (src) => {
    return(<iframe className="iframe"
        width="400" 
        height="200" 
        src={src}
        allowfullscreen>
    </iframe>)
}
    