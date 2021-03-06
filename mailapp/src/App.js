import React from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AllMessagesList from './pages/AllMessagesList';
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import MessageDetail from './pages/MessageDetail'
import ComposeMessage from './pages/ComposeMessage'
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default class App extends React.Component {
  state = {
    messages: [],
    count: 0
  }

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.loadList = this.loadList.bind(this)
  }

  onDelete(e) {
    this.loadList();
  }

  loadList() {
    axios.get(`http://mailhog.api.local:8025/api/v2/messages`)
      .then(res => {
        const messages = res.data.items;
        const count = res.data.count;
        this.setState({ messages, count });
      })
  }

  componentDidMount() {
    this.loadList();
  }

  render() {

    return (
      <Router>
        <PrimarySearchAppBar mailCount={this.state.count} />
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/all">All</Link>
            </li>
            <li>
              <Link to="/compose">Compose</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/all">
              <AllMessagesList messages={this.state.messages} onDelete={this.onDelete} />
            </Route>

            <Route exact path="/message/:id" component={MessageDetail} />

            <Route path="/compose">
              <ComposeMessage />
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
