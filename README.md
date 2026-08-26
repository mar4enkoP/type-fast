# TypeFast

Touch typing simulator on TypeScript, without frameworks.

## 🏗️ Architecture

Hexagonal architecture (Ports & Adapters): the business logic (WPM/accuracy calculation) is independent of the DOM. UI components (`TabsComponent` and others) are thin adapters that render the state and pass events to the domain.

## ✅ Roadmap

- [x] Static tab navigation
- [ ] Touch-typing engine (input capture, WPM/CPM, accuracy)
- [ ] Virtual keyboard
- [ ] Animations
- [ ] Top menu (theme/language)
- [ ] Tests (Vitest, Playwright)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting


## 📁 Project Structure

```
type-fast/
├── src/
│   ├── tabs/             
│   │   ├── TabsComponent.ts
│   │   └── tabs.types.ts
│   ├── styles/           
│   │   └── global.css
│   └── main.ts           
├── public/               
├── index.html           
└── package.json
```

## 🎨 Tech Stack

- **TypeScript 6** - Type-safe JavaScript
- **Vite 8** - Fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📝 License

Private project for portfolio purposes.
