# Products Frontend

A modern React frontend application built with TypeScript, Redux, and Tailwind CSS for product management.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **Redux Toolkit** - Efficient state management with modern Redux patterns
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Lightning-fast build tool and development server
- **ESLint** - Code quality and consistency

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd products-fe
```

2. Install dependencies:
```bash
npm install
```

## 🏃‍♂️ Getting Started

### Development Server
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Build for Production
Create a production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Code Quality
Run ESLint to check code quality:
```bash
npm run lint
```

Run TypeScript type checking:
```bash
npm run type-check
```
## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.cjs` - ESLint configuration

## 🎨 Features

- **Responsive Design** - Mobile-first responsive layout
- **Type Safety** - Full TypeScript integration
- **State Management** - Redux Toolkit for efficient state updates
- **Modern Styling** - Tailwind CSS for rapid UI development
- **Hot Module Replacement** - Instant updates during development
- **Code Quality** - ESLint and TypeScript for code consistency
- **API Integration** - OpenAPI-generated client for type-safe API calls
- **Automated Code Generation** - API client and types generated from OpenAPI spec

## 🧩 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run generate:api` | Generate API client from OpenAPI spec |
| `npm run generate:api-clean` | Clean and regenerate API client |

## 🔌 OpenAPI Integration

This project uses OpenAPI specification for automated API client generation:

### API Specification
- **Location**: `api/openapi.yaml`
- **Generated Client**: `src/generated/api/`
- **Service Layer**: `src/services/productsService.ts`

### Workflow
1. Update `api/openapi.yaml` with your backend team
2. Run `npm run generate:api` to regenerate the TypeScript client
3. Update service layer and Redux slices as needed
4. TypeScript will ensure type safety across the application

### Environment Configuration
Create a `.env.local` file to configure the API URL:
```bash
VITE_API_URL=http://localhost:8080
```

### Development Mode
When running in development mode (`npm run dev`), if the API server is not available, the application will automatically fall back to mock data so you can develop and test the UI without needing a backend server.

## 🚦 Development Guidelines

1. **Components**: Create reusable components in the `src/components/` directory
2. **State Management**: Use Redux Toolkit slices for state management
3. **Styling**: Use Tailwind CSS utility classes for styling
4. **Type Safety**: Always define TypeScript interfaces for data structures
5. **API Integration**: Use the generated API client and service layer
6. **Code Quality**: Run `npm run lint` before committing changes
7. **API Updates**: Regenerate client when OpenAPI spec changes

