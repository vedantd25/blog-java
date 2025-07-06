package com.blog.controller;

import com.blog.dao.BlogPostDAO;
import com.blog.model.BlogPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class BlogController {

    @Autowired
    private BlogPostDAO blogPostDAO;

    @GetMapping
    public List<BlogPost> getPosts() throws SQLException {
        return blogPostDAO.getAllPosts();
    }

    @PostMapping
    public void createPost(@RequestBody BlogPost post) throws SQLException {
        blogPostDAO.createPost(post);
    }
}
