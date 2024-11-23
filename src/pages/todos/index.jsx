import axios from "axios";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //   const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  //   const data = await res.json();
  return {
    props: {
      todos: data,
    },
  };
}

const Todos = (props) => {
  const { todos } = props;
  //   const [todos, setTodos] = useState([]);
  //   useEffect(() => {
  //     axios
  //       .get('https://jsonplaceholder.typicode.com/todos')
  //       .then((res) => setTodos(res.data));
  //     // fetch('https://jsonplaceholder.typicode.com/todos')
  //     //   .then((res) => res.json())
  //     //   .then((data) => setTodos(data));
  //   }, []);

  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <p key={todo.id} style={{ color: todo.completed ? "green" : "red" }}>
          {todo.title}
        </p>
      ))}
    </div>
  );
};

export default Todos;
