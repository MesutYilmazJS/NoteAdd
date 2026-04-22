class NoteApp {
  constructor() {
    this.btnAdd = document.getElementById("btn");
    this.heroAddBtn = document.getElementById("hero_add_btn");
    this.noteParent = document.getElementById("note_parent_div");
    this.noteCount = document.getElementById("note_count");
    this.noteStatus = document.getElementById("note_status");
    this.colors = ["#fef3bd", "#caffbf", "#bdb2ff", "#ffd6a5", "#a0c4ff", "#ffadad"];

    this.btnAdd.addEventListener("click", () => this.addNote());
    this.heroAddBtn.addEventListener("click", () => this.addNote());

    this.init();
  }

  init() {
    const notes = this.getNotes();

    notes.forEach((note) => {
      const noteEl = this.createNote(note.id, note.content, note.color, note.textColor);
      this.noteParent.insertBefore(noteEl, this.btnAdd);
    });

    this.refreshUI(notes);
  }

  createNote(id, content, bgColor = null, textColor = "#000000") {
    const wrapper = document.createElement("div");
    wrapper.classList.add("note-wrapper");
    wrapper.style.backgroundColor = bgColor || this.getRandomColor();

    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Notunuzu yazın...";
    element.value = content;
    element.style.color = textColor;

    const toolbar = document.createElement("div");
    toolbar.classList.add("note-toolbar");

    const tools = document.createElement("div");
    tools.classList.add("note-tools");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Sil";
    deleteBtn.classList.add("delete-icon");
    deleteBtn.title = "Notu sil";

    const bgColorControl = document.createElement("label");
    bgColorControl.classList.add("color-control");
    bgColorControl.textContent = "Kart";

    const bgColorPicker = document.createElement("input");
    bgColorPicker.type = "color";
    bgColorPicker.classList.add("color-picker");
    bgColorPicker.value = this.rgbToHex(wrapper.style.backgroundColor);
    bgColorPicker.title = "Arka plan rengi";

    bgColorPicker.addEventListener("input", (event) => {
      wrapper.style.backgroundColor = event.target.value;
      this.updateNoteStyle(id, event.target.value, element.style.color);
    });

    const textColorControl = document.createElement("label");
    textColorControl.classList.add("color-control");
    textColorControl.textContent = "Yazı";

    const textColorPicker = document.createElement("input");
    textColorPicker.type = "color";
    textColorPicker.classList.add("color-picker");
    textColorPicker.value = this.rgbToHex(textColor);
    textColorPicker.title = "Yazı rengi";

    textColorPicker.addEventListener("input", (event) => {
      element.style.color = event.target.value;
      this.updateNoteStyle(id, wrapper.style.backgroundColor, event.target.value);
    });

    deleteBtn.addEventListener("click", () => {
      this.deleteNote(id, wrapper);
    });

    element.addEventListener("input", () => {
      this.updateNote(id, element.value);
    });

    bgColorControl.appendChild(bgColorPicker);
    textColorControl.appendChild(textColorPicker);
    tools.appendChild(bgColorControl);
    tools.appendChild(textColorControl);
    toolbar.appendChild(tools);
    toolbar.appendChild(deleteBtn);
    wrapper.appendChild(toolbar);
    wrapper.appendChild(element);

    return wrapper;
  }

  deleteNote(id, element) {
    const notes = this.getNotes().filter((note) => note.id !== id);
    this.saveNotes(notes);
    this.noteParent.removeChild(element);
  }

  updateNote(id, content) {
    const notes = this.getNotes();
    const target = notes.find((note) => note.id === id);

    if (!target) {
      return;
    }

    target.content = content;
    this.saveNotes(notes);
  }

  addNote() {
    const notes = this.getNotes();
    const color = this.getRandomColor();
    const noteObj = {
      id: this.generateId(),
      content: "",
      color,
      textColor: "#2f241d",
    };

    const noteEl = this.createNote(noteObj.id, noteObj.content, noteObj.color, noteObj.textColor);
    this.noteParent.insertBefore(noteEl, this.btnAdd);
    notes.push(noteObj);
    this.saveNotes(notes);
    noteEl.querySelector(".note").focus();
  }

  saveNotes(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
    this.refreshUI(notes);
  }

  refreshUI(notes = this.getNotes()) {
    const count = notes.length;
    this.noteCount.textContent = count;
    this.noteStatus.textContent =
      count > 0
        ? `${count} not kaydedildi. Her kartın üst çubuğundan renkleri değiştirebilir veya silebilirsin.`
        : "Henüz not yok. İlk notunu ekle.";

    this.btnAdd.style.display = count > 0 ? "none" : "block";
  }

  rgbToHex(rgb) {
    if (rgb.startsWith("#")) {
      return rgb;
    }

    const result = rgb.match(/\d+/g);
    if (!result) {
      return "#ffffff";
    }

    return `#${result
      .map((value) => {
        const hex = parseInt(value, 10).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join("")}`;
  }

  updateNoteStyle(id, bgColor, textColor) {
    const notes = this.getNotes();
    const target = notes.find((note) => note.id === id);

    if (!target) {
      return;
    }

    target.color = this.rgbToHex(bgColor);
    target.textColor = this.rgbToHex(textColor);
    this.saveNotes(notes);
  }

  getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
  }

  getRandomColor() {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}

window.noteApp = new NoteApp();
