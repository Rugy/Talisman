import React, { Component } from 'react'

class Runeword extends Component {
  getRuneword = () => {
    return this.props.runeword.join("+")
  }

  render() {
    return (
      <div className="runeword">{this.getRuneword()}</div>
    )
  }
}

export default Runeword
