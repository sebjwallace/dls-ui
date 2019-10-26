import React, { useState, useRef } from 'react'
import './BoxCanvas.scss'

type BoxCanvasProps = {
  imagePath: string,
  onDraw?: Function
}

const BoxCanvas = ({ imagePath, onDraw = () => {} }: BoxCanvasProps) => {

  const [ boxPos, setBoxPos ] = useState({ x: 0, y: 0 })
  const [ boxDims, setBoxDims ] = useState({ width: 0, height: 0 })
  const [ isMouseDown, setMouseDown ] = useState(false)
  const [ imageDims, setImageDims ] = useState({ width: 0, height: 0 })
  const canvasRef = useRef(null)
  
  return <div className="BoxCanvas">
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
      onMouseDown={({ nativeEvent: event }) => {
        setBoxPos({ x: event.offsetX, y: event.offsetY })
        setMouseDown(true)
      }}
      onMouseUp={() => {
        setMouseDown(false)
        onDraw(boxDims)
      }}
      onMouseMove={({ nativeEvent: event }) => {
        if(!isMouseDown) return
        const { offsetX, offsetY } = event
        const width = offsetX - boxPos.x
        const height = offsetY - boxPos.y
        setBoxDims({ width, height })
        const canvas: any = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.strokeStyle = 'red'
        ctx.clearRect(0, 0, imageDims.width, imageDims.height)
        ctx.strokeRect(boxPos.x, boxPos.y, width, height)
      }}
    />
  </div>
  
};

export default BoxCanvas