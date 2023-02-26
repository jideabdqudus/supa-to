import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
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
      .insert([{ task, desc, done }])
      .select(); // Each object in the array represents a row

    if (error) {
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      setFormError(null);
      navigate("/");
    }
  };

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

        <label htmlFor="done">Done:</label>
        <input
          type="checkbox"
          id="done"
          className="checker"
          value={done}
          onChange={(e) => setDone(e.target.checked)}
        />

        <button>Create</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
