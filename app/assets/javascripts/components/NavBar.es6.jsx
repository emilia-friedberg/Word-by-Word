class NavBar extends React.Component{


  render(){
    return(
      <nav className="navbar">
        { this.props.currentUser ?
        <ul>
          <li>
              <form  method="post" action="/users/sign_out">
                <input id="logoutButton" type="Submit" value="Log Out"/>
                <input type="hidden" name="_method" value="Delete"/>
              </form>
          </li>
          <li><a href='/'>Home</a></li>
        </ul>
        :
        <ul>
          <li><a href='/users/sign_in'>Sign In</a></li>
          <li><a href='/users/sign_up'>Register</a></li>
          <li><a href='/'>Home</a></li>
        </ul>
      }
      </nav>
    )
  }
}
