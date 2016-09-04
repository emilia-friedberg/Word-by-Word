class TeacherDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      teacher: {},
      teacherHasCohorts: false,
      teacherCohorts: [],
      addCohortFormVisible: false,
      addAssignmentFormVisible: false
    }
    // this.toggleAddCohortForm = this.toggleAddCohortForm.bind(this);
    // this.toggleAddAssignmenttForm = this.toggleAddAssignmentForm.bind(this);
    // this.handleCohortFormSubmit = this.handleCohortFormSubmit.bind(this);
    // this.handleAssignmentFormSubmit = this.handleAssignmentFormSubmit.bind(this)

  }

  componentDidMount() {
    $.ajax({
      method: 'get',
      url: `/teachers/${this.props.teacherId}/info`
    }).done(function(response) {
      this.setState({
        teacher: response.teacher,
        teacherHasCohorts: response.teacherHasCohorts,
        teacherCohorts: response.teacherCohorts
      })
    }.bind(this))
  }

  render () {
    return (
    <div className="container">
      <h1> Welcome, {this.state.teacher.display_name} </h1>
      <h2> Cohorts </h2>
      { this.state.teacherHasCohorts ?
      <table className="table table-hover table-responsive">
        <thead className="thead-inverse">
          <tr>
            <th> Name </th>
            <th> Total Number of Students </th>
            <th> Number of Students with Past Due Assignments </th>
            <th> Access Code </th>
          </tr>
        </thead>
        { this.state.teacherCohorts.map((cohort, index) => {
          return (
            <tr>
              <td> {cohort.name} </td>
              <td> {cohort.size} </td>
              <td> {cohort.number_of_students_with_overdue_assignments} </td>
              <td> {cohort.access_code} </td>
            </tr>
          )
        })}
      </table>
    : <p> You do not currently have any cohorts. </p>}
    </div>
    )
  }
}
