import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import { Avatar } from "@files-ui/react";

export const UserAvatar = ({ avatarName, userId, isOwner }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState(false);

  const fetchAvatar = async () => {
    try {        
      const response = await axios.get(`${API_ENDPOINTS.getAvatar.replace(':id', userId)}`, {
        headers: defaultHeaders,
        params: { path: avatarName },
        responseType: 'blob'
      });
      
      const url = URL.createObjectURL(response.data);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Error fetching avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (selectedFile) => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile);

      const response = await axios.post(API_ENDPOINTS.uploadAvatar, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      window.location.reload();     
    } catch(e) {
      setUploadError(true);
    }
  }

  useEffect(() => {
    fetchAvatar();
  }, [userId]);

  if (loading) {
    return <p>Loading avatar...</p>;
  }

  return (
    <>
      <div className="row justify-content-center">
        { isOwner ? (
          <>
            <Avatar src={avatarUrl} changeLabel="Upload new photo" accept=".png,.jpg,.jpeg" onChange={uploadFile} style={{width: '320px', height: '320px'}} />
            { uploadError && (<div className="row text-center"><p>Error uploading. Try again</p></div>) }
          </>
        ) : (
          <>
            <Avatar src={avatarUrl} style={{width: '320px', height: '320px'}} changeLabel={null} readOnly={true} />
          </>
        )}
      </div>
    </>
  );
};
