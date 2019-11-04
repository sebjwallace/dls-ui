import { assign } from 'xstate'

const context = {
  points: [
    {
      start: { x: 0, y: 0 },
      cp1: { x: 0, y: 0 },
      cp2: { x: 0, y: 0 },
      end: { x: 0, y: 0 }
    }
  ],
  selectedPoint: 0
}

export default [
  {
    key: 'pen',
    context,
    initial: 'draw',
    states: {
      draw: {
        initial: 'startP',
        states: {
          startP: {
            on: {
              mousemove: {
                target: 'startP',
                actions: 'moveAll'
              },
              mouseup: {
                target: 'editP'
              }
            }
          },
          editP: {
            on: {
              mousemove: {
                target: "editP",
                actions: "moveP"
              },
              mousedown: {
                target: "editCP"
              },
              ctrlup: {
                target: "editCP"
              }
            }
          },
          editCP: {
            on: {
              mousemove: {
                target: "editCP",
                actions: "moveCP"
              },
              mouseup: {
                target: "editP",
                actions: "addP"
              },
              ctrldown: {
                target: "editP"
              }
            }
          }
        },
        on: {
          close: {
            target: "modify.idle"
          }
        }
      },
      modify: {
        initial: "idle",
        states: {
          idle: {
            on: {
              mousedownP: {
                target: "editP",
                actions: "selectP"
              },
              mousedownL: {
                target: 'editP',
                actions: 'addP'
              }
            }
          },
          editP: {
            on: {
              mousemove: {
                target: "editP",
                actions: "moveP"
              },
              mouseup: {
                target: "selectedP"
              }
            }
          },
          selectedP: {
            on: {
              clickcanvas: {
                target: 'idle',
                actions: 'deselectAll'
              },
              mousedownP: {
                target: "editP",
                actions: "moveP"
              },
              mousedownCP: {
                target: 'editCP'
              }
            }
          },
          editCP: {
            on: {
              mousemove: {
                target: "editCP",
                actions: "moveCP"
              },
              mouseup: {
                target: "selectedCP"
              }
            }
          },
          selectedCP: {
            on: {
              mousedown: {
                target: "editCP",
                actions: "moveCP"
              },
              clickcanvas: {
                target: 'idle',
                actions: 'deselectAll'
              }
            }
          }
        }
      }
    }
  },
  {
    actions: {
      moveAll: assign((ctx, { nativeEvent: { offsetX: x, offsetY: y } }) => {
        ctx.points[ctx.selectedPoint] = {
          start: { x, y },
          cp1: { x, y },
          cp2: { x, y },
          end: { x,y }
        }
        return ctx
      }),
      moveP: assign((ctx, { nativeEvent: { offsetX: x, offsetY: y } }) => {
        ctx.points[ctx.selectedPoint] = {
          ...ctx.points[ctx.selectedPoint],
          cp2: { x, y },
          end: { x,y }
        }
        return ctx
      }),
      moveCP: assign((ctx, { nativeEvent: { offsetX: x, offsetY: y } }) => {
        ctx.points[ctx.selectedPoint] = {
          ...ctx.points[ctx.selectedPoint],
          cp1: { x, y }
        }
        return ctx
      }),
      addP: assign((ctx, { nativeEvent: { offsetX: x, offsetY: y } }) => {
        const position = ctx.points[ctx.selectedPoint].end
        ctx.points.push({
          start: position,
          cp1: position,
          cp2: position,
          end: position
        })
        ctx.selectedPoint = ctx.points.length - 1
        return ctx
      }),
    }
  }
]