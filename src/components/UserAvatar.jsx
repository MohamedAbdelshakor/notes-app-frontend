import { Image } from "react-bootstrap";

function UserAvatar({ user, size = 40, className = "" }) {
  const imgSrc = user?.profileImage
    ? "http://localhost:5000" + user.profileImage
    : null;

  if (imgSrc) {
    return (
      <Image
        src={imgSrc}
        roundedCircle
        width={size}
        height={size}
        className={`user-avatar object-fit-cover ${className}`}
        alt={user?.name || "User"}
      />
    );
  }

  return (
    <div
      className={`user-avatar-placeholder rounded-circle d-inline-flex align-items-center justify-content-center ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      <i className="bi bi-person-fill"></i>
    </div>
  );
}

export default UserAvatar;
