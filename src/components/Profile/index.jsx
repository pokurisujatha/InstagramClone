
// import {Component} from 'react'
// import {useParams, Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import Header from '../Header'
// import './index.css'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   inProgress: 'IN_PROGRESS',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
// }

// class ProfileComponent extends Component {
//   state = {
//     profileData: {},
//     apiStatus: apiStatusConstants.initial,
//     isNotFound: false,
//   }

//   componentDidMount() {
//     this.getProfileData()
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.userId !== this.props.userId) {
//       this.getProfileData()
//     }
//   }

//   getProfileData = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress, isNotFound: false})
//     const jwtToken = Cookies.get('jwt_token')
//     const {userId} = this.props

//     const apiUrl = userId
//       ? `https://apis.ccbp.in/insta-share/users/${userId}`
//       : 'https://apis.ccbp.in/insta-share/my-profile'

//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }

//     try {
//       const response = await fetch(apiUrl, options)
//       if (response.ok) {
//         const data = await response.json()
//         const profile = data.user_details || data.profile
//         const updatedData = {
//           id: profile.id,
//           userId: profile.user_id,
//           userName: profile.user_name,
//           profilePic: profile.profile_pic,
//           followersCount: profile.followers_count,
//           followingCount: profile.following_count,
//           userBio: profile.user_bio,
//           postsCount: profile.posts_count,
//           posts: profile.posts || [],
//           stories: profile.stories || [],
//         }
//         this.setState({
//           profileData: updatedData,
//           apiStatus: apiStatusConstants.success,
//         })
//       } else {
//         this.setState({apiStatus: apiStatusConstants.failure, isNotFound: true})
//       }
//     } catch {
//       this.setState({apiStatus: apiStatusConstants.failure, isNotFound: true})
//     }
//   }

//   renderSuccessView = () => {
//     const {profileData} = this.state
//     const {
//       userName,
//       profilePic,
//       followersCount,
//       followingCount,
//       userBio,
//       postsCount,
//       posts,
//       stories,
//     } = profileData

//     return (
//       <div className="profile-details-container">
//         <div className="profile-header">
//           <img src={profilePic} alt="user profile" className="profile-pic" />
//           <div className="profile-info">
//             <h1 className="profile-username">{userName}</h1>
//             <div className="profile-stats">
//               <p className="stat-item">
//                 <span className="stat-count">{postsCount}</span> posts
//               </p>
//               <p className="stat-item">
//                 <span className="stat-count">{followersCount}</span> followers
//               </p>
//               <p className="stat-item">
//                 <span className="stat-count">{followingCount}</span> following
//               </p>
//             </div>
//             <p className="profile-bio">{userBio}</p>
//           </div>
//         </div>

//         <ul className="profile-stories-list">
//           {stories.map(story => (
//             <li key={story.id} className="profile-story-item">
//               <img src={story.image} alt="user story" className="profile-story-img" />
//             </li>
//           ))}
//         </ul>

//         <hr className="divider" />

//         <div className="posts-header">
//           <h2 className="posts-heading">Posts</h2>
//         </div>

//         <ul className="profile-posts-grid">
//           {posts.map(post => (
//             <li key={post.id} className="profile-post-item">
//               <img src={post.image} alt="user post" className="profile-post-img" />
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   renderLoadingView = () => (
//     <div className="profile-loader-container">
//       <p style={{color: '#4094EF', textAlign: 'center', marginTop: '40px'}}>
//         Loading Profile...
//       </p>
//     </div>
//   )

//   renderFailureView = () => (
//     <div className="profile-failure-container">
//       <button type="button" onClick={this.getProfileData} className="retry-btn">
//         Retry
//       </button>
//     </div>
//   )

//   render() {
//     const {apiStatus, isNotFound} = this.state

//     if (isNotFound) {
//       return <Redirect to="/not-found" />
//     }

//     return (
//       <div className="profile-main-container">
//         <Header />
//         <div className="profile-content">
//           {apiStatus === apiStatusConstants.inProgress && this.renderLoadingView()}
//           {apiStatus === apiStatusConstants.success && this.renderSuccessView()}
//           {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
//         </div>
//       </div>
//     )
//   }
// }

// const Profile = props => {
//   const params = useParams()
//   return <ProfileComponent {...props} userId={params.id} />
// }

// export default Profile






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

class Profile extends Component {
  state = {
    myProfileData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
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
        const profile = data.profile
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
          myProfileData: updatedData,
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
    const {myProfileData} = this.state
    const {
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
      posts,
      stories,
    } = myProfileData

    return (
      <div className="profile-details-card">
        <div className="profile-header-container">
          <img src={profilePic} alt="my profile" className="user-avatar" />
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
                  alt="my story"
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
                  alt="my post"
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
      <p>Loading...</p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getMyProfile} className="retry-btn">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <div className="profile-main-container">
        <Header />
        <div className="profile-content">
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

export default Profile