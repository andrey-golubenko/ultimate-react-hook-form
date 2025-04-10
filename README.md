# Ultimate React Hook Form - Multi-step Form with Material UI

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5.1-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Material--UI-5.14-blue?logo=mui" alt="Material-UI">
</div>

## 🌍 Demo

Experience the multi-step form in action:

- **Live Demo**: [ultimate-react-hook-form](https://andrey-golubenko.github.io/ultimate-react-hook-form/)

## 📌 Core Features

- **Multi-step form implementation**
- **Comprehensive form validation**
- **Material-UI integration**
- **Type-safe development with TypeScript**

## 🛠️ Project Features

### ➤ Form Steps

- **Personal Information**
  - Address selection
  - Date picker
  - First and last name inputs
- **Contact Information**
  - Email validation
  - Optional phone number with formatting
- **Education History**
  - Dynamic form fields
  - Date range selection
  - Multiple education entries
- **Password Management**
  - Password strength validation
  - Password confirmation
  - Real-time validation feedback
- **File Management**
  - Drag and drop interface
  - File size validation
  - Multiple file upload
- **Video Integration**
  - YouTube video link validation
  - Video preview
- **Result Summary**
  - Form data review
  - File list display
  - Data submission

### ➤ Technology Stack

- **[React 18](https://reactjs.org/)** - For building user interface
- **[React Hook Form](https://react-hook-form.com/)** - For efficient form handling
- **[Material-UI](https://mui.com/)** - For consistent UI components
- **[TypeScript](https://www.typescriptlang.org/)** - For type safety
- **[Yup](https://github.com/jquense/yup)** - For schema validation
- **[React Router](https://reactrouter.com/)** - For navigation
- **[Jest](https://jestjs.io/)** & **[React Testing Library](https://testing-library.com/react)** - For testing
- **[Vite](https://vitejs.dev/)** - For development and building

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ultimate-react-hook-form.git
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

## 📂 Project Structure

```plaintext
ultimate-react-hook-form/
├── src/
│   ├── components/         # React components
│   │   ├── FormComponents/ # Form-specific components
│   │   ├── Layout/         # Layout components
│   │   └── ...
│   ├── pages/              # Form step components
│   │   ├── PersonalInfo/
│   │   ├── Contacts/
│   │   ├── Education/
│   │   ├── Password/
│   │   ├── Files/
│   │   ├── Video/
│   │   └── Result/
│   ├── HOC/                 # Higher-order components
│   ├── Yup/                 # Validation schemas
│   ├── types/               # TypeScript types
│   ├── constants/           # Application constants
│   └── helpers/             # Utility functions
├── tests/                   # Test files
├── public/                  # Static assets
└── server.ts                # Simple Express server for file uploads
```

## 📋 Available Commands

| Command        | Description                                         |
|----------------|-----------------------------------------------------|
| `yarn dev`     | Start development server                            |
| `yarn build`   | Build for production                               |
| `yarn preview` | Preview production build                           |
| `yarn lint`    | Run ESLint                                         |
| `yarn format`  | Format code with Prettier                          |
| `yarn test`    | Run tests                                          |
| `yarn commit`  | Create commit using Commitizen                     |

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
