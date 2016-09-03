class NavBar extends React.Component{


  render(){
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
         <div className="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                 <span class="sr-only">Toggle navigation</span>
                 <span class="icon-bar"></span>
                 <span class="icon-bar"></span>
                 <span class="icon-bar"></span>
                </button>
              <a class="navbar-brand" href="/">Framework!</a>
            </div>
          { this.props.currentUser ?
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">About<span className="sr-only">(current)</span></a></li>
              <li>
                  <form  method="post" action="/users/sign_out">
                    <input id="logoutButton" type="Submit" value="Log Out"/>
                    <input type="hidden" name="_method" value="Delete"/>
                  </form>
              </li>
              <li><a href='/'>Home</a></li>
            </ul>
          </div>
          :
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href='/users/sign_in'>Sign In</a></li>
              <li><a href='/users/sign_up'>Register</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/'>Home</a></li>
            </ul>
          </div>
        }
        </div>
      </nav>
    )
  }
}
