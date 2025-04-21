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
            postsHTML += `<li>Post Id: ${post.id}, Title: ${post.title} <button class="delete-btn" data-id="${post.id}">Delete</button> <button class="edit-btn" data-id="${post.id}">Edit</button></li>`;
          });
          postsHTML += "</ul>";
          outputDiv.innerHTML = postsHTML;

          //  event listeners for created delete btn
          const deleteBtn = document.querySelectorAll(".delete-btn");
          deleteBtn.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
              const postId = e.target.dataset.id;
              await handleDelete(postId);
            });
          });

          //  event listeners for created edit btn
        } else {
          outputDiv.textContent = "No posts found.";
        }
      } else {
        outputDiv.textContent = `Error: Can't fetching posts: ${res.statusText}`;
      }
    } catch (error) {
      console.error("Error display posts:", error);
      outputDiv.textContent = "Can't fetch posts.";
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
    } catch (err) {
      console.log("Error: can't adding new post:", err);
      outputDiv.textContent = "Failed to add post.";
    }
  }

  // handle delete
  // make sure to re-fetch the posts to update the displaying posts
  async function handleDelete(postId) {
    try {
      const res = await fetch(`/posts/${postId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        outputDiv.textContent = `Post with Id of ${postId} deleted successfully.`;

        PostsBtn.click();
      } else {
        outputDiv.textContent = `Error deleting post ${postId}: ${res.statusText}`;
      }
    } catch (error) {
      console.error(`Error deleting the post ${postId}:`, error);
      outputDiv.textContent = `Failed to the delete post ${postId}.`;
    }
  }

  // handle edit

  // handle display editing form
});
