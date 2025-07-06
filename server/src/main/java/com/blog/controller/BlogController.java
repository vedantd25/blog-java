package com.blog.controller;

import com.blog.dao.BlogPostDAO;
import com.blog.model.BlogPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")  // Base path for all blog post-related endpoints
public class BlogController {

    @Autowired
    private BlogPostDAO blogPostDAO;

    // GET all posts
    @GetMapping
    public List<BlogPost> getPosts() throws SQLException {
        return blogPostDAO.getAllPosts();
    }

    // POST new post
    @PostMapping
    public void createPost(@RequestBody BlogPost post) throws SQLException {
        blogPostDAO.createPost(post);
    }

    // GET search posts by keyword in title
    @GetMapping("/search")
    public ResponseEntity<List<BlogPost>> searchPosts(@RequestParam String keyword) {
        try {
            return ResponseEntity.ok(blogPostDAO.searchByTitle(keyword));
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT update post by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable int id, @RequestBody BlogPost post) {
        try {
            boolean updated = blogPostDAO.updatePost(id, post);
            if (updated) {
                return ResponseEntity.ok("Post updated successfully.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
