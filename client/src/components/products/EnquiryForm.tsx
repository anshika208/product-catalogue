
import { type FormEvent, useState } from "react";
import { enquiryService } from "../../services/enquiry.service";

interface Props {
  productId: number;
}

export default function EnquiryForm({ productId }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const message = await enquiryService.submitEnquiry({
        productId,
        ...form
      });

      setSuccess(message);

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch {
      setError("Unable to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="enquiry-section">
      <h3>Interested in this product?</h3>

      {success ? (
        <p className="success-message">{success}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            minLength={2}
            maxLength={100}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            maxLength={254}
            required
          />

          <input
            name="phone"
            placeholder="Phone number (optional)"
            value={form.phone}
            onChange={handleChange}
            maxLength={20}
          />

          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            minLength={10}
            maxLength={1000}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Send Enquiry"}
          </button>
        </form>
      )}
    </section>
  );
}
