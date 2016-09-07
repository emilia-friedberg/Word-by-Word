class StatusBar extends React.Component {
  constructor() {
    super()
    this.state = {
      streak: 0,
      totalCorrect: 0,
      totalAttempts: 0
    }
  }
  componentDidMount() {
    var streakURL = `/units/${this.props.unitId}/lessons/${this.props.lessonId}/attempts/streak`
    $.get(streakURL).done((response) => {
      this.setState({streak: response.streak, totalCorrect: response.totalCorrect, totalAttempts: response.totalAttempts})
    } )
  }

  render() {
      return (
        <div>
            this is status bar.....streak {this.state.streak} ....total correct {this.state.totalCorrect} total attempts {this.state.totalAttempts}
        </div>
      )
  }
}
