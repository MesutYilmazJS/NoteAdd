class noteCls {
    constructor() {
        this.btnAdd = document.getElementById("btn");
        this.noteParent = document.getElementById("note_parent_div");
        this.btnAdd.addEventListener("click", this.addNote);
        this.colors = ["#fef3bd", "#caffbf", "#bdb2ff", "#ffd6a5", "#a0c4ff", "#ffadad"];
        this.init();
    }
    init() {
        if (this.getNotes().length > 0) {
            this.btnAdd.style.display = 'none';
            this.getNotes().forEach((note) => {
                const noteEl = this.createNote(note.id, note.content, note.color, note.textColor);
                this.noteParent.insertBefore(noteEl, this.btnAdd);
            });
        } else {
            this.btnAdd.style.display = 'block';
        }

    }
    createNote(id, content, bgColor = null, textColor = "#000000") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("note-wrapper");
    
        const element = document.createElement("textarea");
        element.classList.add("note");
        element.placeholder = "Notunuzu Yazınız...";
        element.value = content;
        element.style.backgroundColor = bgColor || this.getRandomColor();
        element.style.color = textColor;
    
        const deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "X";
        deleteBtn.classList.add("delete-icon");
    
        const bgColorPicker = document.createElement("input");
        bgColorPicker.type = "color";
        bgColorPicker.classList.add("color-picker");
        bgColorPicker.value = this.rgbToHex(element.style.backgroundColor);
    
        bgColorPicker.addEventListener("input", (e) => {
            element.style.backgroundColor = e.target.value;
            this.updateNoteStyle(id, e.target.value, element.style.color);
        });
    
        const textColorPicker = document.createElement("input");
        textColorPicker.type = "color";
        textColorPicker.classList.add("color-picker");
        textColorPicker.style.left = "25px";
        textColorPicker.value = textColor;
    
        textColorPicker.addEventListener("input", (e) => {
            element.style.color = e.target.value;
            this.updateNoteStyle(id, element.style.backgroundColor, e.target.value);
        });
    
        deleteBtn.addEventListener("click", () => {
            this.deleteNote(id, wrapper);
        });
    
        element.addEventListener("input", () => {
            this.updateNote(id, element.value);
        });
    
        wrapper.appendChild(deleteBtn);
        wrapper.appendChild(bgColorPicker);
        wrapper.appendChild(textColorPicker);
        wrapper.appendChild(element);
    
        return wrapper;
    }
        
    deleteNote(id, element) {
        const notes = this.getNotes().filter((note) => note.id != id)
        this.saveNote(notes)
        this.noteParent.removeChild(element)
    }
    updateNote(id, content) {
        const notes = this.getNotes();
        const target = notes.filter((note) => note.id == id)[0];
        target.content = content;
        this.saveNote(notes);
    }
    addNote() {
        const notes = noteC.getNotes();
        const noteObj = {
            id: Math.floor(Math.random() * 100000),
            content: "",
            color:  "#000000",
            textColor: "#000000" // varsayılan siyah
        };
        const noteEl = noteC.createNote(noteObj.id, noteObj.content);
        noteC.noteParent.insertBefore(noteEl, noteC.btnAdd);
        notes.push(noteObj);
        noteC.saveNote(notes);
    }
    saveNote(notes) {
        localStorage.setItem("note-app", JSON.stringify(notes));
        this.notes_empty();
    }
    updateNoteColor(id, newColor) {
        const notes = this.getNotes();
        const target = notes.find(note => note.id == id);
        if (target) {
            target.color = newColor;
            this.saveNote(notes);
        }
    }    
    rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result) return "#ffffff";
        return "#" + result.map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }).join("");
    }
    updateNoteStyle(id, bgColor, textColor) {
        const notes = this.getNotes();
        const target = notes.find(note => note.id == id);
        if (target) {
            target.color = this.rgbToHex(bgColor);
            target.textColor = textColor;
            this.saveNote(notes);
        }
    }
    
    
    getNotes() {
        return JSON.parse(localStorage.getItem("note-app") || "[]");
    }
    notes_empty() {
        this.btnAdd.style.display = this.getNotes().length > 0 ? 'none' : 'block';
    }
    getRandomColor() {
        const index = Math.floor(Math.random() * this.colors.length);
        return this.colors[index];
    }
}
window.noteC = new noteCls()