import React from 'react'

const PersonForm = props => (
  <form onSubmit={props.addPerson}>
    <div>
      nimi: 
      <input
        value={props.newName}
        onChange={props.handleNameChange}
      />
    </div>
    <div
      >numero:
      <input
        value={props.newPhone}
        onChange={props.handlePhoneChange}
      />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

export default PersonForm