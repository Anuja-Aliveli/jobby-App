import {Link, withRouter} from 'react-router-dom'
import {FaUserTie} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav-header">
      <nav className="nav-bar-container-desktop">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li className="nav-menu-item">Home</li>
          </Link>

          <Link to="/jobs" className="nav-link">
            <li className="nav-menu-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <nav className="nav-bar-container-mobile">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li className="nav-menu-item">
              <AiFillHome className="icon" />
            </li>
          </Link>

          <Link to="/jobs" className="nav-link">
            <li className="nav-menu-item">
              <FaUserTie className="icon" />
            </li>
          </Link>
        </ul>
        <button type="button" className="mobile-btn" onClick={onClickLogout}>
          <FiLogOut className="icon" />
        </button>
      </nav>
    </div>
  )
}
export default withRouter(Header)
