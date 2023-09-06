import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {

  return (

    <>

    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <h2>{ blog.title }</h2>
            <p>{ blog.author }</p>
          </Link>
          <div className="xtick">
            <div>           
            <input
                type="checkbox"
                checked={blog.checked}
                onChange={(e) => {
                  fetch('https://jsonfortodo.onrender.com/blogs/' + blog.id, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      title: blog.title,
                      body: blog.body,
                      author: blog.author,
                      checked: !blog.checked
                    })
                  })
                    .then(() => {
                      // Rerender the blog with the updated checked value
                       window.location.reload();
                      });
                      
                    
                }}
            />

            </div>
            <div>
              <button onClick={() => {
    fetch('https://jsonfortodo.onrender.com/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      window.location.reload();
    }) 
  }}>
                <i className="material-icons">&#xe872;</i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

  </>
  );
}
 
export default BlogList;