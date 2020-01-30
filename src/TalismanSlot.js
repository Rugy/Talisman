import React, { Component } from 'react'
import Item from './Item'

class TalismanSlot extends Component {
  state = {

  }

  dragEnter = (item) => {
    this.props.setDragTarget(this)
  }

  setDragData = (item) => {
    this.props.setDragData(item, this)
  }

  endDrag = () => {
    this.props.endDrag()
  }

  render() {
    return(
      <div className="talisman-slot" onDragOver={(e) => {e.preventDefault()}} >
        <Item talismanX={this.props.slotX} talismanY={this.props.slotY}
         dragLeave={this.props.dragLeave} itemStats={this.props.item}
          dragEnter={this.dragEnter} setDragData={this.setDragData}
          endDrag={this.endDrag} setHoverData={this.props.setHoverData} />
      </div>
    )
  }
}

export default TalismanSlot
