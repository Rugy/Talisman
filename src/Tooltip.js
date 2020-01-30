import React, { Component } from 'react'

class Tooltip extends Component {
  render() {
    const getItemStats = () => {
      if (this.props.item == null || this.props.item === {} || this.props.item.itemType === "") {
        return ""
      }

      let item = []
      let key = 0;

      item.push(
        <div key={key} id="tooltip-item-name">
          {this.props.item.itemType}
        </div>
      )

      for (let bonus in this.props.item.boni) {
        key++
        item.push(
          <div className="tooltip-item-stat" key={key}>{bonus}: {this.props.item.boni[bonus]}</div>
        )
      }
      return item
    }

    return (
      <div id="tooltip">{getItemStats()}</div>
    )
  }
}

export default Tooltip
