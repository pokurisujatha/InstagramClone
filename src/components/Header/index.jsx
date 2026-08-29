

// import {Component} from 'react'
// import {Link, withRouter} from 'react-router-dom'
// import {FaSearch} from 'react-icons/fa'
// import Cookies from 'js-cookie'
// import './index.css'

// class Header extends Component {
//   state = {
//     searchInput: '',
//   }

//   onChangeSearchInput = event => {
//     const value = event.target.value
//     this.setState({searchInput: value})

//     // Auto-fetch all posts when input is cleared
//     if (value === '' && this.props.onSearchPost) {
//       this.props.onSearchPost('')
//     }
//   }

//   onSearch = () => {
//     const {searchInput} = this.state
//     const {onSearchPost} = this.props

//     if (onSearchPost) {
//       onSearchPost(searchInput.trim())
//     }
//   }

//   onKeyDownSearch = event => {
//     if (event.key === 'Enter') {
//       this.onSearch()
//     }
//   }

//   onLogout = () => {
//     const {history} = this.props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   render() {
//     const {searchInput} = this.state

//     return (
//       <nav className="nav-header">
//         <div className="nav-content">
//           <div className="logo-title-container">
//             <Link to="/" className="nav-link">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/instagram-mini-project-logo-img.png"
//                 alt="website logo"
//                 className="header-logo"
//               />
//             </Link>
//             <h1 className="header-title">Insta Share</h1>
//           </div>

//           <div className="nav-search-and-menu">
//             <div className="search-input-container">
//               <input
//                 type="search"
//                 className="search-input"
//                 placeholder="Search Caption"
//                 value={searchInput}
//                 onChange={this.onChangeSearchInput}
//                 onKeyDown={this.onKeyDownSearch}
//               />
//               <button
//                 type="button"
//                 className="search-button"
//                 onClick={this.onSearch}
//                 testid="searchIcon"
//               >
//                 <FaSearch className="search-icon" />
//               </button>
//             </div>

//             <ul className="nav-menu">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link">
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/my-profile" className="nav-link">
//                   Profile
//                 </Link>
//               </li>
//             </ul>

//             <button
//               type="button"
//               className="logout-button"
//               onClick={this.onLogout}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>
//     )
//   }
// }

// export default withRouter(Header)



import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = event => {
    const value = event.target.value
    this.setState({searchInput: value})

    // Auto-fetch all posts when input is cleared
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
    const {searchInput} = this.state

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

          <div className="nav-search-and-menu">
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
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)