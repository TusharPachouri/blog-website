import Posts from "./Post";
import CreatePost from "./CreatePost";

function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        Create a New Post:{" "}
      </h1>
      <CreatePost />
      <h1 className="text-3xl font-bold mb-4 text-red-600">Recent Posts: </h1>
      <Posts />
    </>
  );
}

export default Home;