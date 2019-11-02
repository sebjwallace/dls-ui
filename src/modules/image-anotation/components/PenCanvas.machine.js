import { Machine, interpret } from 'xstate'

const machine = Machine(
  {
    id: 'pen-canvas',
    initial: 'idle',
    states: {
      idle: {
        on: {
          mousedown: {
            target: 'createdStartPoint',
            actions: ['createStartPoint']
          }
        }
      },
      createdStartPoint: {
        on: {
          mousedown: {
            target: 'createdEndPoint',
            actions: ['createEndPoint']
          }
        }
      },
      createdEndPoint: {
        on: {
          mousemove: {
            target: 'modifyingEndControlPoint',
            actions: 'modifyEndControlPoint'
          },
          mouseup: 'idle'
        }
      },
      modifyingEndControlPoint: {
        on: {
          mousemove: {
            target: 'modifyingEndControlPoint',
            actions: 'modifyEndControlPoint'
          },
          mouseup: 'idle'
        }
      }
    }
  },
  {
    actions: {
      createStartPoint(ctx, event){
        console.log('created start point')
      },
      createEndPoint(ctx, event){
        console.log('created end point')
      },
      modifyEndControlPoint(ctx, event){
        console.log('modifying end point')
      }
    }
  }
)

export default interpret(machine).start()