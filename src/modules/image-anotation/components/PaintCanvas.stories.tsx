import React from "react"
import { storiesOf } from "@storybook/react"
import catImage from 'assets/photos/cats/cat.jpeg'

import PaintCanvas from "./PaintCanvas"

storiesOf("PaintCanvas", module)
    .add("default",
        () => <PaintCanvas
            imagePath={catImage}
        />
    )