import { useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { posts } from "../../data/posts.js";
import "./Blog.css";

function Blog() {
  const [active, setActive] = useState("All");
  const categories = ["All", "EV", "Classic", "Racing", "Reviews", "Culture"];

  const visiblePosts =
    active === "All"
      ? posts
      : posts.filter((post) => post.category === active);

  return (
    <div className="blog container">
      <header className="blog__header">
        <p className="eyebrow">The journal</p>
        <h1>All stories</h1>
        <p>Notes on machines, roads, and the people who keep them running.</p>
      </header>

      <div className="blog__filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === active ? "chip badge--active" : "chip"}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blog__grid">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
