import image from "../assets/404.svg"
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div>
      <img src={image} width="40%" alt='404image'/>
      <p>We're sorry. The Web address you entered is not a functioning page on our site.
      Our homepage is a good place to begin your search for information.</p>
      <Link to="/">
        <button type="button" className="btn btn-outline-dark">
          Homepage
        </button>
      </Link>
    </div>
  );
}

export default Page404;