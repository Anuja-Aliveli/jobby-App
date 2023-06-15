import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobItem from '../JobItem'
import './index.css'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiProfile: apiStatusConstants.initial,
    jobsList: [],
    profileData: '',
    searchInput: '',
    checkboxInput: [],
    radioInput: '',
  }

  componentDidMount = () => {
    this.getJobList()
    this.getProfile()
  }

  getFormatList = eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    packagePerAnnum: eachItem.package_per_annum,
    title: eachItem.title,
    location: eachItem.location,
    rating: eachItem.rating,
  })

  getJobList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.progress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const {searchInput, checkboxInput, radioInput} = this.state
    const checkString = checkboxInput.join()
    const urlList = `https://apis.ccbp.in/jobs?employment_type=${checkString}&minimum_package=${radioInput}&search=${searchInput}`
    const response = await fetch(urlList, options)
    const dataList = await response.json()
    if (response.ok === true) {
      const formattedList = dataList.jobs.map(eachItem =>
        this.getFormatList(eachItem),
      )
      this.setState({
        jobsList: formattedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getProfile = async () => {
    this.setState({apiProfile: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileUrl = 'https://apis.ccbp.in/profile'
    const responseProfile = await fetch(profileUrl, options)
    const dataProfile = await responseProfile.json()
    if (responseProfile.ok === true) {
      const formatProfile = {
        profileImageUrl: dataProfile.profile_details.profile_image_url,
        shortBio: dataProfile.profile_details.short_bio,
        name: dataProfile.profile_details.name,
      }
      this.setState({
        profileData: formatProfile,
        apiProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({apiProfile: apiStatusConstants.failure})
    }
  }

  onRetryList = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
        apiProfile: apiStatusConstants.initial,
        jobsList: [],
        profileData: '',
        searchInput: '',
        checkboxInput: [],
        radioInput: '',
      },
      this.getJobList,
    )
  }

  onRetryProfile = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
        apiProfile: apiStatusConstants.initial,
        jobsList: [],
        profileData: '',
        searchInput: '',
        checkboxInput: [],
        radioInput: '',
      },
      this.getProfile,
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  renderList = () => {
    const {jobsList, searchInput} = this.state
    const isZero = jobsList.length === 0
    return (
      <div className="job-list-container">
        <div className="input-container">
          <input
            type="search"
            placeholder="search"
            className="input-search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="button-search"
            onClick={this.getJobList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {isZero && (
          <div className="failure-container">
            <img
              className="fail-image"
              alt="no jobs"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
            />
            <h1 className="fail-head">No Jobs Found</h1>
            <p className="fail-text">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
        {!isZero && (
          <ul className="job-list">
            {jobsList.map(eachJob => (
              <JobItem key={eachJob.id} jobData={eachJob} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFailure = () => {
    const {searchInput} = this.state
    return (
      <div className="job-list-container">
        <div className="input-container">
          <input
            type="search"
            value={searchInput}
            placeholder="search"
            className="input-search"
            onChange={this.changeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="button-search"
            onClick={this.getJobList}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="failure-container">
          <img
            className="fail-image"
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          />
          <h1 className="fail-head">Oops! Something Went Wrong</h1>
          <p className="fail-text">
            We cannot seem to find the page you are looking for.
          </p>
          <button className="retry" type="button" onClick={this.onRetryList}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.progress:
        return this.renderProgress()
      default:
        return null
    }
  }

  onCheckbox = event => {
    const checkValue = event.target.value
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          checkboxInput: [...prevState.checkboxInput, checkValue],
        }),
        this.getJobList,
      )
    } else {
      this.setState(
        prevState => ({
          checkboxInput: prevState.checkboxInput.filter(
            eachItem => eachItem !== checkValue,
          ),
        }),
        this.getJobList,
      )
    }
  }

  onRadio = event => {
    this.setState({radioInput: event.target.id}, this.getJobList)
  }

  progressLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryBtn = () => (
    <div className="retry-container">
      <button className="retry" type="button" onClick={this.onRetryProfile}>
        Retry
      </button>
    </div>
  )

  userProfile = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-container">
        <img className="profile-image" alt="profile" src={profileImageUrl} />
        <h1 className="name">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  renderFilterList = () => {
    const {apiProfile} = this.state
    switch (apiProfile) {
      case apiStatusConstants.success:
        return this.userProfile()
      case apiStatusConstants.failure:
        return this.retryBtn()
      case apiStatusConstants.progress:
        return this.progressLoader()
      default:
        return null
    }
  }

  renderFilterSection = () => (
    <div className="filter-container">
      {this.renderFilterList()}
      <hr />
      <div className="mobile-view">
        <div className="employee-container">
          <h1 className="main-text">Type of Employment</h1>
          <ul className="filter-type-container">
            {employmentTypesList.map(eachItem => (
              <li className="filter-item" key={eachItem.employmentTypeId}>
                <input
                  type="checkbox"
                  className="input-type"
                  value={eachItem.employmentTypeId}
                  id={eachItem.employmentTypeId}
                  onChange={this.onCheckbox}
                />
                <label
                  htmlFor={eachItem.employmentTypeId}
                  className="label-text"
                >
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="line" />
        <div className="employee-container">
          <h1 className="main-text">Salary Range</h1>
          <ul className="filter-type-container">
            {salaryRangesList.map(eachItem => (
              <li className="filter-item" key={eachItem.salaryRangeId}>
                <input
                  type="radio"
                  name="salary"
                  id={eachItem.salaryRangeId}
                  onChange={this.onRadio}
                  className="input-type"
                />
                <label htmlFor={eachItem.salaryRangeId} className="label-text">
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <div className="job-container">
        <Header />
        <div className="content-container">
          {this.renderFilterSection()}
          {this.renderJobsList()}
        </div>
      </div>
    )
  }
}
export default Jobs
