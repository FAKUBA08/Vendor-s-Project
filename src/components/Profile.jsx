import React, { useEffect, useState } from 'react';
import Styles from "../Styles/Profile.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';  // Import the bullet spinner

function Profile() {
  const [profileData, setProfileData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("No token found, please login.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('https://vendors-node.onrender.com/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data, status: ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://vendors-node.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save profile data, status: ${response.status}`);
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className={Styles.loadingContainer}>
        <ThreeDots 
          color="#007BFF" // Choose your color
          height={80} // Set size
          width={80} // Set size
        />
      </div>
    );
  }

  return (
    <div className={Styles.profileContainer}>
      <div className={Styles.profileContainerInner}>
        <p className={Styles.profileTitle}>Profile</p>
        <div className={Styles.profileGeneral}>
          <p>General <span>Update your name, email and basic information.</span></p>
        </div>
        <div className={Styles.profileBox}>
          <div className={Styles.profileForm}>
            <div className={Styles.names}>
              <div className={Styles.profileField}>
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={profileData.firstName} 
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  readOnly={!isEditing} 
                />
              </div>
              <div className={Styles.profileField}>
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={profileData.lastName} 
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  readOnly={!isEditing} 
                />
              </div>
            </div>
            <div className={Styles.profileField}>
              <label>Email</label>
              <input 
                type="text" 
                name="email" 
                value={profileData.email} 
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                readOnly={!isEditing} 
              />
            </div>
            <div className={Styles.profileField}>
              <label>Phone Number</label>
              <input 
                type="text" 
                name="phoneNumber" 
                value={profileData.phoneNumber} 
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                readOnly={!isEditing} 
              />
            </div>
          </div>
          <div className={Styles.underline}></div>
          <div className={Styles.end}>
            <button onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button onClick={handleSave} className={Styles.saveButton}>Save Changes</button>
            )}
          </div>
          <ToastContainer className={Styles.toastContainer} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
