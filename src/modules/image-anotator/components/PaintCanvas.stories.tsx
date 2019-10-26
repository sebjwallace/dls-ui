import React from "react"
import { storiesOf } from "@storybook/react"

import PaintCanvas from "./PaintCanvas"

storiesOf("PaintCanvas", module)
    .add("default",
        () => <PaintCanvas
            imagePath='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png'
        />
    )