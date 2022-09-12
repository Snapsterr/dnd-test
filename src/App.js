import React from "react"
import DragGroups from "./components/DragGroups/DragGroups"

import "./App.scss"

const data = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
]

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DragGroups data={data} />
      </header>
    </div>
  )
}

export default App
