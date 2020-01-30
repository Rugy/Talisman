import React, { Component } from 'react'
import ArImage from './img/Ar.png'
import BonImage from './img/Bon.png'
import CurImage from './img/Cur.png'
import DelImage from './img/Del.png'
import EmptyImage from './img/Empty.png'

class Item extends Component {
  setDragData = (event) => {
    if (this.props.itemStats !== null) {
      this.props.setDragData(this.props.itemStats)
    }
  }

  setHoverData = (event) => {
    if (this.props.itemStats !== null) {
      this.props.setHoverData(this.props.itemStats)
    }
  }

  removeHoverData = (event) => {
    if (this.props.itemStats !== null) {
      this.props.setHoverData()
    }
  }

  render() {
    let src = EmptyImage;
    let itemType;
    if (this.props.itemStats != null) {
      itemType = this.props.itemStats.itemType
    }

    if (itemType === "Ar") {
      src = ArImage
    }
    if (itemType === "Bon") {
      src = BonImage
    }
    if (itemType === "Cur") {
      src = CurImage
    }
    if (itemType === "Del") {
      src = DelImage
    }

    return (
      <img alt="Rune" className="item-image" src={src} onDragLeave={this.props.dragLeave}
        onDragStart={this.setDragData} onDragEnd={this.props.endDrag}
        onDragEnter={this.props.dragEnter} onMouseEnter={this.setHoverData}
        onMouseLeave={this.removeHoverData} />
    )
  }
}

export default Item
