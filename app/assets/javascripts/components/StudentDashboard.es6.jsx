class StudentDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      student: null,
      assignmentTablesVisible: false
    }
  }
  render() {
    return(
      <div className="container">
        <h1> Welcome! </h1>
          { assignmentTablesVisible ?
            <div className="past-due-assignments"
              <h2> Past-Due Assignments </h2>
              <table className="table table-hover table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th>Date Assigned</th>
                    <th>Unit</th>
                    <th>Lesson</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="active-assignments">
            <h2> Active Assignments </h2>
              <table className="table table-hover table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th>Date Assigned</th>
                    <th>Unit</th>
                    <th>Lesson</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="completed-assignments">
              <h2> Completed Assignments </h2>
              <table className="table table-hover table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th> Date Assigned </th>
                    <th> Unit </th>
                    <th> Lesson </th>
                    <th> Score </th>
                    <th> Completion Date </th>
                  </tr>
                </thead>
              </table>
            </div>
            : <br /> }
          <div className="past-practice-lessons">
            <h2> Past Practice Lessons </h2>
            <table className="table table-hover table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th> Unit </th>
                  <th> Lesson </th>
                </tr>
              </thead>
            </table>
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
