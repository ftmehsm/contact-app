function ContactList({ id , name, lastName, phone, deleteHandler }) {
  return (
    <div>
      <span>{name} </span>
      <span>{lastName} </span>
      <span>{phone}</span>
      <button onClick={() => deleteHandler(id)}>Delete</button>
    </div>
  );
}

export default ContactList;
