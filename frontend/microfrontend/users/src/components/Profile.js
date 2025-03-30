import React, { useContext } from "react";
import api from "../utils/api";
import '../blocks/profile/profile.css';
import { CurrentUserContext } from 'user_context';

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

    }
    function onEditProfile() {

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
        </>
    );
}

export default Profile;