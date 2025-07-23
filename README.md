# 🧠 Visual Studio Code Web Clone

A web-based clone of Visual Studio Code built with React and Monaco Editor.  
This project allows you to manage files, edit HTML/CSS/JS, and run your code in a live preview — all inside the browser!

## 📹 Demo

https://your-demo-link.com *(replace with actual link)*

## 📸 Preview

![Editor Preview](./screenshot.png) *(Add a screenshot of your editor interface)*

---

## 🚀 Features

- 📁 File Explorer with:
  - Create file
  - Rename file
  - Download file
  - Delete file

- 🧠 Code Editor:
  - Tabbed interface for open files
  - Active file highlighting
  - Live code editing with Monaco Editor
  - Dracula theme

- 🧪 Live Preview:
  - HTML, CSS, and JavaScript rendering
  - Modal-based preview window
  - Uses `iframe` for sandboxed execution

- ↔️ Resizable Panels:
  - Custom layout between file tree and editor using `react-resizable-panels`

---

## 📦 Tech Stack

- **React**
- **Redux Toolkit**
- **Monaco Editor**
- **Tailwind CSS**
- **React-Resizable-Panels**
- **uuid**

---

## 🧱 Project Structure

```bash
.
├── components/
│   ├── File.tsx
│   ├── OpenFilesBar.tsx
│   ├── Preview.tsx
│   ├── Modal.tsx
│   └── ImgIcon.tsx
├── Store/
│   ├── FileFeatures/
│   │   └── FileSlice.ts
│   └── Store.ts
├── utils/
│   └── index.ts
├── data/
│   └── fileTree.ts
├── App.tsx
├── main.tsx
└── index.css
