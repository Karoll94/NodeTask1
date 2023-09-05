const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve('db/contacts.json');
const { v4: uuidv4 } = require("uuid");


async function listContacts() {
    // console.log('list');
   try{
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);

   }catch(error){
      console.log(error.message)
   }
  }
  // listContacts();
  

  async function getContactById(contactId) {
    // console.log('get by id');
    try{
      const allContacts = await listContacts();
      // console.log(allContacts);
      const findContact = allContacts.find((contact) => contact.id === contactId);
      // console.log(findContact);
      return findContact;
    }catch(error){
      console.log(error.message)
    }
  }

// getContactById('e6ywwRe4jcqxXfCZOj_1e');
  
function removeContact(contactId) {
  return listContacts().then((list) => {
    const filteredList = list.filter((contact) => contact.id !== contactId);
    return fs
      .writeFile(contactsPath, JSON.stringify(filteredList), (err) => {
        if (err) {
          console.error(err);
        }
      })
      .then(() => `Contact with id ${contactId} was successfully removed.`);
  });
}
  // removeContact('e6ywwRe4jcqxXfCZOj_1e');
  
  function addContact(name, email, phone) {
    return listContacts().then((list) => {
      const addUser = { id: uuidv4(), name, email, phone };
      list.push(addUser);
      return fs
        .writeFile(contactsPath, JSON.stringify(list), (err) => {
          if (err) {
            console.error(err);
          }
        })
        .then(() => `Contact was successfully created.`);
    });
  }
  // addContact('ramiro', 'ramiro@gmail.com', '78956');

module.exports ={
  listContacts,
  getContactById,
  removeContact,
  addContact
};