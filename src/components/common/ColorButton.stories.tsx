import React from "react";
import { storiesOf } from "@storybook/react";
import ColorButton from "./ColorButton";
storiesOf("ColorButton", module)
    .add("default",
        () => <ColorButton/>
    )