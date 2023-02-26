import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task || !desc) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("supa-todo")
      .update([{ task, desc, done }])
      .eq("id", id) // if it's equals to id
      .select();

    if (error) {
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      const { data, error } = await supabase
        .from("supa-todo")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTask(data.task);
        setDesc(data.desc);
        setDone(data.done);
      }
    };

    fetchTodo();
  }, [id, navigate]);

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task:</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <label htmlFor="desc">Desc:</label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label htmlFor="done">Done</label>
        <input
          type="checkbox"
          id="done"
          className="checker"
          defaultChecked={done}
          value={done}
          onChange={(e) => setDone(e.target.checked)}
        />

        <button>Update</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
