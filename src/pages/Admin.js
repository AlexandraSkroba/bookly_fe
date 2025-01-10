import { useState } from "react";
import { UsersList } from "../components/Admin/UsersList";
import { useNavigate } from "react-router-dom";
import { AdminExchangeList } from "../components/Admin/AdminExchangeList";
import { AdminBookList } from "../components/Admin/AdminBookList";
import { ComplaintsList } from "../components/Admin/ComplaintsList";


export const Admin = () => {
  const [activeComponentNum, setActiveComponentNum] = useState(0);
  const [activeComponent, setActiveComponent] = useState(<UsersList />);  
  const navigate = useNavigate(); 

  const toggleActiveTab = (num) => {
    setActiveComponentNum(num)
    if (!num) {
      setActiveComponent(<UsersList />)
    } else if (num === 1) {
      setActiveComponent(<AdminBookList key={1} />)
    } else if (num === 2) {
      setActiveComponent(<AdminExchangeList />)
    } else {
      setActiveComponent(<ComplaintsList />)
    }
  }

  if (JSON.parse(localStorage.getItem('currentUser')).is_admin ===  'false') {
    navigate('/unauthorized');
  }

  return (
    <>
      <div className="row justify-content-center text-center h4 mt-5">
        <nav className="user-navbar__tabs">
          <ul>
            <li className={`tab ${activeComponentNum === 0 ? 'active' : ''}`} onClick={() => toggleActiveTab(0)}>Users</li>
            <li className={`tab ${activeComponentNum === 1 ? 'active' : ''}`} onClick={() => toggleActiveTab(1)}>Books</li>
            <li className={`tab ${activeComponentNum === 2 ? 'active' : ''}`} onClick={() => toggleActiveTab(2)}>Exchanges</li>
            <li className={`tab ${activeComponentNum === 3 ? 'active' : ''}`} onClick={() => toggleActiveTab(3)}>Complaints</li>
          </ul>
        </nav>
      </div>

      <div className="active-tab__content justify-content-center text-center">
        { activeComponent }
      </div>
    </>
  )
}
