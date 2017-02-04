import React, { Component } from 'react'
import { Header, Form, Button, Segment } from 'semantic-ui-react'
import moment from 'moment'
import 'whatwg-fetch'
import { backend } from './config'

class RegisterClaim extends Component {

  state = {
    dateOfIncident: moment().format('YYYY-MM-DD'),
    amount: 2000,
    loading: false,
    claim: undefined,
    evidence: "",
  }

  handleRegisterClaim = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const {
      dateOfIncident,
      amount,
    } = this.state

    fetch(`${backend}/claims`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateOfIncident,
        amount,
      })
    }).then(
      response => {
        this.setState({loading: false})
        return response.json().then(json =>
          this.setState({claim: json})
        )
      }
    )
  }

  handleAddEvidence = (event) => {
    event.preventDefault()
    this.setState({loading: true})

    fetch(`${backend}/claims/${this.state.claim.id}/evidence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        evidence: this.state.evidence
      })
    }).then(
      response => {
        this.setState({loading: false})
        return response.json().then(json =>
          this.setState({claim: json, evidence: ''})
        )
      }
    )
  }

  render() {
    const {
      dateOfIncident,
      amount,
      loading,
      claim,
      evidence,
    } = this.state
    return (
      <div>
        <Header as='h3'>Register a new insurance claim:</Header>
        <Segment>
          <Form onSubmit={this.handleRegisterClaim}>
            <Form.Input
              label='Date of the incident'
              name='dateOfIncident'
              placeholder='Date'
              value={dateOfIncident}
              onChange={({target: {value : dateOfIncident}}) => this.setState({dateOfIncident})}/>
            <Form.Input
              label='Amount'
              name='amount'
              placeholder='Amount'
              value={amount}
              onChange={({target: {value : amount}}) => this.setState({amount})}/>
            <Button
              type='submit'
              loading={loading}
              disabled={!(dateOfIncident && amount)}>
              Register Claim
            </Button>
          </Form>
        </Segment>
        {claim &&
          <Segment>
            <pre>
              Claim ID: {claim.id}<br/>
              Date: {claim.dateOfIncident}<br/>
              Amount: {claim.amount}<br/>
              {claim.evidence.length > 0 &&
                 <div>
                    Evidence:
                      <ul>
                        {claim.evidence.map(({description}, index) =>
                          <li key={index}>{description}</li>)
                        }
                      </ul>
                 </div>
              }
            </pre>
            <Form onSubmit={this.handleAddEvidence}>
              <Form.Input
                label='Add some evidence to your claim:'
                name='evidence'
                value={evidence}
                onChange={({target: {value : evidence}}) => this.setState({evidence})}/>
              <Button
                type='submit'
                loading={loading}
                disabled={!(evidence)}>
                Add Evidence
              </Button>
            </Form>
          </Segment>
        }
      </div>
    )
  }
}

export default RegisterClaim
