# Products Frontend

A modern React frontend application built with TypeScript, Redux, and Tailwind CSS for product management.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **Redux Toolkit** - Efficient state management with modern Redux patterns
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Lightning-fast build tool and development server
- **ESLint** - Code quality and consistency
- **OpenAPI** - To build services 

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd products-fe
```

2. Install dependencies:
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file to configure the API URL:
```bash
VITE_API_URL=http://localhost:8080
```

##  BACKEND
Backend is prepared in another repository: https://github.com/agatakulbicka/products-be
Follow BE readme instruction to run entire flow: https://github.com/agatakulbicka/products-be/blob/main/README.md

##  OTHERS

### Code Quality
Run ESLint to check code quality:
```bash
npm run lint
```

Run TypeScript type checking:
```bash
npm run type-check
```

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