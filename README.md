# react-input-tags

> An input box with tags.
[Demo page](https://derekedelaney.github.io/react-input-tags/)

[![NPM](https://img.shields.io/npm/v/@derekedelaney/react-input-tags.svg)](https://www.npmjs.com/package/@derekedelaney/react-input-tags)

## Install

```bash
npm install --save @derekedelaney/react-input-tags
```
OR
```bash
yarn add @derekedelaney/react-input-tags
```

## Usage

```jsx
import React, { Component } from 'react'

import InputTags from '@derekedelaney/react-input-tags'

class Example extends Component {
  render () {
    return (
      <InputTags
        tags={this.state.tags}
        keyCodes={[9, 13, 32, 188]}
        onDeleteTag={this.handleDeleteTag}
        onNewTag={this.handleNewTag}
        onInputChange={this.handleInputChange}
        onEmptyDelete={this.handleEmptyDelete}
        clearInputOnNewTag
        inputPlaceholderText="Type anything here"
      />
    )
  }
}
```

## Options
* `tags` (array): An array of (objects) tags in the input box.
  * `id` (number or string): A unique value for each tag.
  * `text` (string): The text displayed in the tag.
* `onDeleteTags` (function) [`(tag, index)`]: A callback function when the delete button is clicked.
* `keyCodes` (array): An array of keyCodes that will trigger the tag events.
* `onNewTag` (function) [`(value)`]: A callback function when a key is pressed in the input box that matches one in the keyCodes array.
* `onInputChange` (function) [`(value)`]: A callback function when changes is detected in the input box.
* `onEmptyDelete` (function) [`()`]: A callback function when delete/backspace is pressed and the input box is empty.
* `clearInputOnNewTag` (bool) [`false`]: If `true`, the input box will clear after a new tag is added.
* `inputPlaceholderText` (string) [`null`]: A string to add to the inputs placeholder.
* `borderClass` (string) [`null`]: A className that can override the default styling for the border.
* `tagContainerClass` (string) [`null`]: A className that can override the default styling for the tag container.
* `tagClass` (string) [`null`]: A className that can override the default styling for the tag.
* `closeClass` (string) [`null`]: A className that can override the default styling for the close.
* `tagInputClass` (string) [`null`]: A className that can override the default styling for the tag input.

## License

ISC © [derekedelaney](https://github.com/derekedelaney)