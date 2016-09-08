class PracticeOneOne extends React.Component {
  constructor() {
    super();
    this.state = {
      beingDragged: <div> ***This takes a component***</div>,
      sentence: [],
      subjects: [],
      nextSet: {},
      allCorrect: false,
      subjectsCorrect: false,
      displayFeedback: false,
      subjectPromptId: 0,
      streak: 0,
      totalCorrect: 0,
      totalAttempts: 0
    }
    this.dropIn1 = this.dropIn1.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.replaceWord = this.replaceWord.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.loadNext = this.loadNext.bind(this)
    // this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }

  componentDidMount() {
    $.get('/1/UnitOneSentence').done((response)=> {
      this.setState({
        sentence: response.sentence,
        subjects: response.subjects,
        subjectPromptId: response.subject_prompt_id,
      })
    })
    $.get('/1/UnitOneSentence').done((response) => {
      this.setState({nextSet: response})
    })
  }

  componentWillUpdate() {
    var streakURL = `/units/${this.props.unitId}/lessons/${this.props.lessonId}/attempts/streak`
    $.get(streakURL).done((response) => {
      if (this.state.totalAttempts != response.totalAttempts) {
        this.setState({streak: response.streak, totalCorrect: response.totalCorrect, totalAttempts: response.totalAttempts})
      }
    })
  }

  loadNext(ev) {
    ev.preventDefault();
    this.setState({
      sentence: this.state.nextSet.sentence,
      verbs: this.state.nextSet.verbs,
      subjects: this.state.nextSet.subjects,
      obejcts: this.state.nextSet.objects,
      verbPromptId: this.state.nextSet.verb_prompt_id,
      subjectPromptId: this.state.nextSet.subject_prompt_id,
      objecPromptId: this.state.nextSet.object_prompt_id,
      allCorrect: false,
      subjectsCorrect: false,
      verbsCorrect: false,
      displayFeedback: false
    })
    $.get('/1/UnitOneSentence').done((response)=> {
      this.setState({nextSet: response})
    })
    this.refs.subjectBox.innerHTML = "";
  }


  replaceWord(ev) {
    if (this.state.beingDragged.innerText === ev.target.innerText) {
      ev.preventDefault();
      var dragged = this.state.beingDragged
      dragged.className = "draggable"
      ev.target.appendChild(dragged)
    }
  }

  dragStart(ev) {
    this.setState({
      beingDragged: ev.target
    })
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dropIn1(ev) {
    ev.preventDefault();
    var dragged = this.state.beingDragged
    dragged.className = "inBox"
    ev.target.appendChild(dragged)
  }


  handleSubmit(event) {
    event.preventDefault();
    var wordsInSubjectBox = Array.from(this.refs.subjectBox.children).map(function(element) {
      return element.innerText
    })
    var instantFeedback = {subjects: false}
    if (wordsInSubjectBox.sort().join() === this.state.subjects.sort().join()) {
      this.setState({subjectsCorrect: true, allCorrect: true})
      instantFeedback.subjects = true
    }
    if (this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts',
          {attempts: {
              subjects: {
                correct: instantFeedback.subjects,
                prompt_id: this.state.subjectPromptId
                        }
                      }
            }
        )
    }
    this.setState({ displayFeedback: true })
  }
  render() {
    return (
      <div>
        { this.state.displayFeedback ?
          <div id="feedback"> { this.state.allCorrect ?
              <div id="allRight"> you got it!!! </div>
              : <div> So close! View your feedback below  </div>
          }
          { this.state.subjectsCorrect ?
            <div className="feedbackMsg"> You got all the subjects correct </div>
            : <div>
            Your subject box wasn't quite right. { this.refs.subjectBox.children.length > 0 ?
            <div> You included {Array.from(this.refs.subjectBox.children).map(function(worddiv) {
                return <div className="littleFeedbackWord"> {worddiv.innerText} </div>
              })} </div> :  <div> </div> }

              The correct contents were {this.state.subjects.map(function(word) {
                return <div className="littleFeedbackWord"> {word} </div>
              })}
            </div>
          }

      </div>

      : <div id="openingPrompt"> Find the Subjects in the sentence below </div>
  }
        <div id="problemContainer">
          <div id='boxContainer'>
            <div className='boxHeader'>Subjects</div>
            <div ref="subjectBox" id="dropBox1" className="dropBoxes" onDrop={this.dropIn1} onDragOver={this.allowDrop}>
            </div>
          </div>
          <StatusBar streak={this.state.streak} totalCorrect={this.state.totalCorrect} totalAttempts={this.state.totalAttempts} />
          <Glossary />
        </div>
        {this.state.allCorrect ?
          <div id="proceedeMsg"> <a onClick={this.loadNext} href="/next"> go on to the next question! </a></div>
          :
          <div id="wordBox">
            <div id="promptWrap">
              Drag the subject(s) into the subject box, and drag the verb(s) into the verb box.
            </div>
            <div id="sentenceWrap">
              <h3 className="sentence"> Sentence: <em>"{ this.state.sentence.join(" ") }"</em></h3>
            </div>
            <div id="submitContainer" >
              <a href="/submit" onClick={this.handleSubmit}> submit </a>
            </div>
            {this.state.sentence.map( (word, i) => {
              return <Word key= { i } dragFunction={ this.dragStart } allowDrop={this.allowDrop} reDrop={this.replaceWord} word={ word } />
            })}
          </div>
      }
      </div>
    )
  }
}
