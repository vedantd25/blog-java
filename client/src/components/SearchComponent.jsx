import React, { useState } from "react";

function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSearch(searchQuery);
    } catch (err) {
      console.error("Error searching posts", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-title">Search Posts</div>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>
            Query
            <input
              className="input"
              placeholder="Search Query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Searching..." : "Search Posts"}
        </button>
      </form>
    </div>
  );
}

export default SearchComponent;