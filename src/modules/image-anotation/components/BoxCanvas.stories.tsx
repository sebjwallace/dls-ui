import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, number } from '@storybook/addon-knobs'
import catImage from 'assets/photos/cats/cat.jpeg'

import BoxCanvas from "./BoxCanvas"

const stories = storiesOf("BoxCanvas", module)
stories.addDecorator(withKnobs)

stories.add("default", () => {
  return <BoxCanvas
    imagePath={catImage}
    scale={number('scale', 1)}
  />
})