const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let editId = null;

/* Render Contacts */

function renderContacts(data = contacts) {

  contactList.innerHTML = "";

  if (data.length === 0) {

    contactList.innerHTML = `
      <p style="margin-top:20px;">
        No Contact Found
      </p>
    `;

    return;
  }

  data.forEach(contact => {

    const contactDiv = document.createElement("div");

    contactDiv.classList.add("contact-item");

    contactDiv.innerHTML = `

      <div class="contact-info">

        <h3>${contact.name}</h3>

        <p>Email: ${contact.email}</p>

        <p>Phone: ${contact.phone}</p>

      </div>

      <div class="actions">

        <button
          class="btn edit-btn"
          onclick="editContact(${contact.id})"
        >
          Edit
        </button>

        <button
          class="btn delete-btn"
          onclick="deleteContact(${contact.id})"
        >
          Delete
        </button>

      </div>

    `;

    contactList.appendChild(contactDiv);

  });

}

/* Save Data */

function saveContacts() {

  localStorage.setItem(
    "contacts",
    JSON.stringify(contacts)
  );

}

/* Add or Update Contact */

contactForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const newContact = {

    id: editId || Date.now(),

    name: nameInput.value.trim(),

    email: emailInput.value.trim(),

    phone: phoneInput.value.trim()

  };

  if (editId) {

    contacts = contacts.map(contact =>
      contact.id === editId
        ? newContact
        : contact
    );

    editId = null;

  } else {

    contacts.push(newContact);

  }

  saveContacts();

  renderContacts();

  contactForm.reset();

});

/* Delete Contact */

function deleteContact(id) {

  contacts = contacts.filter(contact =>
    contact.id !== id
  );

  saveContacts();

  renderContacts();

}

/* Edit Contact */

function editContact(id) {

  const contact = contacts.find(contact =>
    contact.id === id
  );

  nameInput.value = contact.name;

  emailInput.value = contact.email;

  phoneInput.value = contact.phone;

  editId = id;

}

/* Search Contact */

searchBtn.addEventListener("click", function() {

  const searchText = searchInput.value
    .trim()
    .toLowerCase();

  const filteredContacts = contacts.filter(contact =>

    contact.name.toLowerCase().includes(searchText) ||

    contact.email.toLowerCase().includes(searchText) ||

    contact.phone.includes(searchText)

  );

  renderContacts(filteredContacts);

});

/* Press Enter to Search */

searchInput.addEventListener("keyup", function(e) {

  if (e.key === "Enter") {

    searchBtn.click();

  }

});

/* Initial Render */

renderContacts();