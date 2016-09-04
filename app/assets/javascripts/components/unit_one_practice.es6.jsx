class UnitOnePractice extends React.Component {

  constructor() {
    super();
    this.state = {
      beingDragged: <div>init</div>,
      sentence: ['the', 'dog', 'jumps'],
      subjects: ['dog'],
      verbs: ['jumps'],
      allCorrect: false,
      subjectsCorrect: false,
      verbsCorrect: false
    }
    this.dropIn1 = this.dropIn1.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.dropIn2 = this.dropIn2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  dragStart(ev) {
    // debugger;
    this.setState({
      beingDragged: ev.target
    })
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dropIn1(ev) {
      ev.preventDefault();
      ev.target.appendChild(this.state.beingDragged)
  }

  dropIn2(ev) {
      ev.preventDefault();
      ev.target.appendChild(this.state.beingDragged)
  }

  handleSubmit(event) {
    event.preventDefault();
    var wordsInSubjectBox = Array.from(this.refs.subjectBox.children).map(function(element) {
      return element.innerText
    })
    var wordsInVerbBox = Array.from(this.refs.verbBox.children).map(function(element) {
      return element.innerText
    })
    $.post('/unit1/lesson1/feedback', {subjects: wordsInSubjectBox, verbs: wordsInVerbBox}).done((response)=> {
      console.log(response)
    })

    if (wordsInVerbBox.sort().join() === this.state.verbs.sort().join() && wordsInSubjectBox.sort().join() === this.state.subjects.sort().join()) {
      this.setState({ allCorrect: true, subjectsCorrect: true, verbsCorrect: true })
    }
    else if (wordsInSubjectBox.sort().join() === this.state.subjects.sort().join()) {
      this.setState({subjectsCorrect: true})}
    else if (wordsInVerbBox.sort().join() === this.state.verbs.sort().join()) {
      this.setState({verbsCorrect: true}) }

    this.setState({ displayFeedback: true })
  }

  render() {
    return (
      <div> { this.state.displayFeedback ?
          <div id="feedback"> { this.state.allCorrect ?
                  <div id="allRight"> you got it!!! </div>
                : <div> So close! View your feedback below  </div>
              }
              { this.state.subjectsCorrect ?
                  <div> You got all the subjects correct </div>
                : <div>
                      Your subject box wasn't quite right. { this.refs.subjectBox.children.length > 0 ?
                      <div> You included {Array.from(this.refs.subjectBox.children).map(function(worddiv) {
                      return <div> {worddiv.innerText} </div>
                    })} </div> :  <div> </div> }

                    The correct contents were {this.state.subjects.map(function(word) {
                      return <div> {word} </div>
                    })}
                  </div>
              }
              { this.state.verbsCorrect ?
                  <div> you got all the verbs correct </div>
                : <div>
                    Your verb box wasn't quite right. { this.refs.verbBox.children.length  ? <div> You included {Array.from(this.refs.verbBox.children).map(function(word) {
                      return <div> {word.innerText} </div>
                    })} </div> :  <div> </div> }

                    The correct contents were {this.state.verbs.map(function(word) {
                      return <div> {word} </div>
                    })}
                  </div>
              }
          </div>

        : <div id="problemContainer">
            <div id="wordBox">
              <div id="submitContainer" >
                <a href="/submit" onClick={this.handleSubmit}> submit </a>
              </div>
              {this.state.sentence.map( (word, i) => {
                return <Word key= { i } dragFunction={ this.dragStart } word={ word } />
              })}
            </div>

          <div id='boxContainer'>
            <div ref="subjectBox" id="dropBox1" className="dropBoxes" onDrop={this.dropIn1} onDragOver={this.allowDrop} />
            <div ref="verbBox" id="dropBox2" className="dropBoxes" onDrop={this.dropIn2} onDragOver={this.allowDrop} />
          </div>
        </div>
      }
      </div>
    )
  }
}
