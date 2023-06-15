import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobView from '../JobView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: '',
    similarList: [],
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const eachItem = data.job_details
      const formattedData = {
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        title: eachItem.title,
        location: eachItem.location,
        rating: eachItem.rating,
        companyWebsiteUrl: eachItem.company_website_url,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        skills: eachItem.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }
      const similarList = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        title: each.title,
        location: each.location,
        rating: each.rating,
      }))

      this.setState({
        jobDetails: formattedData,
        apiStatus: apiStatusConstants.success,
        similarList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetryDetails = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
        jobDetails: '',
        similarList: [],
      },
      this.getJobDetails,
    )
  }

  renderJobDetails = () => {
    const {jobDetails, similarList} = this.state
    return (
      <div>
        <JobView jobDetails={jobDetails} similarList={similarList} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-details">
      <img
        className="fail-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="fail-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry" type="button" onClick={this.onRetryDetails}>
        Retry
      </button>
    </div>
  )

  renderProgress = () => (
    <div className="loader-details" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-bg-container">
        <Header />
        {this.renderJobItemDetails()}
      </div>
    )
  }
}
export default JobItemDetails
