import React, { Component } from 'react'
import Runeword from './Runeword'

class RunewordList extends Component {
  state = {

  }

  render() {
    const getGridItems = (runeword) => {
      let gridItems = []
      let positions = runeword.sequencePos.map(position => {
        return position.y * 3 + position.x
      })
      let sortedPos = positions.slice().sort()

      for (let i = 0, j = 0; i < 9; i++) {
        let isActive = false

        if (sortedPos[j] === i) {
          isActive = true
          j++
        }

        gridItems.push(<div key={i}
          className={"grid-item " + (isActive ? "grid-item-active" : "grid-item-inactive")}
        >{isActive ? positions.indexOf(i) + 1 : ""}</div>)
      }

      return gridItems
    }

    const getRunewords = () => {
      let rows = []

      for (let i = 0; i < this.props.runewords.length; i++) {
        rows.push(
          <tr key={i}>
            <td>
              <div className="grid-container">
                {getGridItems(this.props.runewords[i])}
              </div>
            </td>
            <td><Runeword runeword={this.props.runewords[i].sequence} /></td>
            <td>{this.props.runewords[i].occurences.length}</td>
          </tr>
        )
      }

      return rows
    }

    return (
      <div id="runeword-list">
        <table id="runewords-table">
          <thead>
            <tr>
              <th>Sequence</th>
              <th>Runeword</th>
              <th>Occurences</th>
            </tr>
          </thead>
          <tbody>
            {getRunewords()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RunewordList
