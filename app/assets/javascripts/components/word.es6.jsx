class Word extends React.Component {

  componentDidMount() {
    // debugger;
  }
  render()  {
    return (
      <div className="draggable" draggable="true" onDragStart={this.props.dragFunction} > {this.props.word} </div>
    )
  }
}
