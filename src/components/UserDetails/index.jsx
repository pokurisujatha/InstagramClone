// import {useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import Header from '../Header'
// import Profile from '../Profile'
// import FailureView from '../FailureView'
// import apiStatusConstants from '../../constants/APIConstants'
// import './index.css'

// const UserDetails = () => {
//   const {id} = useParams()
//   const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
//   const [userData, setUserData] = useState({})

//   const getUserDetails = async () => {
//     setApiStatus(apiStatusConstants.inProgress)
//     const jwtToken = Cookies.get('jwt_token')
//     const url = `https://apis.ccbp.in/insta-share/users/${id}`
//     const options = {headers: {Authorization: `Bearer ${jwtToken}`}}

//     try {
//       const response = await fetch(url, options)
//       if (response.ok) {
//         const data = await response.json()
//         const u = data.user_details
//         const formattedData = {
//           id: u.id,
//           userId: u.user_id,
//           userName: u.user_name,
//           profilePic: u.profile_pic,
//           followersCount: u.followers_count,
//           followingCount: u.following_count,
//           userBio: u.user_bio,
//           postsCount: u.posts_count,
//           posts: u.posts,
//           stories: u.stories,
//         }
//         setUserData(formattedData)
//         setApiStatus(apiStatusConstants.success)
//       } else {
//         setApiStatus(apiStatusConstants.failure)
//       }
//     } catch {
//       setApiStatus(apiStatusConstants.failure)
//     }
//   }

//   useEffect(() => {
//     getUserDetails()
//   }, [id])

//   const renderLoader = () => (
//     <div className="loader-container" data-testid="loader">
//       <div className="spinner"></div>
//     </div>
//   )

//   const renderUserDetailsView = () => {
//     switch (apiStatus) {
//       case apiStatusConstants.inProgress:
//         return renderLoader()
//       case apiStatusConstants.success:
//         return (
//           <Profile
//             profileData={userData}
//             profileAlt="user profile"
//             storyAlt="user story"
//             postAlt="user post"
//           />
//         )
//       case apiStatusConstants.failure:
//         return <FailureView onRetry={getUserDetails} />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="page-container">
//       <Header />
//       <div className="body-container">{renderUserDetailsView()}</div>
//     </div>
//   )
// }

// export default UserDetails


import {Component} from 'react'
import {BiCamera} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserDetails extends Component {
  state = {
    profileData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const profile = data.user_details
        const updatedData = {
          id: profile.id,
          userId: profile.user_id,
          userName: profile.user_name,
          profilePic: profile.profile_pic,
          followersCount: profile.followers_count,
          followingCount: profile.following_count,
          userBio: profile.user_bio,
          postsCount: profile.posts_count,
          posts: profile.posts || [],
          stories: profile.stories || [],
        }
        this.setState({
          profileData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
      posts,
      stories,
    } = profileData

    return (
      <div className="user-details-card">
        <div className="profile-header-container">
          <img src={profilePic} alt="user profile" className="user-avatar" />
          <div className="user-info-section">
            <h1 className="user-display-name">{userName}</h1>
            <div className="user-stats-row">
              <p className="stat-text">
                <span className="stat-number">{postsCount}</span> posts
              </p>
              <p className="stat-text">
                <span className="stat-number">{followersCount}</span> followers
              </p>
              <p className="stat-text">
                <span className="stat-number">{followingCount}</span> following
              </p>
            </div>
            <p className="user-bio-name">{userName}</p>
            <p className="user-bio-text">{userBio}</p>
          </div>
        </div>

        {stories.length > 0 && (
          <ul className="stories-highlights-list">
            {stories.map(story => (
              <li key={story.id} className="highlight-item">
                <img
                  src={story.image}
                  alt="user story"
                  className="highlight-img"
                />
              </li>
            ))}
          </ul>
        )}

        <hr className="profile-divider" />

        <div className="posts-tab-header">
          <h2 className="posts-tab-title">Posts</h2>
        </div>

        {posts.length === 0 ? (
          <div className="no-posts-container">
            <div className="camera-icon-wrapper">
              <BiCamera className="camera-icon" />
            </div>
            <h1 className="no-posts-heading">No Posts Yet</h1>
          </div>
        ) : (
          <ul className="user-posts-grid">
            {posts.map(post => (
              <li key={post.id} className="grid-post-item">
                <img
                  src={post.image}
                  alt="user post"
                  className="grid-post-img"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <p>Loading Details...</p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getUserDetails} className="retry-btn">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <div className="user-details-main-container">
        <Header />
        <div className="user-details-content">
          {apiStatus === apiStatusConstants.inProgress &&
            this.renderLoadingView()}
          {apiStatus === apiStatusConstants.success &&
            this.renderSuccessView()}
          {apiStatus === apiStatusConstants.failure &&
            this.renderFailureView()}
        </div>
      </div>
    )
  }
}

export default UserDetails