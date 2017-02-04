import React, { Component } from 'react'
import { Container, Header, Menu } from 'semantic-ui-react'
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <Container style={{paddingTop: '2em'}} text>
        <Menu>
          <Menu.Item header>PremierQuotes</Menu.Item>
          <Menu.Item as={Link} to='/' name='Register Claim' />
          <Menu.Item as={Link} to='/claims' name='List Claims' />
          <Menu.Item as={Link} to='/riskreport' name='Risk Report' />
        </Menu>
        <Header as="h1">Claim Management</Header>
        {this.props.children}
      </Container>
    )
  }
}

export default App
