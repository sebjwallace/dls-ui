import { Machine, interpret } from 'xstate'

export default (component) => {
  const machine = Machine(
    {
      id: 'pen-canvas',
      initial: 'idle',
      states: {
        idle: {
          on: {
            mousedown: {
              target: 'createdStartPoint',
              actions: 'createStartPoint'
            },
            dragPoint: {
              target: 'modifyingPoint',
              actions: 'selectPoint'
            }
          }
        },
        createdStartPoint: {
          on: {
            mousedown: {
              target: 'createdEndPoint',
              actions: 'createEndPoint'
            }
          }
        },
        createdEndPoint: {
          on: {
            mousemove: {
              target: 'modifyingEndControlPoint',
              actions: 'modifyEndControlPoint'
            },
            mouseup: {
              target: 'createdStartPoint',
              actions: 'createTrailingPoint'
            }
          }
        },
        modifyingPoint: {
          on: {
            mousemove: {
              target: 'modifyingPoint',
              actions: 'modifyPoint'
            },
            mouseup: {
              target: 'idle'
            }
          }
        },
        modifyingEndControlPoint: {
          on: {
            mousemove: {
              target: 'modifyingEndControlPoint',
              actions: 'modifyEndControlPoint'
            },
            mouseup: {
              target: 'createdStartPoint',
              actions: 'createTrailingPoint'
            }
          }
        }
      }
    },
    {
      actions: {
        selectPoint(ctx, { point, pointType }){
          component.setState({
            selectedPoint: point,
            selectedPointType: pointType
          })
        },
        createStartPoint(ctx, { nativeEvent: event }){
          component.setState({
            newPoint: {
              start: {
                x: event.offsetX,
                y: event.offsetY
              },
              cp1: {
                x: event.offsetX,
                y: event.offsetY
              }
            }
          })
        },
        createEndPoint(ctx, { nativeEvent: event }){
          component.setState({
            newPoint: null,
            selectedPoint: component.state.points.length,
            points: [
              ...component.state.points,
              {
                ...component.state.newPoint,
                cp2: {
                  x: event.offsetX,
                  y: event.offsetY
                },
                end: {
                  x: event.offsetX,
                  y: event.offsetY
                }
              }
            ]
          })
        },
        modifyPoint(ctx, { nativeEvent: event }){
          const points = [...component.state.points]
          points[component.state.selectedPoint] = {
            ...points[component.state.selectedPoint],
            [component.state.selectedPointType]: {
              x: event.offsetX,
              y: event.offsetY
            }
          }
          component.setState({ points })
        },
        modifyEndControlPoint(ctx, { nativeEvent: event }){
          const points = [...component.state.points]
          points[component.state.selectedPoint] = {
            ...points[component.state.selectedPoint],
            cp1: {
              x: event.offsetX,
              y: event.offsetY
            }
          }
          component.setState({ points })
        },
        createTrailingPoint(){
          const lastPoint = component.state.points[component.state.points.length-1]
          component.setState({
            newPoint: {
              start: lastPoint.end,
              cp1: lastPoint.end
            }
          })
        },
      }
    }
  )

  return interpret(machine).onTransition(event => console.log(event.value)).start()
}