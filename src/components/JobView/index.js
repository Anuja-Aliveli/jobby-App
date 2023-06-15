import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillEnvelopeFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

const JobView = props => {
  const {jobDetails, similarList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    companyWebsiteUrl,
    lifeAtCompany,
    skills,
    title,
  } = jobDetails
  return (
    <div>
      <div className="detail-container">
        <div className="first-part-container">
          <div className="img-title-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="star-rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-job-type-container">
              <div className="location-icon-location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="location-icon-location-container">
                <BsFillEnvelopeFill className="location-icon" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <hr className="item-hr-line" />
        <div className="second-part-container">
          <div className="link-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit"
            >
              Visit <FiExternalLink className="location-icon" />
            </a>
          </div>
          <p className="description-para">{jobDescription}</p>
        </div>
        <h1 className="description-heading">Skills</h1>
        <div className="skill-container-bg">
          {skills.map(eachItem => (
            <div className="skill-container" key={eachItem.name}>
              <img
                className="skill-image"
                alt={eachItem.name}
                src={eachItem.imageUrl}
              />
              <p className="description-para">{eachItem.name}</p>
            </div>
          ))}
        </div>
        <h1 className="description-heading">Life At Company</h1>
        <div className="life-container">
          <p className="description-para">{lifeAtCompany.description}</p>
          <img
            className="life-image"
            alt="life at company"
            src={lifeAtCompany.imageUrl}
          />
        </div>
      </div>
      <h1 className="similar">Similar Jobs</h1>
      <ul className="similar-list-container">
        {similarList.map(eachItem => (
          <li className="similar-list-item" key={eachItem.id}>
            <div className="img-title-container">
              <img
                className="company-logo"
                src={eachItem.companyLogoUrl}
                alt="similar job company logo"
              />
              <div className="title-rating-container">
                <h1 className="description-heading">{eachItem.title}</h1>
                <div className="star-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating-text">{eachItem.rating}</p>
                </div>
              </div>
            </div>
            <h1 className="description-heading">Description</h1>
            <p className="description-para">{eachItem.jobDescription}</p>
            <div className="extra">
              <div className="location-icon-location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{eachItem.location}</p>
              </div>
              <div className="location-icon-location-container">
                <BsFillEnvelopeFill className="location-icon" />
                <p className="job-type">{eachItem.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default JobView
