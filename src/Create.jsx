import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Daily');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author, checked: false};

    fetch('https://jsonfortodo.onrender.com/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Task Goal:</label>
        <input 
          type="text" 
          required 
          value={title}
          maxlength="50"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Steps:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Task Category:</label>
        <select
          value={author}
          onChange={(e) =>
            e.target.value === "Other"
              ? (() => {
                  let enteredCategory = prompt("What's the task category?", "Other");
                  if (enteredCategory === '') {
                    setAuthor("Other");
                  }
                  else setAuthor(enteredCategory);
                })()
              : setAuthor(e.target.value)
          }
        >
          <option value="Daily">Daily</option>
          <option value="Coding">Coding</option>
          <option value="Exercise">Exercise</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Cooking">Cooking</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
        <button>Add Task</button>
      </form>
    </div>
  );
}
 
export default Create;