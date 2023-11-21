import { EMClient } from '../index';
const emContacts = () => {
  const fetchContactsListFromServer = () => {
    return new Promise((resolve, reject) => {
      EMClient.getAllContacts()
        .then((res) => {
          const { data } = res;
          console.log('>>>>>获取全部好友列表');
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
      EMClient.acceptContactInvite(contactId);
    }
  };
  const declineContactInvite = (contactId) => {
    if (contactId) {
      EMClient.declineContactInvite(contactId);
    }
  };
  const getBlocklistFromServer = () => {
    return new Promise((resolve, reject) => {
      EMClient.getBlocklist()
        .then((res) => {
          const { data } = res;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const addUsersToBlocklist = (userList) => {
    return new Promise((resolve, reject) => {
      EMClient.addUsersToBlocklist({ name: [...userList] })
        .then((res) => {
          const { data } = res;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const removeUsersFromBlocklist = (userList) => {
    return new Promise((resolve, reject) => {
      EMClient.removeUsersFromBlocklist({ name: [...userList] })
        .then((res) => {
          const { data } = res;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    fetchContactsListFromServer,
    removeContactFromServer,
    acceptContactInvite,
    declineContactInvite,
    addContact,
    getBlocklistFromServer,
    addUsersToBlocklist,
    removeUsersFromBlocklist,
  };
};
export default emContacts;
