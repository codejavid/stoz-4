import { Link } from "react-router-dom";
import FeaturedPost from "../../components/FeaturedPost/FeaturedPost.jsx";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { posts } from "../../data/posts.js";
import "./Home.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80";

function Home() {
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 4);

  return (
    <div className="home">
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="container hero__content">
          <p className="eyebrow">Car journal</p>
          <h1>Stories from the lane, the garage, and the long way home.</h1>
          <p className="hero__lead">
            Independent writing on EVs, classics, circuits, and the cabins we actually live in.
          </p>
          <div className="hero__actions">
            <Link className="btn" to="/blog">
              Browse the blog
            </Link>
            <Link className="btn btn-ghost hero__ghost" to="/contact">
              Say hello
            </Link>
          </div>
        </div>
      </section>

      <section className="container home__section">
        <FeaturedPost post={featuredPost} />
      </section>

      <section className="container home__section">
        <div className="home__heading">
          <h2>Latest notes</h2>
          <Link to="/blog">View all</Link>
        </div>
        <div className="home__grid">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="about">
        <div className="container about__inner">
          <div>
            <p className="eyebrow">The garage</p>
            <h2>Written by drivers, not press kits.</h2>
          </div>
          <p>
            Apex Lane is a small journal for people who care how a car feels on a Tuesday
            morning. We keep the language plain, the photos honest, and the opinions our own.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
