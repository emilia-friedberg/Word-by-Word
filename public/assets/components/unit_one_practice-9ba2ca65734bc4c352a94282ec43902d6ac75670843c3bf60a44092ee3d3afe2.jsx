class UnitOnePractice extends React.Component {

  constructor() {
    super();
    this.state = { shouldDisp: false, inSubjectBox: [], inVerbBox: [] }
    this.dropIn1 = this.dropIn1.bind(this)
    this.dragStart = this.dragStart.bind(this)
  }
  allowDrop(ev) {

    ev.preventDefault();

  }

  dragStart(ev) {
    this.setState({
      inSubjectBox: this.state.inSubjectBox.concat(ev.target.innerText) })
    ev.dataTransfer.setData("text", ev.target.id);
  }

  dropIn1(ev) {

      ev.preventDefault();
      this.setState({shouldDisp: true})
      console.log('was dropped in one')
      console.log(this.state)
      // var data = ev.dataTransfer.getData("text");
      // ev.target.appendChild(document.getElementById(data));
  }

  dropIn2(ev) {
      ev.preventDefault();
      console.log('was dropped in 2')
      var data = ev.dataTransfer.getData("text");
      // ev.target.appendChild(document.getElementById(data));
  }


  render() {
    return (
      <div>
        <div id='boxContainer'>
          <div id="div1" className="droppable" onDrop={this.dropIn1} onDragOver={this.allowDrop} >
            { this.state.shouldDisp ? this.state.inSubjectBox.map(function(word){
              return <div className='dragged'> { word } </div>
            }) :<div> otherwise</div>}
          </div>


          <div id="div2" className="droppable" onDrop={this.dropIn2} onDragOver={this.allowDrop} ></div>
        </div>

        <div className="dragged" draggable="true" onDragStart={this.dragStart} > DOG </div>
      </div>
    )
  }
}
