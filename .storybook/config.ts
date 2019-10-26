import { configure, addParameters } from "@storybook/react"
import { themes } from '@storybook/theming'

const req = require.context("../src", true, /\.stories\.tsx$/)

addParameters({
  options: {
    theme: themes.light
  }
})

function loadStories() {
    req.keys().forEach(req)
}

configure(loadStories, module)