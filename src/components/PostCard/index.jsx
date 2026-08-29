import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import './index.css'

const PostCard = ({postData}) => {
  const {postId, userId, userName, profilePic, postDetails, likesCount, comments, createdAt} = postData
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(likesCount)

  const toggleLike = async () => {
    const nextLikeState = !isLiked
    setIsLiked(nextLikeState)
    setLikes(prev => (nextLikeState ? prev + 1 : prev - 1))

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: nextLikeState}),
    }

    try {
      await fetch(url, options)
    } catch {
      setIsLiked(isLiked)
      setLikes(likesCount)
    }
  }

  return (
    <li className="post-card">
      <div className="post-header">
        <img src={profilePic} alt="post author profile" className="author-profile-pic" />
        <Link to={`/users/${userId}`} className="post-author-name">
          {userName}
        </Link>
      </div>

      <img src={postDetails.image_url} alt="post" className="post-image" />

      <div className="post-actions">
        {isLiked ? (
          <button type="button" className="action-btn" data-testid="unLikeIcon" onClick={toggleLike}>
            <FcLike className="icon" />
          </button>
        ) : (
          <button type="button" className="action-btn" data-testid="likeIcon" onClick={toggleLike}>
            <BsHeart className="icon" />
          </button>
        )}
        <button type="button" className="action-btn">
          <FaRegComment className="icon" />
        </button>
        <button type="button" className="action-btn">
          <BiShareAlt className="icon" />
        </button>
      </div>

      <p className="likes-count">{likes} likes</p>
      <p className="caption">{postDetails.caption}</p>

      {comments && comments.length > 0 && (
        <ul className="comments-list">
          {comments.map(c => (
            <li key={c.user_id} className="comment-item">
              <span className="comment-user">{c.user_name} </span>
              <span className="comment-text">{c.comment}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="created-at">{createdAt}</p>
    </li>
  )
}

export default PostCard