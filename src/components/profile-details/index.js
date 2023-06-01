import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

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

export default memo(ProfileDetails);
