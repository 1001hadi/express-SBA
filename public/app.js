document.addEventListener("DOMContentLoaded", () => {
  const addPost = document.getElementById("get-form");
  const PostsBtn = document.getElementById("posts-btn");
  const outputDiv = document.getElementById("output");

  // handle new post
  addPost.addEventListener("submit", handleSubmitPost);

  async function handleSubmitPost(e) {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const title = titleInput.value;

    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
        .then((response) => response.json())
        .then((newPost) => {
          outputDiv.innerHTML =
            `<p>New post added, Id: ${newPost.id}, Title: ${newPost.title}</p>` +
            outputDiv.innerHTML;
          titleInput.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error adding post:", error);
      outputDiv.textContent = "Failed to add post.";
    }
  }
});
