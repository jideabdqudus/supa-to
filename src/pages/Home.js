import { useEffect, useState } from "react";
import TodoCard from "../component/TodoCard";
import supabase from "../config/supabaseClient";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [todo, setTodo] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const fetchTodo = async () => {
    const { data, error } = await supabase
      .from("supa-todo")
      .select()
      .order(orderBy, { ascending: false });

    if (error) {
      setFetchError("Could not fetch the todos");
      setTodo(null);
    }
    if (data) {
      setTodo(data);
      setFetchError(null);
    }
  };

  const onDelete = async (id) => {
    const { error } = await supabase.from("supa-todo").delete().eq("id", id);
    if (error) {
      setFetchError("Unable to delete record");
    } else {
      setFetchError(null);
      fetchTodo();
    }
  };

  useEffect(() => {
    fetchTodo();
    //eslint-disable-next-line
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}

      {todo && (
        <div className="todo">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("task")}>Task</button>
            <button onClick={() => setOrderBy("done")}>Done</button>
            {orderBy}
          </div>
          <div className="todo-grid">
            {todo.map((todo) => (
              <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
