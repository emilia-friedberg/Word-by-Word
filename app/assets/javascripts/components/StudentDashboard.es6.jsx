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
      attemptedLessons: [],
      masteredLessons: [],
      cohortFormVisible: false
    }
    this.toggleAddCohortForm = this.toggleAddCohortForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewMasteredTopics = this.viewMasteredTopics.bind(this);
    this.viewLateAssignments = this.viewLateAssignments.bind(this);
    this.viewPracticeLessons = this.viewPracticeLessons.bind(this);
    this.viewActiveAssignments = this.viewActiveAssignments.bind(this);
    this.viewCompletedAssignments = this.viewCompletedAssignments.bind(this)
  }

  viewCompletedAssignments() {
    this.refs.completedTab.className += "active"
    this.refs.completedAssignments.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.masteredTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.masteredTopics.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  viewActiveAssignments() {
    this.refs.activeTab.className += "active"
    this.refs.activeAssignments.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.masteredTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.masteredTopics.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  viewPracticeLessons() {
    this.refs.pastPracticeTab.className += "active"
    this.refs.pastPracticeLessons.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.masteredTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.masteredTopics.className = "tab-content"
  }

  viewMasteredTopics() {
    this.refs.masteredTab.className += "active"
    this.refs.masteredTopics.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  viewLateAssignments() {
    this.refs.pastDueTab.className += "active"
    this.refs.pastDueAssignments.className += "active"
    this.refs.masteredTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.masteredTopics.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
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
        attemptedLessons: response.attemptedLessons,
        masteredLessons: response.masteredLessons
      })
    }.bind(this))
  }

  toggleAddCohortForm() {
    this.setState({
      cohortFormVisible: !this.state.cohortFormVisible
    })
  }

  handleSubmit(event) {
    $.ajax({
      method: 'post',
      url: `/students/${this.props.studentId}/cohorts`,
      data: $(event.target).serialize()
    }).done(function(response) {
      location.reload()
    })
  }


  render() {
    return(
      <div className="container">
        <TopicList />
        <h1> Welcome, {this.state.student.first_name} {this.state.student.last_name}</h1>
          <button onClick={this.toggleAddCohortForm} type="button">Add Your Cohort</button>
          { this.state.cohortFormVisible ?
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="cohort[access_code]">Access Code:</label>
                <input type="text" name="cohort[access_code]" id="cohortAccessCode"/>
                <input type="submit" value="Submit" className="form-input" />
              </form>
            :
              null
          }

          <ul className="tabs">
            {this.state.studentBelongsToCohort ?
              <span>
                <li ref="pastDueTab" className="active"><a href="#pastdueassignments" onClick={this.viewLateAssignments}> Past Due Assignments</a></li>
                <li ref="activeTab"><a href="#activeassignments" onClick={this.viewActiveAssignments}>Active Assignments</a></li>
                <li ref="completedTab"><a href="#completedassignments" onClick={this.viewCompletedAssignments}>Completed Assignments</a></li>
              </span>
            : null}
              <span>
                <li ref="pastPracticeTab"><a href="#pastpracticelessons" onClick={this.viewPracticeLessons}> Past Practice Lessons</a></li>
                <li ref="masteredTab"><a href="#masteredtopics" onClick={this.viewMasteredTopics}>Mastered Topics</a></li>
              </span>
          </ul>
            <div>

              <div className="tab-content" ref="pastDueAssignments">
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

              <div className="tab-content" ref="activeAssignments">
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
              <div className="tab-content" ref="completedAssignments">
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
                        <td> {assignment.lesson_id} - {assignment.lesson_name} </td>
                        <td> {assignment.score} </td>
                      </tr>
                    )
                  })}
                </table>
              }
              </div>
            </div>
          <div className="tab-content" ref="pastPracticeLessons">
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
                    <td> {lesson.lesson_id} - {lesson.lesson_name} </td>
                  </tr>
                )
              })}
            </table>
            }
          </div>
          <div className="tab-content" ref="masteredTopics">
            <h2> Mastered Topics </h2>
            { this.state.masteredLessons.length < 1 ?
              <p> Answer ten questions in a row correctly to demonstrate your mastery of a topic. </p>
              :
            <table className="table table-hover table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th>Unit</th>
                  <th>Lesson</th>
                  <th>Score</th>
                </tr>
              </thead>
              { this.state.masteredLessons.map((lesson, index) => {
                return (
                  <tr>
                    <td> {lesson.unit_id} </td>
                    <td> {lesson.lesson_id} - {lesson.lesson_name} </td>
                    <td> {lesson.score} </td>
                  </tr>
                )
              })}

            </table>
          }
          </div>
      </div>
    )
  }
}
