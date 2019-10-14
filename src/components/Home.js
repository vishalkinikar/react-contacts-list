import * as React from 'react';
import axios from 'axios';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] }
  }

  componentDidMount() {
    axios.get(`http://localhost:2828/contacts`).then(data => {
      this.setState({ contacts: data.data })
    })
  }

  deleteContact(id) {
    axios.delete(`http://localhost:2828/contacts/${id}`).then(data => {
      const index = this.state.contacts.findIndex(contact => contact.id === id);
      this.state.contacts.splice(index, 1);
      this.props.history.push('/');
    })
  }

  render() {
    const contacts = this.state.contacts;
    return (
        <div>
          {contacts.length === 0 && (
            <div className="text-center">
              <h2>No contacts found at the moment</h2>
            </div>
          )}

          <div className="container">
            <div className="row">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Gender</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Address</th>
                      <th scope="col">Notes</th>
                      <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts && contacts.map(contact =>
                    <tr key={contact.id}>
                        <td>{contact.first_name}</td>
                        <td>{contact.last_name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.gender}</td>
                        <td>{contact.state}</td>
                        <td>{contact.city}</td>
                        <td>{contact.address}</td>
                        <td>{contact.notes}</td>
                        <td>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteContact(contact.id)}>Delete Contact</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
    )
  }
}