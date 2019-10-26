import React from "react"
import { storiesOf } from "@storybook/react"

import BoxCanvas from "./BoxCanvas"

storiesOf("BoxCanvas", module)
    .add("default",
        () => <BoxCanvas
            imagePath='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png'
        />
    )