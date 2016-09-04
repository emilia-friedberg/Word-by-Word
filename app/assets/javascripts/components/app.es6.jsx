class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar currentUser={this.props.currentUser}/>
        <HomeInfo/>
        <p>this is the home app component</p>
        <Footer/>
      </div>
    )
  }
}
