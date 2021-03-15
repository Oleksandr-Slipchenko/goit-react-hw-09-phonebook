import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import fadeAlert from '../../fadeModules/fadeContactFormAlert.module.css';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

const INITIAL_STATE = {
  number: '',
  name: '',
  alert: false,
  message: '',
};

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = INITIAL_STATE;

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onSubmit } = this.props;
    const isValidateForm = this.validateForm();

    if (!isValidateForm) return;

    onSubmit(name, number);
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { contacts } = this.props;

    if (!name || !number) {
      this.setState({ alert: true, message: 'Some field is empty' });
      setTimeout(() => this.setState({ alert: false, message: '' }), 2000);
      return;
    }

    const isExistContact = !!contacts.find(contact => contact.name === name);

    isExistContact &&
      this.setState({ alert: true, message: 'This contact already exists' });
    setTimeout(() => this.setState({ alert: false, message: '' }), 2000);
    return !isExistContact;
  };

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { name, number, alert, message } = this.state;
    return (
      <>
        <CSSTransition
          in={alert}
          timeout={250}
          classNames={fadeAlert}
          unmountOnExit
        >
          <p className={fadeAlert.alert}>{message}</p>
        </CSSTransition>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <section className={s.sectionName}>
            <label className={s.label}>
              <p className={s.inputTitle}>Name</p>
              <input
                className={s.input}
                type="text"
                value={name}
                name="name"
                onChange={this.handleInputChange}
              />
            </label>
          </section>
          <section className={s.sectionNumber}>
            <label className={s.label}>
              <p className={s.inputTitle}>Number</p>
              <input
                className={s.input}
                type="tel"
                value={number}
                name="number"
                onChange={this.handleInputChange}
              />
            </label>
          </section>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
