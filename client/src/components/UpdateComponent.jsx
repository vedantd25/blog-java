import React, { useState } from "react";

function UpdateComponent({ onUpdate }) {
  const [updateForm, setUpdateForm] = useState({ id: "", title: "", content: "" });
  const [posting, setPosting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateForm.id.trim() || !updateForm.title.trim() || !updateForm.content.trim()) {
      alert("ID, Title, and Content are required for update.");
      return;
    }
    setPosting(true);
    try {
      await onUpdate(updateForm);
      setUpdateForm({ id: "", title: "", content: "" });
    } catch (err) {
      console.error("Error updating post", err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-title">Update Post</div>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>
            ID
            <input
              className="input"
              placeholder="ID"
              value={updateForm.id}
              onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
              disabled={posting}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Title
            <input
              className="input"
              placeholder="Title"
              value={updateForm.title}
              onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
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
              value={updateForm.content}
              onChange={(e) => setUpdateForm({ ...updateForm, content: e.target.value })}
              rows={4}
              disabled={posting}
            />
          </label>
        </div>
        <button type="submit" className="button" disabled={posting}>
          {posting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}

export default UpdateComponent;