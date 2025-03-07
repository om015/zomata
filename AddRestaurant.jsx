import React from "react";

const AddRestaurant = () => {
  return (
    <div>
      <h1>Add Your Restaurant</h1>
      <form>
        <input type="text" placeholder="Restaurant Name" required />
        <input type="text" placeholder="Location" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
