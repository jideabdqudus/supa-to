import { Link } from "react-router-dom";
const TodoCard = ({ todo, onDelete }) => {
  return (
    <div className="todo-card">
      <h3>{todo.task}</h3>
      <p>{todo.desc}</p>
      <div className="rating">{String(todo.done)}</div>
      <div className="buttons">
        <Link to={"/" + todo.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={() => onDelete(todo.id)}>
          delete
        </i>
      </div>
    </div>
  );
};

export default TodoCard;
