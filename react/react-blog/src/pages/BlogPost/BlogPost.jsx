import { Link, useParams } from "react-router-dom";
import { posts } from "../../data/posts.js";
import "./BlogPost.css";

function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="post container">
        <h1>Story not found</h1>
        <p>That article is not in the garage.</p>
        <Link className="btn" to="/blog">
          Back to the blog
        </Link>
      </div>
    );
  }

  return (
    <article className="post">
      <div className="post__hero">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="container post__body">
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="post__meta">
          {post.author} · {post.date} · {post.readTime}
        </p>
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <Link className="post__back" to="/blog">
          ← All stories
        </Link>
      </div>
    </article>
  );
}

export default BlogPost;
