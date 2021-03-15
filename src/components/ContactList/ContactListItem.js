import s from './ContactList.module.css';

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <li className={s.contactListItem}>
      <span className={s.contactName}>
        {name}: {number}{' '}
      </span>

      <button className={s.button} onClick={() => onRemove(id)}>
        <p className={s.buttonTitle}>delete</p>
      </button>
    </li>
  );
};

export default ContactListItem;
