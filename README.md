# Image Selector

This repository contains an image selector component designed for easy integration into web applications.

## Features

- Select images from local storage.
- Preview selected images before upload.
- Lightweight and customizable.

## Installation

```bash
npm install image-selector
```

## Usage

```javascript
import ImageSelector from 'image-selector';

function App() {
  return (
    <div>
      <h1>Image Selector Demo</h1>
      <ImageSelector onSelect={(images) => console.log(images)} />
    </div>
  );
}

export default App;
```

## Props

| Prop       | Type     | Description                                 |
| ---------- | -------- | ------------------------------------------- |
| `onSelect` | Function | Callback function when images are selected. |

## License

This project is licensed under the MIT License.
