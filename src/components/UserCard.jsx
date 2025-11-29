const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, age, gender } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + (lastName ? " " + lastName : "")}
        </h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about || "N.A."}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
