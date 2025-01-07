import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS, { defaultHeaders } from "../apiConfig";
import { UserAvatar } from "../components/Profile/UserAvatar";
import { UserNavbar } from "../components/Profile/UserNavbar";
import { FormErrors } from "../components/FormErrors/FormErrors";


export const Profile = (props) => {
  const navigate = useNavigate();
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const userId = useParams().id;
  const isOwner = props?.isOwner;
  let dialogIsFetching = false;

  const moveToDialog = async () => {
    if (!dialogIsFetching) {    
      try {
        dialogIsFetching = true;
        const data = { userId: parseInt(userId) };
        const response = await axios.post(API_ENDPOINTS.dialogs + '/fetch-dialog', data, { headers: defaultHeaders });
        console.log(response.data)
        navigate(`/dialogs/${response.data.id}`);
      } catch(e) {
        console.log(e)
        setErrors(e.response.data.message)
      }
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let url = API_ENDPOINTS.editUser;
        if (userId) {
          url += `/${userId}`
        }
        const response = await axios.get(url, {
          headers: defaultHeaders
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
      <FormErrors errors={errors} />
      { !isOwner && (
          <div className="row text-center mt-2">
            <div className="col-sm-12">
              <div className="btn btn-warning" onClick={moveToDialog}>Send Message</div>
            </div>
          </div>
        )
      }
      <UserNavbar user={user} isOwner={isOwner} />
    </>
  );
};
