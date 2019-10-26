import React, { useState, useRef } from 'react'
import './Canvas.scss'

type CanvasProps = {
  imagePath: string
}

const Canvas = ({ imagePath }: CanvasProps) => {

  const [ imageDims, setImageDims ] = useState({ width: 0, height: 0 })
  const [ isMouseDown, setMouseDown ] = useState(false)
  const canvasRef = useRef(null)
  
  return <div className="Canvas">
    <img
      className="image"
      src={imagePath}
      alt=''
      onLoad={({ target }) => setImageDims({
        width: (target as HTMLImageElement).width,
        height: (target as HTMLImageElement).height
      })}
    />
    <canvas
      ref={canvasRef}
      className="canvas"
      width={imageDims.width}
      height={imageDims.height}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={({ nativeEvent: event }) => {
        if(!isMouseDown) return
        const canvas: any = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillRect(event.offsetX, event.offsetY, 10, 10)
      }}
    />
  </div>
  
};

export default Canvas