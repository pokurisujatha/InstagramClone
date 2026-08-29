
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
    showMobileMenu: false,
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      showMobileMenu: !prevState.showMobileMenu,
    }))
  }

  onChangeSearchInput = event => {
    const value = event.target.value
    this.setState({searchInput: value})

    if (value === '' && this.props.onSearchPost) {
      this.props.onSearchPost('')
    }
  }

  onSearch = () => {
    const {searchInput} = this.state
    const {onSearchPost} = this.props

    if (onSearchPost) {
      onSearchPost(searchInput.trim())
    }
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.onSearch()
    }
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {searchInput, showMobileMenu} = this.state

    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="logo-title-container">
            <Link to="/" className="nav-link">
              <img
                src="/assets/logo.png"
                alt="website logo"
                className="header-logo"
              />
            </Link>
            <h1 className="header-title">Insta Share</h1>
          </div>

          {/* Desktop Navbar View */}
          <div className="nav-search-and-menu desktop-menu">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearch}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearch}
                testid="searchIcon"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>

            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-profile" className="nav-link">
                  Profile
                </Link>
              </li>
            </ul>

            <button
              type="button"
              className="logout-button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="hamburger-menu-btn"
            onClick={this.toggleMobileMenu}
          >
            <GiHamburgerMenu size={20} />
          </button>
        </div>

        {/* Collapsible Mobile Menu Container */}
        {showMobileMenu && (
          <div className="mobile-menu-container">
            <ul className="mobile-nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-profile" className="nav-link">
                  Profile
                </Link>
              </li>
            </ul>

            <div className="search-input-container mobile-search">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearch}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearch}
                testid="searchIcon"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={this.onLogout}
            >
              Logout
            </button>

            <button
              type="button"
              className="close-menu-btn"
              onClick={this.toggleMobileMenu}
            >
              <IoIosCloseCircle size={22} />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
