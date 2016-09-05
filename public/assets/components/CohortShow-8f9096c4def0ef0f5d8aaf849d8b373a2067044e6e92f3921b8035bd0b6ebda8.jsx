class CohortShow extends React.Component {
  constructor() {
    super();
    this.state = {
      cohort: {},
      students: [],
      assignments: [],
    }
    // this.deleteAssignment = this.deleteAssignment.bind(this);
    this.getAssignments = this.getAssignments.bind(this);
    this.getCohort = this.getCohort.bind(this);
    this.getStudents = this.getStudents.bind(this);
    // this.toggleEditAssignment= this.toggleEditAssignment.bind(this)
  }

  getAssignments() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/assignments_info`
    }).done(function(response) {
      this.setState({
        assignments: response.assignments
      })
    }.bind(this));
  }

  getCohort() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/cohort_info`
    }).done(function(response) {
      this.setState({
        cohort: response.cohort
      })
    }.bind(this));
  }

  getStudents() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/students_info`
    }).done(function(response) {
      this.setState({
        students: response.students
      })
    }.bind(this));
  }

  // deleteAssignment(event) {
  //   var assignmentId = event.target.closest('tr').id
  //   $.ajax({
  //     method: 'delete',
  //     url: `/assignments/${assignmentId}`
  //   }).done(function(response) {
  //     this.getAssignments()
  //   }.bind(this))
  // }

  componentWillMount() {
    this.getStudents();
    this.getCohort();
    this.getAssignments();
  }
  render () {
    return (
      <div className="container">
        <h1> {this.state.cohort.name} </h1>
        <h2> Students </h2>
        { this.state.students.length < 1 ?
        <p> There are no students assigned to this cohort. In order to join a cohort, students must have a registered account and add themselves to the classroom using the provided access code. </p>
      :
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
      }
        <h2> Assignments </h2>
        {this.state.assignments.length < 1 ?
        <p> There are no assignments for this cohort. </p>
        :
        <table className="table table-hover table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th> Date Assigned </th>
              <th> Unit </th>
              <th> Lesson </th>
              <th> Date Due </th>
              <th> Number of Prompts </th>
              <th> Number of Prompts to Meet Completion Criterion </th>
              <th> Number of Students Completed </th>
              <th> Delete Assignment </th>
              <th> Edit Assignment </th>
            </tr>
          </thead>
          { this.state.assignments.map((assignment, index) => {
            return <CohortShowAssignment onUpdate={this.getAssignments} data={assignment} key={index}/>
          })}
        </table>
      }
      </div>
    )
  }
}
