import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsInitialState =
  JSON.parse(window.localStorage.getItem('contacts')) ?? [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.map(contact => contact.name).includes(action.payload.name)
          ? alert(`${action.payload.name} is already in contacts.`)
          : state.push(action.payload);
        window.localStorage.setItem('contacts', JSON.stringify(state));
      },
      prepare(data) {
        return {
          payload: {
            id: nanoid(),
            name: data.name,
            number: data.number,
          },
        };
      },
    },

    deleteContact(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
      window.localStorage.setItem('contacts', JSON.stringify(state));
      //   prevState => [
      //   ...prevState.filter(item => item.id !== contactsId),
      // ]
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

//   const formSubmitHandler = data => {
//     contacts.map(contact => contact.name).includes(data.name)
//       ? alert(`${data.name} is already in contacts.`)
//       : setContacts(prevState => [
//           ...prevState,
//           { id: nanoid(), name: data.name, number: data.number },
//         ]);
//   };
