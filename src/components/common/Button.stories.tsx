import React from "react"
import { storiesOf } from "@storybook/react"

import Button from "./Button"

storiesOf("Button", module)
    .add("default",
        () => <Button text="Click Me"/>
    )
    .add("primary",
        () => <Button text="Click Me" type="primary"/>
    )
    .add("success",
        () => <Button text="Click Me" type="success"/>
    )
    .add("info",
        () => <Button text="Click Me" type="info"/>
    )
    .add("warning",
        () => <Button text="Click Me" type="warning"/>
    )
    .add("danger",
        () => <Button text="Click Me" type="danger"/>
    )