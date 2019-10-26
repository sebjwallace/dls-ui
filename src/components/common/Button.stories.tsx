import React from "react";
import { storiesOf } from "@storybook/react";
import ColorButton from "./Button";
storiesOf("Button", module)
    .add("default",
        () => <ColorButton/>
    )