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

    public void createPost(BlogPost post) throws SQLException {
        String sql = "INSERT INTO posts (title, content) VALUES (?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, post.getTitle());
            ps.setString(2, post.getContent());
            ps.executeUpdate();
        }
    }
}
