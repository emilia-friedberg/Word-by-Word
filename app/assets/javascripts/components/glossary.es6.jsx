class Glossary extends React.Component {
  constructor() {
    super();
    this.state = {
      showGlossary: false
     }
    this.toggleGlossary = this.toggleGlossary.bind(this)
    this.showPage = this.showPage.bind(this)

  }

  toggleGlossary(ev, n) {
    if (this.state.showGlossary) {
      this.setState({showGlossary: false})
    }
    else {
      this.setState({showGlossary: true})
    }
  }

  showPage(ev) {
    ev.preventDefault()
    debugger;
    this.refs[ev.target.id].className = "activeGlossary"
  }



  render() {
    return (
      <div id="glossaryContainer">
      {this.state.showGlossary ?
        <div id="glossaryFill">
          <div id="backButton" className="glossaryButton" onClick={this.toggleGlossary}>
            Back!
          </div>
          <div id="helpPageContainer">
            <div ref="glossaryList" id="glossaryList" >
              <ul>
                <li id="1" onClick={this.showPage}> Sentences          </li>
                <li id="2" onClick={this.showPage}> Subjects and verbs </li>
                <li id="3" onClick={this.showPage}> Objects            </li>
              </ul>
            </div>
            <div id="glossaryShow">
              <GlossarySentences ref="1"/>
              <GlossarySubjects ref="2"/>
              <GlossaryObjects ref="3"/>
            </div>
          </div>
        </div>
      :
        <div className="glossaryButton" onClick={this.toggleGlossary}>
          Help!
        </div>
      }
      </div>
    )
  }
}
