import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';
import { connect } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import s from './Navigation.module.css';

const Navigation = ({ isAuthenticated }) => (
  <nav>
    <NavLink
      to={routes.home}
      exact
      className={s.link}
      activeClassName={s.activeLink}
    >
      Главная
    </NavLink>

    {isAuthenticated && (
      <NavLink
        to={routes.contacts}
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        Контакты
      </NavLink>
    )}
  </nav>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);
