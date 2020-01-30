import React, { Component } from 'react'
import Item from './Item'

class ItemCreation extends Component {
  constructor(props) {
    super(props)

    this.itemCount = 0
  }

  state = {
    itemType: "",
    boni: {
      strentghBonus: 0
    },
    index: ""
  }

  createNewItem = () => {
    this.setState({itemType: this.createType(),
     boni: this.createBoni(), index: this.itemCount++})
  }

  createType = () => {
    let typeCount = 4
    let typeChoice = Math.floor(Math.random() * typeCount)
    let type = ""
    if (typeChoice === 0) {
      type = "Ar"
    }
    if (typeChoice === 1) {
      type = "Bon"
    }
    if (typeChoice === 2) {
      type = "Cur"
    }
    if (typeChoice === 3) {
      type = "Del"
    }

    return type
  }

  createBoni = () => {
    return {
      strBonus: Math.floor(Math.random() * 100 + 1),
      dexBonus: Math.floor(Math.random() * 100 + 1),
      intBonus: Math.floor(Math.random() * 100 + 1)
    }
  }

  setDragData = (item) => {
    this.props.setDragData(item, this)
  }

  endDrag  = () => {
    if (this.props.endDrag()) {
      this.setState({
        itemType: "",
        boni: {
          strentghBonus: 0
        },
        index: ""
      })
    }
  }

  render() {
    const createdItem =
    <Item itemStats={this.state} endDrag={this.endDrag}
      setDragData={this.setDragData} setHoverData={this.props.setHoverData}
    />

    return (
      <div id="item-creation">
        <button className="button" onClick={this.createNewItem}>
          Create New item {this.state.itemType}
        </button>
        <div id="created-item">
          {createdItem}
        </div>
      </div>
    )
  }
}

export default ItemCreation
