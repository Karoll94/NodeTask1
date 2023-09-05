const contactsModule = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsModule.listContacts();
      return console.table(allContacts);
      break;
    case "get":
      const findContact = await contactsModule.getContactById(id);
      return console.table(findContact);
      break;
    case "add":
      contactsModule.addContact(name, email, phone).then((msg) => {
      console.log(msg);
      });
      break;
    case "remove":
      contactsModule.removeContact(id).then((msg) => {
        console.log(msg);
      });
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);