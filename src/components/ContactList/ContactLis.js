import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import fadeStyles from '../../fadeModules/fadeContactList.module.css';
import ContactListItem from './ContactListItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { contactsSelectors, contactsOperations } from '../../redux/contacts';

const ContactsList = ({ contacts, onRemove }) => {
  return (
    <TransitionGroup component="ul" className={s.contactList}>
      {contacts.map(contact => (
        <CSSTransition key={contact.id} timeout={250} classNames={fadeStyles}>
          <ContactListItem {...contact} onRemove={onRemove} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onRemove: contactId => dispatch(contactsOperations.removeContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
