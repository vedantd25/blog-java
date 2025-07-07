import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      showToast("Error fetching posts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 1700);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      showToast("Both title and content are required.", "warning");
      return;
    }
    setPosting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add post");
      showToast("Post added!", "success");
      setForm({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      showToast("Error adding post", "error");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="app-container">
      <div className="centered">
        <div className="heading">Blog Posts</div>
        <div className="subheading">A simple blogging platform</div>
        {toast.show && (
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        )}
        {/* Add Post Form */}
        <div className="card">
          <div className="card-title">Add New Post</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Title
                <input
                  className="input"
                  placeholder="Title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  disabled={posting}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Content
                <textarea
                  className="textarea"
                  placeholder="Content"
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  disabled={posting}
                />
              </label>
            </div>
            <button
              type="submit"
              className="button"
              disabled={posting}
            >
              {posting ? "Posting..." : "Add Post"}
            </button>
          </form>
        </div>
        {/* Posts List */}
        <div className="card">
          <div className="card-title" style={{ marginBottom: 18 }}>All Posts</div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">No posts yet.</div>
          ) : (
            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-title">{post.title}</div>
                  <div className="post-content">{post.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;