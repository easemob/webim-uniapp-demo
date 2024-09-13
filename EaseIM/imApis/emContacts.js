import { EMClient } from '../index';
const emContacts = () => {
  const fetchContactsListFromServer = () => {
    return new Promise((resolve, reject) => {
      EMClient.getContacts()
        .then((res) => {
          const { data } = res;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const removeContactFromServer = (contactId) => {
    if (contactId) {
      return EMClient.deleteContact(contactId);
    }
  };
  const addContact = (contactId, applyMsg) => {
    if (contactId) {
      return EMClient.addContact(contactId, applyMsg);
    }
  };
  const acceptContactInvite = (contactId) => {
    if (contactId) {
      return EMClient.acceptContactInvite(contactId);
    }
  };
  const declineContactInvite = (contactId) => {
    if (contactId) {
      return EMClient.declineContactInvite(contactId);
    }
  };
  return {
    fetchContactsListFromServer,
    removeContactFromServer,
    acceptContactInvite,
    declineContactInvite,
    addContact,
  };
};
export default emContacts;
