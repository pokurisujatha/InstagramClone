
import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    storiesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
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
        const updatedData = data.users_stories.map(story => ({
          storyId: story.story_id,
          userId: story.user_id,
          userName: story.user_name,
          storyUrl: story.story_url,
        }))
        this.setState({
          storiesList: updatedData,
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
    const {storiesList} = this.state
    return (
      <div className="slick-container">
        <Slider {...sliderSettings}>
          {storiesList.map(story => (
            <div key={story.storyId} className="story-item">
              <img
                src={story.storyUrl}
                alt="user story"
                className="story-image"
              />
              <p className="story-username">{story.userName}</p>
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="stories-loader-container">
      <p style={{textAlign: 'center', color: '#4094EF'}}>Loading Stories...</p>
    </div>
  )

  renderFailureView = () => (
    <div className="stories-failure-container">
      <button type="button" className="retry-btn" onClick={this.getStories}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <div className="main-stories-wrapper">
        {apiStatus === apiStatusConstants.inProgress && this.renderLoadingView()}
        {apiStatus === apiStatusConstants.success && this.renderSuccessView()}
        {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
      </div>
    )
  }
}

export default UserStories