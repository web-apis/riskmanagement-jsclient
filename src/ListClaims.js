import React, { Component } from 'react'
import { Header, Table, Menu, Icon } from 'semantic-ui-react'
import 'whatwg-fetch'
import { backend } from './config'

class ListClaims extends Component {

  state = {
    claims: [],
  }

  componentDidMount() {
    this.loadClaims()
  }

  handlePreviousPage = (event) => {
    event.preventDefault()
    this.loadClaims(this.getLinkToPreviousPage().uri)
  }

  handleNextPage = (event) => {
    event.preventDefault()
    this.loadClaims(this.getLinkToNextPage().uri)
  }

  loadClaims = (page = `${backend}/claims`) => {
    this.setState({loading: true})
    fetch(page, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(
      response => {
        this.setState({loading: false})
        return response.json().then(json =>
          this.setState(json)
        )
      }
    )
  }

  getLinkToPreviousPage() {
    if(this.state.links) {
      return this.state.links.find(({rel}) => rel === 'prev')
    } else {
      return null
    }
  }

  getLinkToNextPage() {
    if(this.state.links) {
      return this.state.links.find(({rel}) => rel === 'next')
    } else {
      return null
    }
  }

  render() {
    const {
      claims,
      loading = true,
      limit = 0,
      offset = 0,
      size = 0,
    } = this.state

    return (
      <div>
        <Header as='h3'>
          { loading
            ? <span>Loading Claims...</span>
            : <span>Showing Claims {offset + 1} to {offset + limit} of {size}</span>
          }
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Evidence</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { claims.map(({id, dateOfIncident, amount, evidence}) =>
              <Table.Row key={id}>
                <Table.Cell>{dateOfIncident}</Table.Cell>
                <Table.Cell>{amount}</Table.Cell>
                <Table.Cell>{evidence.map(({description}) => description).join(', ')}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                { this.getLinkToPreviousPage() &&
                  <Menu.Item as='a' icon onClick={this.handlePreviousPage}>
                    <Icon name='left chevron' />
                  </Menu.Item>
                }
                { this.getLinkToNextPage() &&
                  <Menu.Item as='a' icon onClick={this.handleNextPage}>
                    <Icon name='right chevron' />
                  </Menu.Item>
                }
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }
}

export default ListClaims
