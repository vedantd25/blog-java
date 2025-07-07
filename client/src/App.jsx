import React, { useEffect, useState } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";
import UpdateComponent from "./components/UpdateComponent";
import GetComponent from "./components/GetComponent";

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

  const handleUpdate = async (updateData) => {
    try {
      const res = await fetch(`/api/posts/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updateData.title, content: updateData.content }),
      });
      if (!res.ok) throw new Error("Failed to update post");
      showToast("Post updated!", "success");
      fetchPosts();
    } catch (err) {
      showToast("Error updating post", "error");
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await fetch(`/api/posts/search?query=${query}`);
      if (!res.ok) throw new Error("Failed to search posts");
      const data = await res.json();
      setPosts(data);
      showToast("Search completed!", "success");
    } catch (err) {
      showToast("Error searching posts", "error");
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
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  disabled={posting}
                />
              </label>
            </div>
            <button type="submit" className="button" disabled={posting}>
              {posting ? "Posting..." : "Add Post"}
            </button>
          </form>
        </div>
        {/* Search, Update, and Get Components */}
        <SearchComponent onSearch={handleSearch} />
        <UpdateComponent onUpdate={handleUpdate} />
        <GetComponent posts={posts} loading={loading} />
      </div>
    </div>
  );
}

export default App;