import { Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { v4 as uuid4 } from "uuid";
import { Manager } from "../manager";
export class ContextMenu extends Container {
  constructor(node, addNode, removeNode) {
    super();
    // this.label = node.label;

    this.border = new Graphics()
      .roundRect(0, 0, tooltip.length * 35, 35, 3)
      .fill(0x282a36);
    this.addChild(this.border);
    tooltip.forEach((tool, idx) => {
      const button = new Button(35 * idx, tool.icon);
      this.addChild(button);
      button.on("pointerdown", (event) => {
        event.stopPropagation();
        switch (tool.name) {
          case "add":
            addNode(node);
            break;
          case "remove":
            removeNode(node.label);
            break;
          case "addImage":
            this.addImage(node);
            break;
          case "openSettings":
            Manager.toggleNodeEditor({
              isOpen: "SWITCH",
              nodeID: node.label,
            });
            break;
        }
      });
    });
  }
  addImage(node) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click(); // Programmatically trigger file input click
    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async function (readerEvent) {
          const imageID = `i-${uuid4()}`;
          localStorage.setItem(imageID, readerEvent.target.result);
          const texture = await Assets.load(readerEvent.target.result);
          console.log(readerEvent.target.result);

          node.addImage(texture, imageID);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    });
  }
}

class Button extends Graphics {
  constructor(x, texture) {
    super();
    this.isHighlighted = false;

    this.x = x;
    this.border = new Graphics().roundRect(0, 0, 35, 35, 3).fill(0x282a36);
    this.sprite = Sprite.from(texture);
    const SCALE = 25 / this.sprite.height;
    this.sprite.scale.x = SCALE;
    this.sprite.scale.y = SCALE;
    this.sprite.x = 20 - 15;
    this.sprite.y = 20 - 15;
    this.addChild(this.border, this.sprite);

    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerover", this.highlight);
    this.on("pointerout", this.unhighlight);
  }
  highlight() {
    if (!this.isHighlighted) {
      this.border.clear().roundRect(0, 0, 35, 35, 7).fill(0x20212b);
      this.isHighlighted = true;
    }
  }
  unhighlight() {
    if (this.isHighlighted) {
      this.border.clear().roundRect(0, 0, 35, 35, 7).fill(0x282a36);
      this.isHighlighted = false;
    }
  }
}

const tooltip = [
  { name: "add", icon: "add_icon" },
  { name: "remove", icon: "remove_icon" },
  { name: "addImage", icon: "add_image_icon" },
  { name: "openSettings", icon: "settings_icon" },
];
