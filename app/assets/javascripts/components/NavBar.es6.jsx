class NavBar extends React.Component{


  render(){
    return(
      <nav className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <ul className="nav navbar-nav navbar-left">
              <a href="/"><img id="brand-logo" src="/assets/test_logo_1.png"/></a>
            </ul>
          </div>
       { this.props.currentUser ?
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                  <form  method="post" action="/users/sign_out">
                    <input id="logoutButton" type="Submit" value="Log Out"/>
                    <input type="hidden" name="_method" value="Delete"/>
                  </form>
                </li>
              </ul>
            </div>
          :
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
             <ul className="nav navbar-nav navbar-right">
                <li><a href='/users/sign_up'>Register</a></li>
                <li><a href='/users/sign_in'>Sign In</a></li>
              </ul>
            </div>
        }
      </nav>
    )
  }
}
