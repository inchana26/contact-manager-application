import { useEffect, useState } from "react";

export default function ContactForm({
  addContact,
  updateContact,
  editing
}: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setEmail(editing.email);
      setPhone(editing.phone);
    }
  }, [editing]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const contact = {
      id: editing?.id,
      name,
      email,
      phone
    };

    editing ? updateContact(contact) : addContact(contact);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="neo">
      <h2>{editing ? "Edit Contact" : "Add Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">
          {editing ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}