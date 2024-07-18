# react-modal

* react-modal is a versatile and accessible modal dialog component for React, providing a straightforward way to create customizable modal popups in applications.


## Table of Contents

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Prerequires](#prerequires)
* [Examples](#examples)


## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):


    $ npm install --save react-table-modal
    $ yarn add react-table-modal


## Getting Started
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

```
npm start
```

## Prerequires

```
npm install
```

## Examples

Here is a simple example of react-modal being used in an app with some custom
styles and focusable input elements within the modal content:

```jsx
import React from 'react'
import { DataTable } from 'react-table-modal'
import 'react-table-modal/dist/index.css'

const App = () => {
  return (
    <DataTable
      theme="blue"
      editButton={true}
      editField={["name", "family", "retired"]}
      deleteButton={true}
      cols={["name", "family", "retired"]}
      data={[
        { name: "ali", family: "rezaei", retired: 'Yes' },
        { name: "reza", family: "alinia", retired: 'No' },
        { name: "mehdi", family: "hoseini", retired: 'Yes' },
        { name: "amin", family: "amiri", retired: 'Yes' },
        { name: "mehran", family: "kazemi", retired: 'No' },
      ]}
    />
  )
}

export default App

```


## Attributes

| Name         | Type   | Description                                           |
|--------------|--------|-------------------------------------------------------|
| theme        | string | This feature sets the table color theme.              |
| editButton   | boolean| Enabling this feature adds an edit button to each row.|
| editField    | array  | Specifies the editable fields.                         |
| deleteButton | boolean| Ability to add a delete button to each row of the table.|
| cols         | array  | Specifies the columns to be displayed in the table.    |
| rowsPerPage  | object | The table displays the number of rows per page.        |
| data         | array  | A collection of data.                                 |


## DataTable

The DataTable component is used to display tabular data with specific features.

### Features

* [Theme Examples](#theme-examples)


### Theme Examples

Below are examples of the available themes along with their respective class names and images:

#### Default Theme

```jsx
<DataTable theme="default" ... />
```
<img src="https://s8.uupload.ir/files/default_5g30.png" alt="default-theme" width="300" height="200">


#### Blue Theme

```jsx
<DataTable theme="blue" ... />
```
<img src="https://s8.uupload.ir/files/blue_q4ph.png" alt="blue-theme" width="300" height="200">


#### Red Theme

```jsx
<DataTable theme="red" ... />
```
<img src="https://s8.uupload.ir/files/red_4eg7.png" alt="red-theme" width="300" height="200">


#### Green Theme

```jsx
<DataTable theme="green" ... />
```
<img src="https://s8.uupload.ir/files/green_uvgx.png" alt="green-theme" width="300" height="200">


## License

MIT © [alireza-ramzanpour](https://github.com/alireza-ramzanpour)
