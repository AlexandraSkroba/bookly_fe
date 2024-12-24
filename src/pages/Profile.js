import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../apiConfig";
import { UserAvatar } from "../components/Profile/UserAvatar";
import { UserNavbar } from "../components/Profile/UserNavbar";


export const Profile = (props) => {
  const navigate = useNavigate();
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = useParams().id;
  const isOwner = props?.isOwner;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let url = API_ENDPOINTS.editUser;
        if (userId) {
          url += `/${userId}`
        }
        const response = await axios.get(url, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setUser(response.data);
      } catch (e) {
        console.error("Error fetching user data:", e);
        navigate('/unauthorized');
      } finally {
        setLoading(false);
      }
    };

    fetchUser ();
  }, [navigate, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserAvatar userId={user?.id} isOwner={isOwner} />
      <UserNavbar user={user} isOwner={isOwner} />
    </>
  );
};
