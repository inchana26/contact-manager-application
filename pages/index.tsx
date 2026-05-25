import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any>(null);

  // Load from localStorage (acts like db.json)
  useEffect(() => {
    const data = localStorage.getItem("contacts");
    if (data) setContacts(JSON.parse(data));
  }, []);

  // Save to localStorage
  const saveToStorage = (data: any[]) => {
    localStorage.setItem("contacts", JSON.stringify(data));
    setContacts(data);
  };

  // CREATE
  const addContact = (contact: any) => {
    const newContacts = [
      ...contacts,
      { ...contact, id: Date.now() }
    ];
    saveToStorage(newContacts);
  };

  // DELETE
  const deleteContact = (id: number) => {
    const updated = contacts.filter((c) => c.id !== id);
    saveToStorage(updated);
  };

  // EDIT START
  const editContact = (contact: any) => {
    setEditing(contact);
  };

  // UPDATE
  const updateContact = (updatedContact: any) => {
    const updated = contacts.map((c) =>
      c.id === updatedContact.id ? updatedContact : c
    );
    saveToStorage(updated);
    setEditing(null);
  };

  // SEARCH FILTER
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Contact Manager Dashboard</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <ContactForm
        addContact={addContact}
        updateContact={updateContact}
        editing={editing}
      />

      <ContactList
        contacts={filtered}
        deleteContact={deleteContact}
        editContact={editContact}
      />
    </div>
  );
}