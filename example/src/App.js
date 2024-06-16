import React from 'react'
import { ExampleComponent } from 'react-table-modal'
import 'react-table-modal/dist/index.css'

const App = () => {
  return (
    <ExampleComponent
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
