class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar currentUser={this.props.currentUser}/>
        <p>this is the home app component</p>
      </div>
    )
  }
}
