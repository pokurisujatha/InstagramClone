import './index.css'

const FailureView = ({onRetry}) => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-img"
    />
    <p className="failure-text">Something went wrong. Please try again</p>
    <button type="button" className="retry-btn" onClick={onRetry}>
      Try Again
    </button>
  </div>
)

export default FailureView