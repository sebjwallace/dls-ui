import React from "react"
import { storiesOf } from "@storybook/react"
import catImage from 'assets/photos/cats/cat.jpeg'

import LassoCanvas from "./LassoCanvas"

storiesOf("LassoCanvas", module)
    .add("default",
        () => <LassoCanvas
            imagePath={catImage}
        />
    )