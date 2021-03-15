import { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Container from '../../components/Container';

import ContactForm from '../../components/ContactForm';
import ContactList from '../../components/ContactList';
import Filter from '../../components/Filter';
import s from './ContactsView.module.css';
import {
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts/index';

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <Container className={s.page}>
        <div className={s.page}>
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames={s}
            unmountOnExit
          >
            <h1 className={s.phoneBookTitle}>Phonebook</h1>
          </CSSTransition>
          {/* {this.props.isLoadingContacts && (
            <h3 className={s.loading}>Loading...</h3>
          )} */}
          <ContactForm />
          <div className={s.findContacts}>
            <h2 className={s.findContactsTitle}>Find contacts</h2>
            <Filter />
          </div>
          <ContactList />
        </div>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
