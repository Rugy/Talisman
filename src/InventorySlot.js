import React, { Component } from 'react'
import Item from './Item'

class InventorySlot extends Component {
  state = {

  }

  dragEnter = () => {
    this.props.setDragTarget(this)
  }

  setDragData = (item) => {
    this.props.setDragData(item, this)
  }

  endDrag = () => {
    this.props.endDrag()
  }

  render() {
    const item = <Item dragLeave={this.props.dragLeave}
      itemStats={this.props.item} setDragData={this.setDragData}
      dragEnter={this.dragEnter} endDrag={this.endDrag}
      setHoverData={this.props.setHoverData} />

    return (
      <div className="inventory-slot"
        onDragOver={(e) => {e.preventDefault()}} >
        {item}
      </div>
    )
  }
}

export default InventorySlot
