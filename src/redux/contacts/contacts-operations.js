// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as actions from './contacts-actions';

const fetchContacts = () => async dispatch => {
  dispatch(actions.fetchContactRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(actions.fetchContactSuccess(data));
  } catch (error) {
    dispatch(actions.fetchContactError(error.message));
  }

  //  Синхронный запрос   ///

  // axios
  //   .get('/contacts')
  //   .then(({ data }) => dispatch(actions.fetchContactSuccess(data)))
  //   .catch(error => dispatch(actions.fetchContactError(error)));
};

//     Если делать через -- //createAsyncThunk//

// const fetchContactsAsync = createAsyncThunk(
//   'contacts/fetchContacts',
//   async () => {
//     const { data } = await axios.get('/contacts');
//     return await data;
//   },
// );

const addContact = (name, number) => async dispatch => {
  const contact = { name, number };

  dispatch(actions.addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(actions.addContactSuccess(data));
  } catch (error) {
    dispatch(actions.addContactError(error.message));
  }
};

const removeContact = contactId => async dispatch => {
  dispatch(actions.removeContactRequest());

  try {
    await axios.delete(`/contacts/${contactId}`);
    dispatch(actions.removeContactSuccess(contactId));
  } catch (error) {
    dispatch(actions.removeContactError(error.message));
  }
};

export default {
  fetchContacts,
  addContact,
  removeContact,
};
