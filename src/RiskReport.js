import React, { Component } from 'react'
import { Header, Table,  Form } from 'semantic-ui-react'
import 'whatwg-fetch'
import { backend } from './config'

class ListClaims extends Component {

  state = {
    reportingYears: [],
    firstYear: 2017,
    noOfYears: 1,
  }

  componentDidMount() {
    this.fetchRiskReport()
  }

  handleFetchRiskReport = (event) => {
    event.preventDefault()
    this.fetchRiskReport()
  }

  fetchRiskReport = () => {
    this.setState({loading: true})
    const {
      firstYear,
      noOfYears,
    } = this.state
    fetch(`${backend}/riskreport?firstYear=${firstYear}&noOfYears=${noOfYears}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(
      response => {
        this.setState({loading: false})
        return response.json().then((reportingYears) =>
          this.setState({reportingYears})
        )
      }
    )
  }

  render() {
    const {
      reportingYears = [],
      loading = true,
    } = this.state

    return (
      <div>
        <Header as='h3'>
          { loading
            ? <span>Loading Risk Report...</span>
            : <span>Risk Report</span>
          }
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Policies</Table.HeaderCell>
              <Table.HeaderCell>Total Claim value</Table.HeaderCell>
              <Table.HeaderCell>Claims</Table.HeaderCell>
              <Table.HeaderCell>Total insured value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { reportingYears.map(({year, policyCount, totalClaimValue, claimCount, totalInsuredValue}) =>
              <Table.Row key={year}>
                <Table.Cell>{year}</Table.Cell>
                <Table.Cell>{policyCount}</Table.Cell>
                <Table.Cell>{totalClaimValue}</Table.Cell>
                <Table.Cell>{claimCount}</Table.Cell>
                <Table.Cell>{totalInsuredValue}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Form onSubmit={this.handleFetchRiskReport}>
          <Form.Group widths='equal'>
            <Form.Input
              label='First Year'
              name='firstYear'
              value={this.state.firstYear}
              onChange={({target: {value : firstYear}}) => this.setState({firstYear})}/>
            <Form.Input
              label='Number of Years'
              name='noOfYears'
              value={this.state.noOfYears}
              onChange={({target: {value : noOfYears}}) => this.setState({noOfYears})}/>
          </Form.Group>
          <Form.Button type='submit'>Update</Form.Button>
        </Form>
      </div>
    )
  }
}

export default ListClaims
