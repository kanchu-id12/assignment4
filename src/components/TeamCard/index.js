import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, name, teamImageUrl} = teamCardDetails

  return (
    <>
      <Link to={`/team-matches/${id}`} className="link-match-card">
        <li className="team-card-item-container">
          <div className="item-direction">
            <img src={teamImageUrl} alt={name} className="teamCardImg" />
            <p className="ipl-team-name">{name}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default TeamCard
