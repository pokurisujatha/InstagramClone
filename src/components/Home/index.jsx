


// import {Component} from 'react'
// import {Link, withRouter} from 'react-router-dom'
// import {BsHeart} from 'react-icons/bs'
// import {FcLike} from 'react-icons/fc'
// import {FaRegComment} from 'react-icons/fa'
// import {BiShareAlt} from 'react-icons/bi'
// import Cookies from 'js-cookie'
// import Header from '../Header'
// import UserStories from '../UserStories'
// import './index.css'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   inProgress: 'IN_PROGRESS',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
// }

// class Home extends Component {
//   state = {
//     postsList: [],
//     storiesList: [],
//     searchInput: '',
//     apiStatus: apiStatusConstants.initial,
//   }

//   componentDidMount() {
//     this.getStories()
//     this.getPosts()
//   }

//   getStories = async () => {
//     const jwtToken = Cookies.get('jwt_token')
//     const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
//     const options = {
//       headers: {Authorization: `Bearer ${jwtToken}`},
//       method: 'GET',
//     }
//     try {
//       const response = await fetch(apiUrl, options)
//       if (response.ok) {
//         const data = await response.json()
//         const updatedStories = data.users_stories.map(story => ({
//           userId: story.user_id,
//           userName: story.user_name,
//         }))
//         this.setState({storiesList: updatedStories})
//       }
//     } catch {
//       // Fallback
//     }
//   }

//   getPosts = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress})
//     const {searchInput} = this.state
//     const jwtToken = Cookies.get('jwt_token')

//     const apiUrl = searchInput
//       ? `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
//       : 'https://apis.ccbp.in/insta-share/posts'

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
//         const updatedPosts = data.posts.map(post => ({
//           postId: post.post_id,
//           userId: post.user_id,
//           userName: post.user_name,
//           profilePic: post.profile_pic,
//           postDetails: {
//             imageUrl: post.post_details.image_url,
//             caption: post.post_details.caption,
//           },
//           likesCount: post.likes_count,
//           comments: post.comments.map(c => ({
//             userName: c.user_name,
//             userId: c.user_id,
//             comment: c.comment,
//           })),
//           createdAt: post.created_at,
//           isLiked: false,
//         }))
//         this.setState({
//           postsList: updatedPosts,
//           apiStatus: apiStatusConstants.success,
//         })
//       } else {
//         this.setState({apiStatus: apiStatusConstants.failure})
//       }
//     } catch {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   onSearchPost = searchVal => {
//     const {storiesList, postsList} = this.state
//     const {history} = this.props
//     const normalizedSearch = searchVal.trim().toLowerCase()

//     if (!normalizedSearch) {
//       this.setState({searchInput: ''}, this.getPosts)
//       return
//     }

//     // Check if the search matches a User Name in stories or posts
//     const matchedUserFromStories = storiesList.find(s =>
//       s.userName.toLowerCase().includes(normalizedSearch),
//     )
//     const matchedUserFromPosts = postsList.find(p =>
//       p.userName.toLowerCase().includes(normalizedSearch),
//     )

//     const targetUserId =
//       matchedUserFromStories?.userId || matchedUserFromPosts?.userId

//     // If a matching user is found, redirect to their profile page
//     if (targetUserId) {
//       history.push(`/users/${targetUserId}`)
//     } else {
//       // Fallback to searching post captions
//       this.setState({searchInput: searchVal}, this.getPosts)
//     }
//   }

//   toggleLike = async (postId, isLiked) => {
//     const jwtToken = Cookies.get('jwt_token')

//     this.setState(prevState => ({
//       postsList: prevState.postsList.map(post => {
//         if (post.postId === postId) {
//           return {
//             ...post,
//             isLiked: !post.isLiked,
//             likesCount: post.isLiked
//               ? post.likesCount - 1
//               : post.likesCount + 1,
//           }
//         }
//         return post
//       }),
//     }))

//     const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
//     const options = {
//       headers: {Authorization: `Bearer ${jwtToken}`},
//       method: 'POST',
//       body: JSON.stringify({like_status: !isLiked}),
//     }

//     try {
//       await fetch(apiUrl, options)
//     } catch {
//       // Silent error handling
//     }
//   }

//   renderSuccessView = () => {
//     const {postsList} = this.state

//     if (postsList.length === 0) {
//       return (
//         <div className="search-not-found-container">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
//             alt="search not found"
//             className="search-not-found-image"
//           />
//           <h1 className="search-not-found-heading">Search Not Found</h1>
//           <p className="search-not-found-description">
//             Try different keyword or search again
//           </p>
//         </div>
//       )
//     }

//     return (
//       <ul className="posts-list-container">
//         {postsList.map(post => {
//           const {
//             postId,
//             userId,
//             userName,
//             profilePic,
//             postDetails,
//             likesCount,
//             comments,
//             createdAt,
//             isLiked,
//           } = post
//           const {imageUrl, caption} = postDetails

//           return (
//             <li key={postId} className="post-item-container">
//               <div className="post-header">
//                 <img
//                   src={profilePic}
//                   alt="post author profile"
//                   className="post-profile-pic"
//                 />
//                 <Link to={`/users/${userId}`} className="post-user-name">
//                   {userName}
//                 </Link>
//               </div>

//               <img src={imageUrl} alt="post" className="post-image" />

//               <div className="post-details-container">
//                 <div className="actions-container">
//                   <button
//                     type="button"
//                     className="action-btn"
//                     onClick={() => this.toggleLike(postId, isLiked)}
//                   >
//                     {isLiked ? (
//                       <FcLike className="icon liked" />
//                     ) : (
//                       <BsHeart className="icon" />
//                     )}
//                   </button>
//                   <button type="button" className="action-btn">
//                     <FaRegComment className="icon" />
//                   </button>
//                   <button type="button" className="action-btn">
//                     <BiShareAlt className="icon" />
//                   </button>
//                 </div>

//                 <p className="likes-count">{likesCount} likes</p>
//                 <p className="caption">{caption}</p>

//                 <ul className="comments-list">
//                   {comments.map(c => (
//                     <li key={`${postId}-${c.userId}`} className="comment-item">
//                       <span className="comment-user">{c.userName}</span>{' '}
//                       {c.comment}
//                     </li>
//                   ))}
//                 </ul>

//                 <p className="created-at">{createdAt}</p>
//               </div>
//             </li>
//           )
//         })}
//       </ul>
//     )
//   }

//   renderLoadingView = () => (
//     <div className="loader-container">
//       <p>Loading Posts...</p>
//     </div>
//   )

//   renderFailureView = () => (
//     <div className="failure-container">
//       <p>Something went wrong. Please try again</p>
//       <button type="button" onClick={this.getPosts} className="retry-btn">
//         Retry
//       </button>
//     </div>
//   )

//   render() {
//     const {apiStatus} = this.state

//     return (
//       <div className="home-main-container">
//         <Header onSearchPost={this.onSearchPost} />
//         <div className="home-content-container">
//           <UserStories />
//           {apiStatus === apiStatusConstants.inProgress &&
//             this.renderLoadingView()}
//           {apiStatus === apiStatusConstants.success &&
//             this.renderSuccessView()}
//           {apiStatus === apiStatusConstants.failure &&
//             this.renderFailureView()}
//         </div>
//       </div>
//     )
//   }
// }

// export default withRouter(Home)


import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStories from '../UserStories'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    postsList: [],
    storiesList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStories()
    this.getPosts()
  }

  getStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const updatedStories = data.users_stories.map(story => ({
          userId: story.user_id,
          userName: story.user_name,
        }))
        this.setState({storiesList: updatedStories})
      }
    } catch {
      // Fallback
    }
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = searchInput
      ? `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
      : 'https://apis.ccbp.in/insta-share/posts'

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
        const updatedPosts = data.posts.map(post => ({
          postId: post.post_id,
          userId: post.user_id,
          userName: post.user_name,
          profilePic: post.profile_pic,
          postDetails: {
            imageUrl: post.post_details.image_url,
            caption: post.post_details.caption,
          },
          likesCount: post.likes_count,
          comments: post.comments.map(c => ({
            userName: c.user_name,
            userId: c.user_id,
            comment: c.comment,
          })),
          createdAt: post.created_at,
          isLiked: false,
        }))
        this.setState({
          postsList: updatedPosts,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearchPost = searchVal => {
    const {storiesList, postsList} = this.state
    const {history} = this.props
    const normalizedSearch = searchVal.trim().toLowerCase()

    if (!normalizedSearch) {
      this.setState({searchInput: ''}, this.getPosts)
      return
    }

    // Check if the search matches a User Name in stories or posts
    const matchedUserFromStories = storiesList.find(s =>
      s.userName.toLowerCase().includes(normalizedSearch),
    )
    const matchedUserFromPosts = postsList.find(p =>
      p.userName.toLowerCase().includes(normalizedSearch),
    )

    const targetUserId =
      matchedUserFromStories?.userId || matchedUserFromPosts?.userId

    // If a matching user is found, redirect to their profile page
    if (targetUserId) {
      history.push(`/users/${targetUserId}`)
    } else {
      // Fallback to searching post captions
      this.setState({searchInput: searchVal}, this.getPosts)
    }
  }

  toggleLike = async (postId, isLiked) => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState(prevState => ({
      postsList: prevState.postsList.map(post => {
        if (post.postId === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likesCount: post.isLiked
              ? post.likesCount - 1
              : post.likesCount + 1,
          }
        }
        return post
      }),
    }))

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'POST',
      body: JSON.stringify({like_status: !isLiked}),
    }

    try {
      await fetch(apiUrl, options)
    } catch {
      // Silent error handling
    }
  }

  renderSuccessView = () => {
    const {postsList} = this.state

    if (postsList.length === 0) {
      return (
        <div className="search-not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="search not found"
            className="search-not-found-image"
          />
          <h1 className="search-not-found-heading">Search Not Found</h1>
          <p className="search-not-found-description">
            Try different keyword or search again
          </p>
        </div>
      )
    }

    return (
      <ul className="posts-list-container">
        {postsList.map(post => {
          const {
            postId,
            userId,
            userName,
            profilePic,
            postDetails,
            likesCount,
            comments,
            createdAt,
            isLiked,
          } = post
          const {imageUrl, caption} = postDetails

          return (
            <li key={postId} className="post-item-container">
              <div className="post-header">
                <img
                  src={profilePic}
                  alt="post author profile"
                  className="post-profile-pic"
                />
                <Link to={`/users/${userId}`} className="post-user-name">
                  {userName}
                </Link>
              </div>

              <img src={imageUrl} alt="post" className="post-image" />

              <div className="post-details-container">
                <div className="actions-container">
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => this.toggleLike(postId, isLiked)}
                  >
                    {isLiked ? (
                      <FcLike className="icon liked" />
                    ) : (
                      <BsHeart className="icon" />
                    )}
                  </button>
                  <button type="button" className="action-btn">
                    <FaRegComment className="icon" />
                  </button>
                  <button type="button" className="action-btn">
                    <BiShareAlt className="icon" />
                  </button>
                </div>

                <p className="likes-count">{likesCount} likes</p>
                <p className="caption">{caption}</p>

                <ul className="comments-list">
                  {comments.map(c => (
                    <li key={`${postId}-${c.userId}`} className="comment-item">
                      <span className="comment-user">{c.userName}</span>{' '}
                      {c.comment}
                    </li>
                  ))}
                </ul>

                <p className="created-at">{createdAt}</p>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <img
        src="/assets/Loading.png"
        alt="loader"
        className="loader-image"
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getPosts} className="retry-btn">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <div className="home-main-container">
        <Header onSearchPost={this.onSearchPost} />
        <div className="home-content-container">
          <UserStories />
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

export default withRouter(Home)