import './index.css'
const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {competingTeam, competingLogoTeam, id, date} = latestMatchDetails
  return (
    <div className="latest-match-container">
      <h1 className="main-heading">Latest Matches</h1>
      <div className='latest-match'>
       <h1>{competingTeam}</h1>
      </div>
    </div>
  )
}
export default LatestMatch
