class LoadingPage extends React.Component {
  render() {
    return(
      <div ref="loadingGif" className="loading-container">
        <h2> Accessing your information... </h2>
        <img src='../assets/loading_gif.gif' />
      </div>
    )
  }
}
