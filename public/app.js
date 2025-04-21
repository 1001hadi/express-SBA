document.addEventListener("DOMContentLoaded", () => {
  const addPost = document.getElementById("get-form");
  const PostsBtn = document.getElementById("posts-btn");
  const outputDiv = document.getElementById("output");

  //   handle load all post
  PostsBtn.addEventListener("click", handleAddPosts);
  async function handleAddPosts() {
    try {
      const res = await fetch("/posts");
      if (res.ok) {
        const posts = await res.json();
        if (posts.length > 0) {
          let postsHTML = "<h2>All Posts</h2><ul>";
          posts.forEach((post) => {
            postsHTML += `<li>Post Id:${post.id},  Title: ${post.title}</li>`;
          });
          postsHTML += "</ul>";
          outputDiv.innerHTML = postsHTML;
        }
      }
    } catch (err) {
      console.log("Error: can't fetch any posts:", err);
      outputDiv.textContent = "Failed to fetch posts.";
    }
  }

  // handle new post
  addPost.addEventListener("submit", handleSubmitPost);

  async function handleSubmitPost(e) {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const title = titleInput.value;

    try {
      const res = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
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
