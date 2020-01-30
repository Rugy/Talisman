import React, { Component } from 'react'
import InventorySlot from './InventorySlot'

class Inventory extends Component {
  render() {
    const itemSlots = []

    for (let i = 0; i < 32; i++) {
      itemSlots.push(<InventorySlot slotId={i} key={i} item={this.props.inventoryItems[i]}
        dragLeave={this.props.dragLeave} setDragData={this.props.setDragData}
        setDragTarget={this.props.setDragTarget} endDrag={this.props.endDrag}
        setHoverData={this.props.setHoverData} />);
    }

    return (
      <div id="inventory">
        <div id="inventory-header">
          INVENTORY
        </div>
        <div id="inventory-item-slots">
          {itemSlots}
        </div>
      </div>
    )
  }
}

export default Inventory
