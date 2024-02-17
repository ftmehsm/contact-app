import { useEffect, useState } from "react";
import inputs from "./constant/input";
import { v4 } from "uuid";
import ContactList from "./ContactList";

function Contact() {
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    phone: "",
  });
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(false);

  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const addHandler =  () => {
    if (!contact.name || !contact.lastName || !contact.phone) {
      setError((error) => !error);
    } else {
      setError(false);
      const newContact = { ...contact, id: v4() };
      setContacts((contacts) => [...contacts, newContact]);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      setContact({
        id: "",
        name: "",
        lastName: "",
        phone: "",
      });
    }
  };
  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem("contacts")));
  }, []);
  return (
    <div>
      {inputs.map((input) => (
        <input
          key={input.name}
          type={input.type}
          name={input.name}
          value={contact[input.name]}
          placeholder={input.placeholder}
          onChange={changeHandler}
        />
      ))}
      <button onClick={addHandler}>Add Contact</button>
      {error && <p>new error</p>}
      <ContactList contacts={contacts} />
    </div>
  );
}

export default Contact;
