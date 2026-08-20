import { useState } from "react";
import "./Contact.css";

const emptyForm = { name: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setForm(emptyForm);
  }

  return (
    <div className="contact container">
      <header className="contact__header">
        <p className="eyebrow">Write to us</p>
        <h1>Contact</h1>
        <p>
          Tips, corrections, or a car you think we should drive. This form stays on your
          browser — there is no backend.
        </p>
      </header>

      {sent ? (
        <div className="contact__thanks" role="status">
          <h2>Thanks for the note.</h2>
          <p>We read every message. Drive safely until then.</p>
          <button type="button" className="btn" onClick={() => setSent(false)}>
            Send another
          </button>
        </div>
      ) : (
        <form className="contact__form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <button className="btn" type="submit">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
