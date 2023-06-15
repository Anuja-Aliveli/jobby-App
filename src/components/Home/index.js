import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="bg-home">
    <Header />
    <div className="home-container">
      <h1 className="home-head">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential
      </p>
      <Link to="/jobs">
        <button type="button" className="home-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
