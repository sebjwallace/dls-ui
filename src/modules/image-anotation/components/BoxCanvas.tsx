import React from 'react'
import './BoxCanvas.scss'

type BoxCanvasProps = {
  imagePath: string,
  scale: number,
  handleRadius?: number
}
class BoxCanvas extends React.Component<BoxCanvasProps> {

  private $canvas: any
  private $image: any

  public state = {
    boxPos: { x: 0, y: 0 },
    boxDims: { width: 0, height: 0 },
    isMouseDown: false
  }

  static getDerivedStateFromProps(props: BoxCanvasProps, state: any){
    const { x, y } = state.boxPos
    const { width: w, height: h } = state.boxDims
    const deltaScale = props.scale / (state.scale || 1) - 1
    return {
      scale: props.scale,
      boxPos: {
        x: x + (x * deltaScale),
        y: y + (y * deltaScale)
      },
      boxDims: {
        width: w + (w * deltaScale),
        height: h + (h * deltaScale)
      }
    }
  }

  componentDidUpdate(){
    this.renderCanvas()
  }

  renderCanvas = () => {
    const { x, y } = this.state.boxPos
    const { width, height } = this.state.boxDims
    const canvas: any = this.$canvas
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'red'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeRect(x, y, width, height)
  }

  onMouseDown = ({ nativeEvent: event }: { nativeEvent: MouseEvent }) => {
    this.drag = this.dragBottomRight
    this.setState({
      boxPos: { x: event.offsetX, y: event.offsetY },
      boxDims: { width: 0, height: 0 },
      isMouseDown: true
    })
  }

  onMouseMove = (event : any) => {
    const {
      boxPos = this.state.boxPos,
      boxDims = this.state.boxDims
    } = this.drag(event) || this.state
    
    const isValid = boxDims.width >= 0 && boxDims.height >= 0
    if(this.state.isMouseDown && isValid){
      this.setState({ boxPos, boxDims })
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

  dragTopLeft = ({ movementX, movementY } : any) => ({
    boxPos: {
      x: this.state.boxPos.x + movementX,
      y: this.state.boxPos.y + movementY
    },
    boxDims: {
      width: this.state.boxDims.width - movementX,
      height: this.state.boxDims.height - movementY
    }
  })

  dragBottomRight = ({ movementX, movementY } : any) => ({
    boxDims: {
      width: this.state.boxDims.width + movementX,
      height: this.state.boxDims.height + movementY
    }
  })

  dragBottomLeft = ({ movementX, movementY } : any) => ({
    boxPos: {
      x: this.state.boxPos.x + movementX,
      y: this.state.boxPos.y
    },
    boxDims: {
      width: this.state.boxDims.width - movementX,
      height: this.state.boxDims.height + movementY
    }
  })

  dragTopRight = ({ movementX, movementY } : any) => ({
    boxPos: {
      x: this.state.boxPos.x,
      y: this.state.boxPos.y + movementY
    },
    boxDims: {
      width: this.state.boxDims.width + movementX,
      height: this.state.boxDims.height - movementY
    }
  })

  dragAll = ({ movementX, movementY } : any) => ({
    boxPos: {
      x: this.state.boxPos.x + movementX,
      y: this.state.boxPos.y + movementY
    }
  })

  render(){

    const { imagePath, scale, handleRadius = 5 } = this.props
    const { boxPos, boxDims } = this.state
    const width = (this.$image || {}).naturalWidth * scale || 0
    const height = (this.$image || {}).naturalHeight * scale || 0

    const handles = [
      {
        style: {
          left: boxPos.x,
          top: boxPos.y,
          width: boxDims.width,
          height: boxDims.height
        },
        className: "box",
        handler: this.dragAll
      },
      {
        style: {
          left: boxPos.x - handleRadius,
          top: boxPos.y - handleRadius
        },
        handler: this.dragTopLeft
      },
      {
        style: {
          left: boxPos.x + boxDims.width - handleRadius,
          top: boxPos.y + boxDims.height - handleRadius
        },
        handler: this.dragBottomRight
      },
      {
        style: {
          left: boxPos.x - handleRadius,
          top: boxPos.y + boxDims.height - handleRadius
        },
        handler: this.dragBottomLeft
      },
      {
        style: {
          left: boxPos.x + boxDims.width - handleRadius,
          top: boxPos.y - handleRadius
        },
        handler: this.dragTopRight
      }
    ]

    return <div className="BoxCanvas">
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
        handles.map(({ style, handler, className } : any, key: number) => <div
          key={key}
          className={ className || "cursor" }
          style={style}
          onMouseUp={this.onMouseUp}
          onMouseDown={() => this.enableDrag(handler)}
          onMouseMove={this.onMouseMove}
        />)
      }
    </div>

  }

}

export default BoxCanvas