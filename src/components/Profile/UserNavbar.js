import { Component } from "react";
import { EditUserForm } from '../../forms/EditUserForm/EditUserForm';
import { BooksList } from '../Books/BooksList';
import { ExchangesList } from '../Exchanges/ExchangesList';
import './UserNavbar.css';

export class UserNavbar extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.isAuthenticated = props.isAuthenticated
    this.state = {
      activeComponentNum: 0
    };
    this.isOwner = props.isOwner;
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
  }

  toggleActiveTab(index) {
    if (this.state.activeComponentNum !== index) {
      this.setState({ activeComponentNum: index });
    }
  }

  render() {
    const { activeComponentNum } = this.state;
    let activeComponent;

    if (activeComponentNum === 0) {
      activeComponent = <EditUserForm user={this.user} />;
    } else if (activeComponentNum === 1) {
      activeComponent = <BooksList books={this.user.books} isOwner={this.isOwner} />;
    } else {
      if (this.isOwner) {
        activeComponent = <ExchangesList exchanges={this.user.incomingExchanges} incoming={true} outcomingExchanges={this.user.outcomingExchanges} />;
      }
    }

    return (
      <>
        <div className="row justify-content-center text-center h4 mt-5">
          <nav className="user-navbar__tabs">
            <ul>
              <li className={`tab ${activeComponentNum === 0 ? 'active' : ''}`} onClick={() => this.toggleActiveTab(0)}>Personal info</li>
              <li className={`tab ${activeComponentNum === 1 ? 'active' : ''}`} onClick={() => this.toggleActiveTab(1)}>Books</li>
              <li className={`tab ${activeComponentNum === 2 ? 'active' : ''}`} onClick={() => this.toggleActiveTab(2)}>Exchanges</li>
            </ul>
          </nav>
        </div>

        <div className="active-tab__content justify-content-center text-center">
          {activeComponent}
        </div>
      </>
    );
  }
}
