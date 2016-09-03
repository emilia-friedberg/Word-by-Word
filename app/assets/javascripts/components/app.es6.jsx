class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar currentUser = {this.props.currentUser}/>
        <p>this is home app component</p>
      </div>
    )
  }
}
