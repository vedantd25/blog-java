import React from "react";

function GetComponent({ posts, loading }) {
  return (
    <div className="card">
      <div className="card-title" style={{ marginBottom: 18 }}>
        All Posts
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No posts yet.</div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetComponent;