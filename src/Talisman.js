import React, { Component } from 'react'
import TalismanSlot from './TalismanSlot'
import RunewordList from './RunewordList'

class Talisman extends Component {
  createTalismanSlots = (amount, slotCounter, row) => {
    let slots = []

    for (let i = 0; i < amount; i++) {
      slots.push(<TalismanSlot slotId={slotCounter.count}
        slotX={i + (5 - amount) / 2} slotY={row} key={slotCounter.count}
        item={this.props.talismanItems[slotCounter.count++]} setDragData={this.props.setDragData}
        setDragTarget={this.props.setDragTarget} dragLeave={this.props.dragLeave}
        endDrag={this.props.endDrag} setHoverData={this.props.setHoverData} />)
    }

    return slots
  }

  render() {
    let slotCounter = {count: 0}

    return (
      <div id="talisman">
        <div className="talisman-row">
          {this.createTalismanSlots(1, slotCounter, 0)}
        </div>
        <div className="talisman-row">
          {this.createTalismanSlots(3, slotCounter, 1)}
        </div>
        <div className="talisman-row">
          {this.createTalismanSlots(5, slotCounter, 2)}
        </div>
        <div className="talisman-row">
          {this.createTalismanSlots(3, slotCounter, 3)}
        </div>
        <div className="talisman-row">
          {this.createTalismanSlots(1, slotCounter, 4)}
        </div>
        <RunewordList runewords={this.props.runewords} />
      </div>
    )
  }
}

export default Talisman
