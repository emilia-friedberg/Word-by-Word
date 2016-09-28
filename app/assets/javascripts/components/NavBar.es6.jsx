class NavBar extends React.Component{

  render(){
    return(
      <nav id="nb" className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="navbar-buttons"><a className="navbar-links" href="/dashboard">My Dashboard</a></li>
              <li className="navbar-buttons">
                  <form method="post" action="/users/sign_out">
                    <input className="navbar-links" type="Submit" value="Log Out"/>
                    <input type="hidden" name="_method" value="Delete"/>
                  </form>
                </li>
              </ul>
            </div>
      </nav>
    )
  }
}
