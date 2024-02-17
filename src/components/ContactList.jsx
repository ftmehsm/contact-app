function ContactList({ contacts }) {
  return (
    <div>
      {contacts.map((contact) => (
        <p key={contact.id}>
          name : {contact.name}
          lastName : {contact.lastName}
          phone : {contact.phone}
        </p>
      ))}
    </div>
  );
}

export default ContactList;
