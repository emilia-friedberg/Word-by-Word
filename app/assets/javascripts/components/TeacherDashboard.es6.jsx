class TeacherDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      teacher: {},
      teacherHasCohorts: false,
      teacherCohorts: [],
      lessons: [],
      addCohortButtonVisible: true,
      addAssignmentButtonVisible: true,
      addExistingCohortFormVisible: false,
      addNewCohortFormVisible: false,
      addAssignmentFormVisible: false,
      addCohortOptionVisible: false
    }
    this.showAddCohortButton = this.showAddCohortButton.bind(this);
    this.showAddAssignmentButton = this.showAddAssignmentButton.bind(this);
    this.hideAddCohortButton = this.hideAddCohortButton.bind(this);
    this.hideAddAssignmentButton = this.hideAddAssignmentButton.bind(this);
    this.toggleAddAssignmentForm = this.toggleAddAssignmentForm.bind(this);
    this.toggleAddCohortOption = this.toggleAddCohortOption.bind(this);
    this.toggleAddExistingCohortForm = this.toggleAddExistingCohortForm.bind(this);
    this.toggleAddNewCohortForm = this.toggleAddNewCohortForm.bind(this);
    this.handleExistingCohortFormSubmit = this.handleExistingCohortFormSubmit.bind(this);
    this.handleNewCohortFormSubmit = this.handleNewCohortFormSubmit.bind(this);
    this.handleAssignmentFormSubmit = this.handleAssignmentFormSubmit.bind(this);

  }

  hideAddCohortButton() {
    this.setState({
      addCohortButtonVisible: false
    })
  }

  hideAddAssignmentButton() {
    this.setState({
      addAssignmentButtonVisible: false
    })
  }

  showAddCohortButton() {
    this.setState({
      addCohortButtonVisible: true
    })
  }

  showAddAssignmentButton() {
    this.setState({
      addAssignmentButtonVisible: true
    })
  }


  toggleAddCohortOption() {
    this.hideAddCohortButton()
    this.setState({
      addCohortOptionVisible: !this.state.addCohortOptionVisible
    })
  }

  toggleAddExistingCohortForm() {
    this.toggleAddCohortOption()
    this.setState({
      addExistingCohortFormVisible: !this.state.addExistingCohortFormVisible
    })
  }

  toggleAddNewCohortForm() {
    this.toggleAddCohortOption()
    this.setState({
      addNewCohortFormVisible: !this.state.addNewCohortFormVisible
    })
  }

  toggleAddAssignmentForm() {
    this.hideAddAssignmentButton()
    this.setState({
      addAssignmentFormVisible: !this.state.addAssignmentFormVisible
    })
  }

  handleExistingCohortFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: `/teachers/${this.props.teacherId}/cohorts`,
      data: $(event.target).serialize()
    }).done(function(response) {
      location.reload()
    })
  }

  handleNewCohortFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: "/cohorts",
      data: $(event.target).serialize()
    }).done(function(response) {
      location.reload()
    })
  }

  handleAssignmentFormSubmit(event) {
    event.preventDefault();
    $.post('/assignments', {
      lesson: this.refs.lessonInput.value,
      cohort: this.refs.cohortInput.value,
      completion_number: this.refs.completionNumber.value,
      due_date: this.refs.dueDate.value
    }).done(function(response) {
      this.refs.completionNumber.value = ''
      this.refs.dueDate.value = ''
      this.toggleAddAssignmentForm()
      this.showAddAssignmentButton()
    }.bind(this))
  }



  componentDidMount() {
    $.ajax({
      method: 'get',
      url: `/teachers/${this.props.teacherId}/info`
    }).done(function(response) {
      this.setState({
        teacher: response.teacher,
        teacherHasCohorts: response.teacherHasCohorts,
        teacherCohorts: response.teacherCohorts,
        lessons: response.lessons
      })
    }.bind(this));
  }

  render () {
    return (
    <div className="show-page-container">
      <TopicList />
      <div className="show-page-body">
        <h1> Welcome, {this.state.teacher.first_name} {this.state.teacher.last_name}</h1>
          <button className="btn btn-info primary-button" type="button" onClick={this.toggleAddCohortOption}>Add A Cohort</button>
          <button className="btn btn-info primary-button" type="button" onClick={this.toggleAddAssignmentForm}>Add A New Assignment</button>
        { this.state.addAssignmentFormVisible ?
          <form onSubmit={this.handleAssignmentFormSubmit}>
            <label htmlFor="cohort[name]">Cohort:</label>
            <select ref="cohortInput">
            { this.state.teacherCohorts.map((cohort, index) => {
              return (
                <option name="cohort[name]"> {cohort.name} </option>
              )
            })}
            </select>
            <label htmlFor="lesson[name]">Lesson:</label>
              <select ref="lessonInput">
              { this.state.lessons.map((lesson, index) => {
                return (
                  <option name="lesson[name]"> {lesson.name} </option>
                )
              })}
              </select>
            <label htmlFor="assignment[due_date]">Due Date:</label>
            <input ref="dueDate" type="datetime-local" name="assignment[due_date]" id="assignmentDueDate"/>
            <label htmlFor="assignment[completion_number]">Number of Prompts to Attempt:</label>
            <input type="number" ref="completionNumber" name="assignment[completion_number]" id="assignmentCompletionNumber" />
            <input type="submit" value="Submit" className="form-input btn btn-info" />
          </form>
          : null
        }
        { this.state.addCohortOptionVisible ?
          <div className="add-cohort-option-div">
            <button className="btn btn-info" type="button" onClick={this.toggleAddExistingCohortForm}>Existing Cohort</button>
            <button className="btn btn-info" type="button" onClick={this.toggleAddNewCohortForm}>Create New Cohort</button>
          </div>
          : null
        }
        { this.state.addExistingCohortFormVisible ?
          <form onSubmit={this.handleExistingCohortFormSubmit}>
            <label htmlFor="cohort[access_code]">Access Code:</label>
            <input type="text" name="cohort[access_code]" id="cohortAccessCode"/>
            <input type="submit" value="Submit" className="btn btn-info form-input" />
          </form>
          : null
        }
        { this.state.addNewCohortFormVisible ?
          <form onSubmit={this.handleNewCohortFormSubmit}>
            <label htmlFor="cohort[name]">Name:</label>
            <input type="text" name="cohort[name]" id="cohortName"/>
            <input type="hidden" name="teacher[id]" value={this.props.teacherId}/>
            <input type="submit" value="Submit" className="btn btn-info form-input" />
          </form>
          : null
        }
        <h2> Cohorts </h2>
        { this.state.teacherCohorts.length > 0 ?
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
            var link = "/cohorts/"
            return (
              <tr>
                <td> <a href={link.concat(cohort.id)}> {cohort.name} </a> </td>
                <td> {cohort.size} </td>
                <td> {cohort.number_of_students_with_overdue_assignments} </td>
                <td> {cohort.access_code} </td>
              </tr>
            )
          })}
        </table>
      : <p> You do not currently have any cohorts. </p>}
      </div>
    </div>
    )
  }
}
