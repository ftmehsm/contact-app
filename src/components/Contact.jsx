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

  const addHandler = () => {
    let newContact, localStorageData, newLocalStorageData;
    if (!contact.name || !contact.lastName || !contact.phone) {
      setError((error) => !error);
    } else {
      setError(false);
      newContact = { ...contact, id: v4() };
      localStorageData = JSON.parse(localStorage.getItem("contacts"));
      newLocalStorageData = [...localStorageData, newContact];
      localStorage.setItem("contacts", JSON.stringify(newLocalStorageData));
      setContacts((contacts) => [...contacts, newContact]);
      setContact({
        id: "",
        name: "",
        lastName: "",
        phone: "",
      });
    }
  };
const deleteHandler = (id) => {
  const newContacts = contacts.filter(contact => contact.id !== id)
  setContacts(newContacts)
  localStorage.setItem("contacts" , JSON.stringify(newContacts))
}
  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    } else {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
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

      {contacts.map((contact) => (
        <ContactList
        id={contact.id}
          key={contact.id}
          name={contact.name}
          lastName={contact.lastName}
          phone={contact.phone}
          deleteHandler={deleteHandler}
        />
      ))}

    </div>
  );
}

export default Contact;
