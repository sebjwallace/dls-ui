import React from 'react'
import './PenCanvas.scss'

type PenCanvasProps = {
  imagePath: string,
  scale: number,
  handleRadius?: number
}
class PenCanvas extends React.Component<PenCanvasProps> {

  private $canvas: any
  private $image: any

  public state = {
    points: [
      {
        start: { x: 50,    y: 20  },
        cp1: { x: 230,   y: 30  },
        cp2: { x: 150,   y: 80  },
        end: { x: 250,   y: 100 }
      },
      {
        start: { x: 250,   y: 100  },
        cp1: { x: 270,   y: 150  },
        cp2: { x: 380,   y: 340  },
        end: { x: 400,   y: 400 }
      }
    ],
    selectedPoint: 1,
    isMouseDown: false
  }

  static getDerivedStateFromProps(props: PenCanvasProps, state: any){
    return {
      scale: props.scale
    }
  }

  componentDidUpdate(){
    this.renderCanvas()
  }

  renderCanvas = () => {
    const canvas: any = this.$canvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,canvas.width,canvas.height)
    const { points } = this.state
    points.forEach(({ start, cp1, cp2, end }) => {
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.bezierCurveTo(cp2.x, cp2.y, cp1.x, cp1.y, end.x, end.y)
      ctx.stroke()
    })
  }

  onMouseDown = ({ nativeEvent: event }: { nativeEvent: MouseEvent }) => {
    this.drag = this.dragStart
  }

  onMouseMove = (event : any) => {
    if(this.state.isMouseDown){
      const point = this.state.points[this.state.selectedPoint]
      this.state.points[this.state.selectedPoint] = this.drag(event, point)
      this.setState({
        points: this.state.points
      })
    }
  }

  onMouseUp = () => {
    this.setState({ isMouseDown: false })
  }

  enableDrag = (dragMode: Function) => {
    this.setState({ isMouseDown: true })
    this.drag = dragMode
  }

  drag: any = () => {}

  dragStart = ({ movementX, movementY } : any, point: any) => ({
    ...point,
    start: {
      x: point.start.x + movementX,
      y: point.start.y + movementY
    }
  })

  dragControl1 = ({ movementX, movementY } : any, point: any) => ({
    ...point,
    cp1: {
      x: point.cp1.x + movementX,
      y: point.cp1.y + movementY
    }
  })

  dragControl2 = ({ movementX, movementY } : any, point: any) => ({
    ...point,
    cp2: {
      x: point.cp2.x + movementX,
      y: point.cp2.y + movementY
    }
  })

  dragEnd = ({ movementX, movementY } : any, point: any) => ({
    ...point,
    end: {
      x: point.end.x + movementX,
      y: point.end.y + movementY
    }
  })

  render(){

    const { imagePath, scale, handleRadius = 4 } = this.props
    const width = (this.$image || {}).naturalWidth * scale || 0
    const height = (this.$image || {}).naturalHeight * scale || 0
    const { points, selectedPoint } = this.state
    const { start, cp1, cp2, end } = points[selectedPoint]

    const handles = [
      {
        style: {
          top: start.y - handleRadius,
          left: start.x - handleRadius
        },
        handler: this.dragStart
      },
      {
        style: {
          top: end.y - handleRadius,
          left: end.x - handleRadius
        },
        handler: this.dragEnd
      },
      {
        style: {
          top: cp1.y - handleRadius,
          left: cp1.x - handleRadius
        },
        handler: this.dragControl1
      },
      {
        style: {
          top: cp2.y - handleRadius,
          left: cp2.x - handleRadius
        },
        handler: this.dragControl2
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
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
      />
      {
        points.map(({ start }, key) => <div
          key={key}
          className="cursor"
          style={{
            left: start.x,
            top: start.y
          }}
          onMouseDown={() => this.setState({ selectedPoint: key })}
        />)
      }
      {
        handles.map(({ style, handler }, key) => <div
          key={key}
          className="cursor"
          style={style}
          onMouseUp={this.onMouseUp}
          onMouseDown={() => this.enableDrag(handler)}
          onMouseMove={this.onMouseMove}
        />)
      }
    </div>

  }

}

export default PenCanvas