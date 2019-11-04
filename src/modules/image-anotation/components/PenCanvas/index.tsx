import React from "react"
import { Machine, interpret } from 'xstate'

import PenCanvas from "./PenCanvas"
import chart from './PenCanvas.chart'

export default class extends React.Component {

  constructor(props){
    super(props)
    this.machine = interpret(props.machine || Machine.apply(null, chart))
      .onTransition(({ context }) => this.setState(context))
    this.state = this.machine.machine.context
  }

  componentDidMount(){
    this.machine.start()
  }

  render(){

    return <div>
      <PenCanvas
        {...this.props}
        {...this.state}
        send={this.machine.send}
      />
    </div>

  }

}