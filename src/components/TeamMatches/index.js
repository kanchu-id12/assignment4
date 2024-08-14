import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const fetchingUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattingData = data => ({
    umpires: data.umpires,
    result: data.result,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    manOfTheMatch: data.man_of_the_match,
    date: data.date,
    id: data.id,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    venue: data.venue,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${fetchingUrl}${id}`)
    const apisData = await response.json()
    const updatingFromatData = {
      teamBannerUrl: apisData.team_banner_url,
      latestMatches: this.getFormattingData(apisData.latest_match_details),
      recentMatches: apisData.recent_matches.map(eachItem =>
        this.getFormattingData(eachItem),
      ),
    }
    this.setState({teamMatchesData: updatingFromatData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatches, recentMatches} = teamMatchesData
    console.log(teamBannerUrl, latestMatches, recentMatches)

    return (
      <div className="banner-container">
        <img src={teamBannerUrl} alt="team banner" className="banner-image" />
        <LatestMatch latestMatchDetails={latestMatches} />
      </div>
    )
  }

  getRoutebgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'CSK':
        return 'csk'
      case 'KKR':
        return 'kkr'
      case 'RCB':
        return 'rcb'
      case 'DC':
        return 'dc'
      case 'KXP':
        return 'kxp'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      default:
        return ''
    }
  }

  loaderFunction = () => {
    return (
      <div data-testid="loader" className="loader-spinner-container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRoutebgColor()}`
    return (
      <div className={className}>
        {isLoading ? this.loaderFunction() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
