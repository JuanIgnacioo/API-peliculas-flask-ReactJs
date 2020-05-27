import React from "react";

function Header({ banner, house }) {
  return (
    <div class="card mb-3">
      <img src={banner} class="card-img-top" height="200" />
    </div>
  );
}
export default Header;
