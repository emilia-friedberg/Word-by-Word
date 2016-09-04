class StudentDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      student: {},
      studentBelongsToCohort: false,
      studentCohorts: [],
      pendingAssignments: [],
      pastDueAssignments: [],
      completedAssignments: [],
      attemptedLessons: []
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/info`
    }).done(function(response) {
      this.setState({
        student: response.student,
        studentBelongsToCohort: response.studentBelongsToCohort,
        studentCohorts: response.studentCohorts,
        pendingAssignments: response.pendingAssignments,
        pastDueAssignments: response.pastDueAssignments,
        completedAssignments: response.completedAssignments,
        attemptedLessons: response.attemptedLessons
      })
    }.bind(this))
  }
  render() {
    return(
      <div className="container">
        <h1> Welcome </h1>
          { this.state.studentBelongsToCohort ?
            <div>

              <div className="past-due-assignments">
                <h2> Past-Due Assignments </h2>
                { this.state.pastDueAssignments.length < 1 ?
                  <p> You have no past-due assignments. </p>
                  :
                <table className="table table-hover table-responsive">
                  <thead className="thead-inverse">
                    <tr>
                      <th>Date Assigned</th>
                      <th>Unit</th>
                      <th>Lesson</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  { this.state.pastDueAssignments.map((assignment, index) => {
                    return (
                      <tr>
                        <td> {assignment.created_at}</td>
                        <td> {assignment.unit_id} </td>
                        <td> {assignment.lesson_id} - {assignment.lesson_name} </td>
                        <td> {assignment.due_date} </td>
                      </tr>
                    )
                  })}
                </table>
              }
              </div>

              <div className="active-assignments">
              <h2> Active Assignments </h2>
              { this.state.pendingAssignments.length < 1 ?
                <p> You have no active assignments. </p>
                :

                <table className="table table-hover table-responsive">
                  <thead className="thead-inverse">
                    <tr>
                      <th>Date Assigned</th>
                      <th>Unit</th>
                      <th>Lesson</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  { this.state.pendingAssignments.map((assignment, index) => {
                    return (
                      <tr>
                        <td> {assignment.created_at}</td>
                        <td> {assignment.unit_id} </td>
                        <td> {assignment.lesson_id} - {assignment.lesson_name} </td>                        <td> {assignment.due_date} </td>
                      </tr>
                    )
                  })}
                </table>
              }
              </div>
              <div className="completed-assignments">
                <h2> Completed Assignments </h2>
                { this.state.completedAssignments.length < 1 ?
                  <p> You have no completed assignments. </p>
                  :
                <table className="table table-hover table-responsive">
                  <thead className="thead-inverse">
                    <tr>
                      <th> Date Assigned </th>
                      <th> Unit </th>
                      <th> Lesson </th>
                      <th> Score </th>
                    </tr>
                  </thead>
                  { this.state.completedAssignments.map((assignment, index) => {
                    return (
                      <tr>
                        <td> {assignment.created_at}</td>
                        <td> {assignment.unit_id} </td>
                        <td> {assignment.lesson_id} - {assignment.lesson_name} </td>                        <td> {assignment.score} </td>
                      </tr>
                    )
                  })}
                </table>
              }
              </div>
            </div>
            : <br /> }
          <div className="past-practice-lessons">
            <h2> Past Practice Lessons </h2>
            { this.state.attemptedLessons.length < 1 ?
              <p> You have no past practice lessons. </p>
              :
            <table className="table table-hover table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th> Unit </th>
                  <th> Lesson </th>
                </tr>
              </thead>
              { this.state.attemptedLessons.map((lesson, index) => {
                return (
                  <tr>
                    <td> {lesson.unit_id} </td>
                    <td> {lesson.lesson_id} - {lesson.lesson_name} </td>                        <td> {assignment.due_date} </td>
                  </tr>
                )
              })}
            </table>
            }
          </div>
          <div className="mastered-topics">
            <h2> Mastered Topics </h2>
            <table className="table table-hover table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th>Unit</th>
                  <th>Lesson</th>
                  <th>Score</th>
                </tr>
              </thead>
            </table>
          </div>
      </div>
    )
  }
}
