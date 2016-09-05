class CohortShowAssignment extends React.Component {
  constructor() {
    super();
    this.state = {
      editable: false
    };
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.toggleEditable = this.toggleEditable.bind(this);
    this.editAssignment = this.editAssignment.bind(this);
  }

  deleteAssignment(event) {
    var assignmentId = event.target.closest('tr').id
    $.ajax({
      method: 'delete',
      url: `/assignments/${assignmentId}`
    }).done(function(response) {
      this.props.onUpdate();
    }.bind(this))
  }

  toggleEditable() {
    this.setState({
      editable: !this.state.editable
    })
  }

  editAssignment(event) {
    var assignmentId = event.target.closest('tr').id
    var completionNumber = this.refs.completionNumber.value
    var dueDate = this.refs.dueDate.value
    $.ajax({
      method: 'put',
      url: `/assignments/${assignmentId}`,
      data: {
        completion_number: completionNumber,
        due_date: dueDate
      }
    }).done(function(response) {
      this.toggleEditable()
      this.props.onUpdate();
    }.bind(this))
  }



  render() {
    var assignment = this.props.data;
    return (
      <tbody>
      { this.state.editable ?
        <tr id={assignment.id}>
          <td> {assignment.created_at} </td>
          <td> {assignment.unit_id} </td>
          <td> {assignment.lesson_id} - {assignment.lesson_name} </td>
          <td> <input type="datetime" ref="dueDate" defaultValue={assignment.due_date} name="assignment[due_date]"/> </td>
          <td> {assignment.number_of_prompts} </td>
          <td> <input type="integer" ref="completionNumber" defaultValue={assignment.completion_number} name="assignment[completion_number]" /> </td>
          <td> {assignment.number_of_students_completed} </td>
          <td> <button type="button" onClick={this.deleteAssignment}>Delete</button></td>
          <td> <button type="button" onClick={this.editAssignment}>Submit Edits</button></td>
        </tr>
      :
      <tr id={assignment.id}>
        <td> {assignment.created_at} </td>
        <td> {assignment.unit_id} </td>
        <td> {assignment.lesson_id} - {assignment.lesson_name} </td>
        <td ref="dueDate"> {assignment.due_date} </td>
        <td> {assignment.number_of_prompts} </td>
        <td ref="completionNumber"> {assignment.completion_number} </td>
        <td> {assignment.number_of_students_completed} </td>
        <td> <button type="button" onClick={this.deleteAssignment}>Delete</button></td>
        <td> <button type="button" onClick={this.toggleEditable}>Edit</button></td>
      </tr>
    }
    </tbody>
    )
  }
}
