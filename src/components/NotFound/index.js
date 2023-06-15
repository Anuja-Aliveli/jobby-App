import './index.css'

const NotFound = () => (
  <div className="not-bg-container">
    <div className="not-container">
      <img
        className="not-image"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1 className="not-head">Page Not Found</h1>
      <p className="page-text">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
