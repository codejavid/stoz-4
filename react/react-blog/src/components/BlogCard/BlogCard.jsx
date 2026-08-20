import { Link } from "react-router-dom";
import "./BlogCard.css";

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card__media">
        <img src={post.image} alt={post.title} />
      </Link>
      <div className="blog-card__body">
        <p className="eyebrow">{post.category}</p>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <p className="blog-card__meta">
          {post.date} · {post.readTime}
        </p>
      </div>
    </article>
  );
}

export default BlogCard;
