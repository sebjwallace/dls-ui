import React, { useState, useRef } from 'react'
import './LassoCanvas.scss'

type LassoCanvasProps = {
  imagePath: string
}

const LassoCanvas = ({ imagePath }: LassoCanvasProps) => {

  const [ imageDims, setImageDims ] = useState({ width: 0, height: 0 })
  const [ isMouseDown, setMouseDown ] = useState(false)
  const canvasRef = useRef(null)

  const getCanvas = () => {
    const canvas: any = canvasRef.current
    const ctx = canvas.getContext('2d')
    return { canvas, ctx }
  }
  
  return <div className="LassoCanvas">
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
      onMouseDown={() => {
        const { canvas, ctx } = getCanvas()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        setMouseDown(true)
      }}
      onMouseUp={() => {
        const { ctx } = getCanvas()
        ctx.fill()
        setMouseDown(false)
      }}
      onMouseMove={({ nativeEvent: event }) => {
        const { offsetX, offsetY } = event
        if(!isMouseDown) return
        const { ctx } = getCanvas()
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
      }}
    />
  </div>
  
};

export default LassoCanvas