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
    point: {
      start: { x: 50,    y: 20  },
      cp1: { x: 230,   y: 30  },
      cp2: { x: 150,   y: 80  },
      end: { x: 250,   y: 100 }
    },
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
    const { start, cp1, cp2, end } = this.state.point
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.bezierCurveTo(cp2.x, cp2.y, cp1.x, cp1.y, end.x, end.y)
    ctx.stroke()
  }

  onMouseDown = ({ nativeEvent: event }: { nativeEvent: MouseEvent }) => {
    this.drag = this.dragStart
  }

  onMouseMove = (event : any) => {
    if(this.state.isMouseDown){
      this.setState(this.drag(event))
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

  dragStart = ({ movementX, movementY } : any) => ({
    point: {
      ...this.state.point,
      start: {
        x: this.state.point.start.x + movementX,
        y: this.state.point.start.y + movementY
      }
    }
  })

  dragControl1 = ({ movementX, movementY } : any) => ({
    point: {
      ...this.state.point,
      cp1: {
        x: this.state.point.cp1.x + movementX,
        y: this.state.point.cp1.y + movementY
      }
    }
  })

  dragControl2 = ({ movementX, movementY } : any) => ({
    point: {
      ...this.state.point,
      cp2: {
        x: this.state.point.cp2.x + movementX,
        y: this.state.point.cp2.y + movementY
      }
    }
  })

  dragEnd = ({ movementX, movementY } : any) => ({
    point: {
      ...this.state.point,
      end: {
        x: this.state.point.end.x + movementX,
        y: this.state.point.end.y + movementY
      }
    }
  })

  render(){

    const { imagePath, scale, handleRadius = 4 } = this.props
    const width = (this.$image || {}).naturalWidth * scale || 0
    const height = (this.$image || {}).naturalHeight * scale || 0
    const { start, cp1, cp2, end } = this.state.point

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