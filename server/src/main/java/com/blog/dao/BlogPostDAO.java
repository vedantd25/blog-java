package com.blog.dao;

import com.blog.model.BlogPost;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BlogPostDAO {

    private final DataSource dataSource;

    public BlogPostDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // Get all posts
    public List<BlogPost> getAllPosts() throws SQLException {
        List<BlogPost> list = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM posts")) {
            while (rs.next()) {
                BlogPost post = new BlogPost();
                post.setId(rs.getInt("id"));
                post.setTitle(rs.getString("title"));
                post.setContent(rs.getString("content"));
                list.add(post);
            }
        }
        return list;
    }

    // Create new post
    public void createPost(BlogPost post) throws SQLException {
        String sql = "INSERT INTO posts (title, content) VALUES (?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, post.getTitle());
            ps.setString(2, post.getContent());
            ps.executeUpdate();
        }
    }

    // 🔍 Search posts by title
    public List<BlogPost> searchByTitle(String keyword) throws SQLException {
        List<BlogPost> results = new ArrayList<>();
        String query = "SELECT * FROM posts WHERE title LIKE ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, "%" + keyword + "%");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                BlogPost post = new BlogPost();
                post.setId(rs.getInt("id"));
                post.setTitle(rs.getString("title"));
                post.setContent(rs.getString("content"));
                results.add(post);
            }
        }
        return results;
    }

    // ✏️ Update a post by ID
    public boolean updatePost(int id, BlogPost updatedPost) throws SQLException {
        String sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, updatedPost.getTitle());
            stmt.setString(2, updatedPost.getContent());
            stmt.setInt(3, id);
            return stmt.executeUpdate() > 0;
        }
    }
}
