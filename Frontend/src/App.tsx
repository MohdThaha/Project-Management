import TodoItem from "./components/Todoitem"
import { dummydata } from "./data/todos"


function App() {

  return (
    <main className="py-10 h-screen">
      <h1 className="text-center text-3xl font-bold">To-do App </h1>
      <div className="max-w-lg mx-auto">
        <div className="space-y-2 ">
          {dummydata.map(todo => (
            <p key={todo.id} className="text-lg">
              <TodoItem todo={todo }/>
            </p>
          )) }
        </div>
      </div>
    </main>
  )
  
}

export default App
