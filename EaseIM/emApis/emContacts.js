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
      return new Promise((resolve, reject) => {
        EMClient.deleteContact(contactId)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  };
  const addContact = (contactId, applyMsg) => {
    if (contactId) {
      return new Promise((resolve, reject) => {
        EMClient.addContact(contactId, applyMsg)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
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
