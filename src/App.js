import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import "./App.css";
import Modal from "./Modal";
import { db, setDoc, doc, getDoc } from "./firebase"; 

export default function App() {
  const [draggers, setDraggers] = useState([
    { type: "label", name: "Label" },
    { type: "input", name: "Input Box" },
    { type: "checkbox", name: "Check Box" },
    { type: "button", name: "Button" },
    { type: "table", name: "Table" },
  ]);

  const [draggedItems, setDraggedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editableItem, setEditableItem] = useState("");
  const [editableItemValue, setEditableItemValue] = useState("");
  const [layoutName, setLayoutName] = useState("");

  const handleEditItem = () => {
    if (editableItemValue) {
      const newDraggedItems = draggedItems.map((item) => {
        if (item.id === editableItem) {
          return { ...item, name: editableItemValue };
        } else {
          return item;
        }
      });

      setDraggedItems(newDraggedItems);
      setOpenModal(false);
    }
  };

  function handleDragEnd(event) {
    draggers.forEach((dragger) => {
      if (dragger.type === event.active.id) {
        const draggedItemsNew = [...draggedItems];
        draggedItemsNew.push({ ...dragger, id: Math.random() });
        setDraggedItems(draggedItemsNew);
      }
    });
  }

  const handleSaveLayout = async () => {
    if (!layoutName) {
      alert("Please enter a layout name");
      return;
    }
    try {
      await setDoc(doc(db, "layouts", layoutName), {
        items: draggedItems,
      });
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Error saving layout:", error);
      alert("Failed to save layout. Try again.");
    }
  };

  const handleLoadLayout = async () => {
    if (!layoutName) {
      alert("Please enter a layout name to load");
      return;
    }
    try {
      const layoutDoc = await getDoc(doc(db, "layouts", layoutName));
      if (layoutDoc.exists()) {
        setDraggedItems(layoutDoc.data().items);
      } else {
        alert("No such layout exists!");
      }
    } catch (error) {
      console.error("Error loading layout:", error);
      alert("Failed to load layout. Try again.");
    }
  };

  const handlePublishLayout = () => {
    const newWindow = window.open();
    if (newWindow) {
      const htmlContent = draggedItems
        .map((item) => {
          switch (item.type) {
            case "label":
              return `<label>${item.name}</label>`;
            case "input":
              return `<input type="text" placeholder="${item.name}" />`;
            case "checkbox":
              return `<input type="checkbox" /> ${item.name}`;
            case "button":
              return `<button>${item.name}</button>`;
            case "table":
              return `<table border="1"><tr><th>${item.name}</th></tr><tr><td>Sample Data</td></tr></table>`;
            default:
              return "";
          }
        })
        .join("<br>");

      const pageContent = `
        <html>
          <head>
            <title>Published Layout</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              label, input, button, table { margin-bottom: 10px; display: block; }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
      newWindow.document.write(pageContent);
      newWindow.document.close();
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="layout">
          <div className="dragCont">
            {draggers.map((dragger) => (
              <Draggable key={dragger.type} id={dragger.type}>
                <p>{dragger.name}</p>
              </Draggable>
            ))}
          </div>
          <div className="rightCont">
            <div className="heading">
              <input
                type="text"
                placeholder="Enter layout name"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
              />
              <button onClick={handleSaveLayout}>Save Layout</button>
              <button onClick={handleLoadLayout}>Load Layout</button>
              <button onClick={handlePublishLayout}>Publish</button>
            </div>
            <div className="dropCont">
              <Droppable
                setItems={setDraggedItems}
                items={draggedItems}
                openModal={setOpenModal}
                setEditableItem={setEditableItem}
              />
            </div>
          </div>
        </div>
      </DndContext>
      {openModal ? (
        <>
          <Modal
            closeModal={setOpenModal}
            setEditableItemValue={setEditableItemValue}
            handleEdit={handleEditItem}
          />
          <div className="modal-overlay"></div>
        </>
      ) : null}
    </>
  );
}
