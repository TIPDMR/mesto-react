import logo from '../images/logo/header__logo.svg';

const Header = () => {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
    </header>
  );
};

export default Header;
