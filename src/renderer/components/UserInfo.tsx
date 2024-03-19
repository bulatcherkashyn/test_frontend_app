type UserInfoProps = {
  id: string;
  name: string;
  email: string;
};
function UserInfo({ user }: { user: UserInfoProps }) {
  return (
    <div className="user-info">
      <h3>User Info</h3>
      <div className="user-info-card">
        <div className="user-id">ID: {user.id}</div>
        <div className="user-name">Name: {user.name}</div>
        <div className="user-email">Email: {user.email}</div>
      </div>
    </div>
  );
}

export default UserInfo;
