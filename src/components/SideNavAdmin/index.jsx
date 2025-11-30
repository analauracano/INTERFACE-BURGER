import Logo from '../../assets/Logo 1.svg';
import { SignOutIcon } from '@phosphor-icons/react';
import { Container, Footer, NavLink, NavLinkContainer } from './styles';
import { useUser } from '../../hooks/UserContext';
import { useResolvedPath } from 'react-router-dom';
import { navLinks } from './navLinks';

export function SideNavAdmin(){
  const { logout } = useUser();
  const { pathname } = useResolvedPath();

  return (
    <Container>
      <img src={Logo} alt="DevBurger Logo" />
      <NavLinkContainer>
        {navLinks.map((link) => {
          return (
          <NavLink key={link.id} to={link.path} $isActive={pathname === link.path}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
          );
        })}
      </NavLinkContainer>
      <Footer>
        <NavLink to="/login" onClick={logout}>
          <SignOutIcon />
          <span>Sair</span>
        </NavLink>
      </Footer>
    </Container>
  )
}