import { Link } from "react-router-dom";
import "./FeaturedPost.css";

function FeaturedPost({ post }) {
  return (
    <article className="featured">
      <Link to={`/blog/${post.slug}`} className="featured__media">
        <img src={post.image} alt={post.title} />
      </Link>
      <div className="featured__body">
        <p className="eyebrow">Featured · {post.category}</p>
        <h2>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="featured__excerpt">{post.excerpt}</p>
        <p className="featured__meta">
          {post.author} · {post.date} · {post.readTime}
        </p>
        <Link className="btn" to={`/blog/${post.slug}`}>
          Read story
        </Link>
      </div>
    </article>
  );
}

export default FeaturedPost;
