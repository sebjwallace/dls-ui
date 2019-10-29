import React from "react"
import { storiesOf } from "@storybook/react"
import catImage from 'assets/photos/cats/cat.jpeg'

import PenCanvas from "./PenCanvas"

storiesOf("PenCanvas", module)
    .add("default",
        () => <PenCanvas
            imagePath={catImage}
            scale={1}
        />
    )