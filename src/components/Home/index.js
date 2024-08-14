import {Component} from 'react'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamCards: [],
  }

  componentDidMount() {
    this.getTeamCardItem()
  }

  getTeamCardItem = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatingTeamCards = data.teams.map(eachCard => ({
      id: eachCard.id,
      name: eachCard.name,
      teamImageUrl: eachCard.team_image_url,
    }))

    this.setState({teamCards: updatingTeamCards})
  }

  render() {
    const {teamCards} = this.state
    return (
      <div className="match-home-container">
        <div className="ipl-main-heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        <ul className="team-card-list-container">
          {teamCards.map(eachItem => (
            <TeamCard key={eachItem.id} teamCardDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }
}
export default Home
