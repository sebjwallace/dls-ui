import React, { useState, useRef } from 'react'
import './PaintCanvas.scss'

type PaintCanvasProps = {
  imagePath: string,
  radius?: number
}

const PaintCanvas = ({ imagePath, radius = 5 }: PaintCanvasProps) => {

  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 })
  const [ imageDims, setImageDims ] = useState({ width: 0, height: 0 })
  const [ isMouseDown, setMouseDown ] = useState(false)
  const canvasRef = useRef(null)
  
  return <div className="PaintCanvas">
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
        const { x: prevX, y: prevY } = mousePos;
        const { offsetX, offsetY } = event
        setMousePos({ x: offsetX, y: offsetY })
        if(!isMouseDown) return
        const canvas: any = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = radius * 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
      }}
    />
    <div
      className="cursor"
      style={{
        left: mousePos.x - radius,
        top: mousePos.y - radius,
        width: radius * 2,
        height: radius * 2
      }}
    />
  </div>
  
};

export default PaintCanvas