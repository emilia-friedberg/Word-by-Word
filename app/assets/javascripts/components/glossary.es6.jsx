class Glossary extends React.Component {
  constructor() {
    super()
    this.state = { showGlossary: false }
    this.toggleGlossary = this.toggleGlossary.bind(this)
  }

  toggleGlossary() {
    if (this.state.showGlossary) {
      this.setState({showGlossary: false})
    }
    else {
      this.setState({showGlossary: true})
    }
  }


  render() {
    return (
      <div id="glossaryContainer">
      {this.state.showGlossary ?
        <div id="glossaryFill">
          <div id="backButton" className="glossaryButton" onClick={this.toggleGlossary}>
            Back!
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
