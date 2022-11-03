import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        setLoadedUsers(responseData.users);
        setIsLoading(false);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      <ErrorModal error={error} onclear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
