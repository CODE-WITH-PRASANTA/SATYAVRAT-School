import React from 'react'
import BlogBDcrum from '../../components/BlogBDcrum/BlogBDcrum'

import BlogActivites from '../../components/BlogActivites/BlogActivites'
import BlogComment from '../../components/BlogComment/BlogComment'


const BlogDetails = () => {
  return (
    <div>
        <BlogBDcrum/>
        <BlogActivites/>
        <BlogComment/>
        
    </div>
  )
}

export default BlogDetails