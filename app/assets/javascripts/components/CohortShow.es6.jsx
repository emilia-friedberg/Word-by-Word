class CohortShow extends React.Component {
  constructor() {
    super();
    this.state = {
      cohort: {},
      students: [],
      assignments: []
    }
  }
  componentDidMount() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/info`
    }).done(function(response) {
      this.setState({
        cohort: response.cohort,
        students: response.students,
        assignments: response.assignments
      })
    }.bind(this));
  }
  render () {
    return (
      <div className="container">
        <h1> {this.state.cohort.name} </h1>
        <h2> Students </h2>
        <table className="table table-hover table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th> First Name </th>
              <th> Last Name </th>
              <th> Email </th>
              <th> Number of Completed Assignments </th>
              <th> Number of Past Due Assignments </th>
            </tr>
          </thead>
          { this.state.students.map((student, index) => {
            var link = "/students/"
            return (
              <tr>
                <td> <a href={link.concat(student.id)}> {student.first_name} </a> </td>
                <td> <a href={link.concat(student.id)}>{student.last_name} </a> </td>
                <td> {student.email} </td>
                <td> {student.number_of_completed_assignments} </td>
                <td> {student.number_of_past_due_assignments} </td>
              </tr>
            )
          })}
        </table>
        <h2> Assignments </h2>
        <table className="table table-hover table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th> Date Assigned </th>
              <th> Unit </th>
              <th> Lesson </th>
              <th> Date Due </th>
              <th> Number of Prompts </th>
              <th> Number of Prompts to Meet Completion Criterion </th>
            </tr>
          </thead>
          { this.state.assignments.map((assignment, index) => {
            return (
              <tr>
                <td> {assignment.created_at} </td>
                <td> {assignment.unit_id} </td>
                <td> {assignment.lesson_id} - {assignment.lesson_name} </td>
                <td> {assignment.due_date} </td>
                <td> {assignment.number_of_prompts} </td>
                <td> {assignment.completion_number} </td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}
