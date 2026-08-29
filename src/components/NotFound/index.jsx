import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dxp89094x/image/upload/v1689255872/erroring_1_cl8p2d.png"
      alt="page not found"
      className="not-found-img"
    />
    <h2>Page Not Found</h2>
    <p>We are sorry, the page you requested could not be found. Please go back to the homepage.</p>
    <Link to="/">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound