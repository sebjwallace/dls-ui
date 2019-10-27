import React from 'react'
import './BoxCanvas.scss'

type BoxCanvasProps = {
  imagePath: string,
  scale: number
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

  onMouseMove = (
    { nativeEvent: event }: { nativeEvent: MouseEvent }
  ) => {
    if(!this.state.isMouseDown) return
    const { offsetX, offsetY } = event
    const width = offsetX - this.state.boxPos.x
    const height = offsetY - this.state.boxPos.y
    this.setState({ boxDims: { width, height } })
  }

  onMouseDown = ({ nativeEvent: event }: { nativeEvent: MouseEvent }) => {
    this.setState({
      boxPos: { x: event.offsetX, y: event.offsetY },
      isMouseDown: true
    })
  }

  onMouseUp = () => {
    this.setState({ isMouseDown: false })
  }

  render(){

    const { imagePath, scale } = this.props
    const width = (this.$image || {}).naturalWidth * scale || 0
    const height = (this.$image || {}).naturalHeight * scale || 0

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
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      />
    </div>

  }

}

export default BoxCanvas