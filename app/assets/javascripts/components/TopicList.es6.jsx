class TopicList extends React.Component {
  constructor() {
    super();
    this.state = {
      units: {}
    }
  }
  componentDidMount() {
    $.ajax({
      method: 'get',
      url: '/units/unit_list'
    }).done(function(response) {
      debugger;
      this.setState({
        units: response.units
      })
    }.bind(this))
  }
  render() {
    return (
      <div>
      <h3> Topics </h3>
      { this.state.units.length > 0 ?
      <ol>
        {this.state.units.map((unit, index) => {
          return (
            <li>
              {unit.name}
              <ol>
                {unit.lessons.map((lesson, index) => {
                  return (
                    <li> {lesson.name} </li>
                  )
                })}
              </ol>
            </li>
        )})}
        </ol>
      : null
      }
      </div>
    )
  }
}
