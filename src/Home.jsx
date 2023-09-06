import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: blogs, setData: setBlogs } = useFetch(
    "https://jsonfortodo.onrender.com/blogs"
  );

  const handleClearList = () => {
    // Loop through the blogs and send DELETE requests for each one
    blogs.forEach((blog) => {
      fetch(`https://jsonfortodo.onrender.com/blogs/${blog.id}`, {
        method: "DELETE",
      }).then(()=>window.location.reload())
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    });
  };

  let completedTasksCount = blogs ? blogs.filter((blog) => blog.checked).length : 0;
  let totalTasksCount = blogs ? blogs.length : 0;

  

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && (
        <div>
          <h2>
            {totalTasksCount===0 ? `Add Tasks` : completedTasksCount === totalTasksCount? `Well Done. Congratulations!` : `${completedTasksCount}/${totalTasksCount} Tasks Completed`}
          </h2>

          {completedTasksCount!==0 && completedTasksCount === totalTasksCount && (
            <button onClick={handleClearList}>Clear List</button>
          )}

          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default Home;
