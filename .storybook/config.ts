import { configure, addParameters } from "@storybook/react"
import { themes, create } from '@storybook/theming'

const req = require.context("../src", true, /\.stories\.tsx$/)

const theme = create({
  base: 'light',
  appContentBg: '#f5f5f5'
});

addParameters({
  options: {
    theme
  }
})

function loadStories() {
    req.keys().forEach(req)
}

configure(loadStories, module)