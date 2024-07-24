const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

const router = express.Router(); 


  router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
   router.post('/', (req, res) => {
      //console.log(req.body);
      const blog = new Blog(req.body);
      blog.save()
        .then(result => {
          res.redirect('/blogs');
        })
        .catch(err => {
          console.log(err);
        });
   });
   router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).send('Invalid ID format');
    // }
  
    Blog.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Blog not found');
            }
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
  });
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  

  module.exports = router;