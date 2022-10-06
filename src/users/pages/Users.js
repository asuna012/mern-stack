import React from "react";
import UsersList from "../components/UsersList";
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Cholo",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1665042439~exp=1665043039~hmac=8efb8a39bfd32a1572b4dfad64e99e8835ad21c0501942f088281cdbcc14499d",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
