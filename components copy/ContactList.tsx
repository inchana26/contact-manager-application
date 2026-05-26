export default function ContactList({
  contacts,
  deleteContact,
  editContact
}: any) {
  return (
    <div className="neo">
      <h2>Contacts</h2>

      {contacts.map((c: any) => (
        <div className="contact" key={c.id}>
          <div>
            <b>{c.name}</b>
            <p>{c.email}</p>
            <p>{c.phone}</p>
          </div>

          <div>
            <button onClick={() => editContact(c)}>Edit</button>
            <button onClick={() => deleteContact(c.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}