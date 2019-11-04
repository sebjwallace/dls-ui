import React from 'react'
import './PenCanvas.scss'

type PenCanvasProps = {
  imagePath: string,
  scale: number,
  handleRadius?: number,
  points: Array<any>,
  selectedPoint: number,
  send: any
}
class PenCanvas extends React.Component<PenCanvasProps> {

  private $canvas: any
  private $image: any

  componentDidUpdate(){
    this.renderCanvas()
  }

  renderCanvas = () => {
    const canvas: any = this.$canvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,canvas.width,canvas.height)
    const { points } = this.props
    points.forEach(({ start, cp1, cp2, end }) => {
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.bezierCurveTo(cp2.x, cp2.y, cp1.x, cp1.y, end.x, end.y)
      ctx.stroke()
    })
  }

  render(){

    const { imagePath, scale, handleRadius = 4, send, points, selectedPoint } = this.props
    const width = (this.$image || {}).naturalWidth * scale || 0
    const height = (this.$image || {}).naturalHeight * scale || 0
    const { start, cp1, cp2, end } = points[selectedPoint]

    const handles = [
      {
        style: {
          top: start.y - handleRadius,
          left: start.x - handleRadius
        },
        handler: 'start'
      },
      {
        style: {
          top: end.y - handleRadius,
          left: end.x - handleRadius
        },
        handler: 'end'
      },
      {
        style: {
          top: cp1.y - handleRadius,
          left: cp1.x - handleRadius
        },
        handler: 'cp1'
      },
      {
        style: {
          top: cp2.y - handleRadius,
          left: cp2.x - handleRadius
        },
        handler: 'cp2'
      }
    ]

    return <div className="PenCanvas">
      <img
        ref={node => this.$image = node}
        className="image"
        src={imagePath}
        alt=''
        onLoad={() => this.forceUpdate()}
        style={{ width }}
      />
      <canvas
        ref={node => this.$canvas = node}
        className="canvas"
        width={width}
        height={height}
        onMouseUp={send}
        onMouseDown={send}
        onMouseMove={send}
      />
      {
        points.map(({ start }, key) => <div
          key={key}
          className="cursor"
          style={{
            left: start.x,
            top: start.y
          }}
          onMouseMove={send}
        />)
      }
      {
        handles.map(({ style, handler }, key) => <div
          key={key}
          className="cursor"
          style={style}
          onMouseMove={send}
        />)
      }
    </div>

  }

}

export default PenCanvas