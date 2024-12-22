import { Component } from "react";
import { UnauthorizedNav } from "./UnauthorizedNav";
import { AuthorizedNav } from "./AuthorizedNav";
import './Header.css';

export class Header extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated
    return (
      <>
        <header className="row w-100 h4 align-self-center">
          { isAuthenticated ? <AuthorizedNav /> : <UnauthorizedNav /> }
        </header>
      </>
    )
  }
};
