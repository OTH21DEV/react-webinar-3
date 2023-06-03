import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

/**
 * Display user information
 * @param {String} profile.userName user name 
 * @param {String} profile.phone user phone 
 * @param {String} profile.email user email
 * @returns {HTMLElement}
 */
function ProfileDetails({ profile }) {
  const cn = bem("Profile");
  return (
    <div className={cn("wrapper")}>
      <h2>Профиль</h2>
      <div>
        <p className={cn("title")}>
          Имя: <span>{profile.userName}</span>
        </p>
      </div>
      <div>
        <p className={cn("title")}>
          Телефон: <span>{profile.phone}</span>
        </p>
      </div>
      <div>
        <p className={cn("title")}>
          email: <span>{profile.email}</span>
        </p>
      </div>
    </div>
  );
}
ProfileDetails.propTypes = {
    profile: PropTypes.objectOf(
      PropTypes.shape({
        userName: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
      }).isRequired
    ),
  };
export default memo(ProfileDetails);