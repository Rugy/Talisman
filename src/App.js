import React, { Component } from 'react'
import Inventory from './Inventory'
import Talisman from './Talisman'
import TalismanSlot from './TalismanSlot'
import InventorySlot from './InventorySlot'
import ItemCreation from './ItemCreation'
import Tooltip from './Tooltip'

class App extends Component {
  constructor(props) {
    super(props);

    this.talismanInit = [13];
    for (let i = 0; i < 13; i++) {
      this.talismanInit[i] = {
        itemType: ""
      };
    }

    this.state = {
      drag: {

      },
      hover: {

      },
      talisman: this.talismanInit,
      inventory: [32],
      runewords: [
        {
        name: "testdiag",
        sequence: ["Ar", "Bon", "Cur"],
        sequencePos: [{x: 0, y: 0}, {x: 1, y: -1}, {x: 2, y: -2}],
        occurences: []
        },
        {
        name: "test",
        sequence: ["Ar", "Cur", "Bon"],
        sequencePos: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
        occurences: []
        },
        {
        name: "test2",
        sequence: ["Ar", "Ar", "Bon"],
        sequencePos: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 1 }],
        occurences: []
        },
        {
        name: "test3",
        sequence: ["Ar", "Cur", "Ar", "Bon"],
        sequencePos: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
        occurences: []
        },
        {
        name: "test4",
        sequence: ["Bon", "Ar", "Ar", "Bon"],
        sequencePos: [{x: 0, y: 0}, {x: -1, y: 2}, {x: 0, y: 1}, {x: 1, y: 2}],
        occurences: []
        },
        {
        name: "test5",
        sequence: ["Bon", "Bon", "Ar"],
        sequencePos: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
        occurences: []
        }
      ],
    }
  }

  getTalismanSlot = (x, y, talisman) => {
    if (talisman === null || talisman === undefined) {
      talisman = this.state.talisman;
    }

    return talisman.filter(slot => {
      return slot !== undefined && slot.slotX === x && slot.slotY === y
    })[0]
  }

  checkValidRunewords = (talisman) => {
    let runewords = [...this.state.runewords]
    let occurences = []

    talisman.forEach((slot, index) => {

      if (slot === undefined || slot.itemType === "") {
        return false
      }

      runewords.filter(runeword => {
        for (let i = 0; i < runeword.sequence.length; i++) {

          let seq = runeword.sequencePos[i]
          let compareSlot = this.getTalismanSlot(slot.slotX + seq.x, slot.slotY + seq.y, talisman)

          if (compareSlot === undefined) {
            return false
          }

          if (compareSlot.itemType !== runeword.sequence[i]) {
            return false
          }
        }

        let newOccurence = {name: runeword.name, talismanX: slot.slotX, talismanY: slot.slotY}
        occurences.push(newOccurence)

        return true;
      })

    })

    return occurences
  }

  setHoverData = (item) => {
    let hoverData = {
      item: item,
    }
    this.setState({hover: hoverData})
  }

  removeHoverData = () => {
    this.setState({hover: ""})
  }

  setDragData = (item, source) => {
    let dragData = {
      ...this.state.drag,
      item: item,
      source: source
    }
    this.setState({drag: dragData})
  }

  setDragTarget = (target) => {
    let dragData = {...this.state.drag, target: target}
    this.setState({drag: dragData})
  }

  dragLeave = () => {
    let dragData = {...this.state.drag, target: ""}
    this.setState({drag: dragData})
  }

  update = () => {
    let droppedItem = false;
    let inventoryUpdate = [...this.state.inventory]
    let talismanUpdate = [...this.state.talisman]
    let drag = this.state.drag
    let source = this.state.drag.source
    let target = this.state.drag.target

    if (drag.item === undefined || source === undefined || target === undefined) {
      return false
    }

    if (target instanceof TalismanSlot) {
      if (source instanceof TalismanSlot || source instanceof ItemCreation) {
        let sourceSlotId = source.props.slotId

        talismanUpdate[target.props.slotId] = drag.item
        talismanUpdate[source.props.slotId] = this.state.talisman[target.props.slotId]

        if (source instanceof TalismanSlot && talismanUpdate[sourceSlotId] !== undefined) {
          talismanUpdate[sourceSlotId].slotX = source.props.slotX
          talismanUpdate[sourceSlotId].slotY = source.props.slotY
        }

      } else if (source instanceof InventorySlot) {
        talismanUpdate[target.props.slotId] = drag.item
        inventoryUpdate[source.props.slotId] = this.state.talisman[target.props.slotId]
      }
      drag.item.slotX = target.props.slotX
      drag.item.slotY = target.props.slotY

      droppedItem = true
    } else if (target instanceof InventorySlot) {
      if (source instanceof InventorySlot || source instanceof ItemCreation) {
        inventoryUpdate[target.props.slotId] = drag.item
        inventoryUpdate[source.props.slotId] = this.state.inventory[target.props.slotId]
      } else if (source instanceof TalismanSlot) {
        inventoryUpdate[target.props.slotId] = drag.item
        talismanUpdate[source.props.slotId] = this.state.inventory[target.props.slotId]
      }
      droppedItem = true
    }

    let occurences = this.checkValidRunewords(talismanUpdate).flat()
    this.state.runewords.forEach(runeword => {
      runeword.occurences = []
      occurences.forEach(occurence => {
        if (runeword.name === occurence.name) {
          runeword.occurences.push(occurence)
        }
      })
    })

    this.setState({talisman: talismanUpdate, inventory: inventoryUpdate, drag: {}})

    return droppedItem
  }

  render() {
    return (
      <div>
        <Inventory inventoryItems={this.state.inventory} dragLeave={this.dragLeave}
          setDragData={this.setDragData} setDragTarget={this.setDragTarget}
          endDrag={this.update} setHoverData={this.setHoverData} />
        <Talisman talismanItems={this.state.talisman} dragLeave={this.dragLeave}
          setDragData={this.setDragData} setDragTarget={this.setDragTarget}
          endDrag={this.update} setHoverData={this.setHoverData}
          runewords={this.state.runewords}/>
        <ItemCreation  setDragData={this.setDragData} endDrag={this.update}
          setHoverData={this.setHoverData} />
        <Tooltip item={this.state.hover.item}/>
      </div>
    )
  }
}

export default App
