import React, { useContext } from "react";
import api from "../utils/api";
import '../blocks/profile/profile.css';
import { CurrentUserContext } from 'user_context';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function Profile() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    React.useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    }, []);
    function onEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }
    function onEditProfile() {
        setIsEditProfilePopupOpen(true);
    }
   
    function handleEditProfileSubmit(userUpdate) {
        api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          setIsEditProfilePopupOpen(false);
        })
        .catch((err) => console.log(err));
    }

    function handleEditAvatarSubmit(avatarUpdate) {
        api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          setIsEditAvatarPopupOpen(false);
        })
        .catch((err) => console.log(err));
    }

    function closeEditProfilePopup() {
        setIsEditProfilePopupOpen(false);
    }

    function closeEditAvatarPopup() {
        setIsEditAvatarPopupOpen(false);
    }

    const imageStyle = { backgroundImage: `url(${currentUser?.avatar})` };
    return (
        <>
            <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser?.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__description">{currentUser?.about}</p>
            </div>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeEditProfilePopup} onUpdateUser={handleEditProfileSubmit}></EditProfilePopup>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeEditAvatarPopup} onUpdateAvatar={handleEditAvatarSubmit}></EditAvatarPopup>
        </>
    );
}

export default Profile;