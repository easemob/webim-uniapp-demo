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
      EMClient.deleteContact(contactId);
    }
  };
  const addContact = (contactId, applyMsg) => {
    if (contactId) {
      EMClient.addContact(contactId, applyMsg);
    }
  };
  const acceptContactInvite = (contactId) => {
    if (contactId) {
      return new Promise((resolve, reject) => {
        EMClient.acceptContactInvite(contactId)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  };
  const declineContactInvite = (contactId) => {
    if (contactId) {
      return new Promise((resolve, reject) => {
        EMClient.declineContactInvite(contactId)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
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
