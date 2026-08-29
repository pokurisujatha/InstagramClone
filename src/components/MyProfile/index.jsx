import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import FailureView from '../FailureView'
import apiStatusConstants from '../../constants/APIConstants'
import './index.css'

const MyProfile = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileData, setProfileData] = useState({})

  const getMyProfile = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const p = data.profile
        const formattedData = {
          id: p.id,
          userId: p.user_id,
          userName: p.user_name,
          profilePic: p.profile_pic,
          followersCount: p.followers_count,
          followingCount: p.following_count,
          userBio: p.user_bio,
          postsCount: p.posts_count,
          posts: p.posts,
          stories: p.stories,
        }
        setProfileData(formattedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getMyProfile()
  }, [])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="spinner"></div>
    </div>
  )

  const renderProfile = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return (
          <Profile
            profileData={profileData}
            profileAlt="my profile"
            storyAlt="my story"
            postAlt="my post"
          />
        )
      case apiStatusConstants.failure:
        return <FailureView onRetry={getMyProfile} />
      default:
        return null
    }
  }

  return (
    <div className="page-container">
      <Header />
      <div className="body-container">{renderProfile()}</div>
    </div>
  )
}

export default MyProfile