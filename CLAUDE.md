# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vitalis is an Angular 19 healthcare application that uses:
- **PrimeNG** with Aura theme for UI components
- **TailwindCSS 4.x** for styling
- **Angular Router** for navigation
- **Karma + Jasmine** for testing

## Common Commands

### Development
- `npm start` or `ng serve` - Start development server on http://localhost:4200
- `npm run watch` or `ng build --watch --configuration development` - Build and watch for changes

### Building
- `npm run build` or `ng build` - Build for production (outputs to `dist/vitalis/`)
- `ng build --configuration development` - Build for development
- `npm run build -- --configuration production --base-href /vitalis/ --output-hashing=all` - Build for GitHub Pages deployment

### Testing
- `npm test` or `ng test` - Run unit tests with Karma
- `ng test --watch=false --browsers=ChromeHeadless` - Run tests once in headless mode
- `ng test --include='**/specific.component.spec.ts'` - Run specific test file
- Note: No e2e testing framework is currently configured

### Code Generation
- `ng generate component features/component-name --standalone` - Generate standalone component
- `ng generate service shared/services/service-name` - Generate service
- `ng generate interface shared/models/model-name` - Generate TypeScript interface
- `ng generate --help` - See all available schematics

## Architecture

### Application Structure
This is a comprehensive healthcare management system with the following main features:
- **Patient Dashboard** (`painel-atendimento`) - Main dashboard showing patient queues by status
- **Patient Registration** (`cadastro-paciente`) - Complete patient intake and registration with 80+ fields
- **Triage** (`triagem`) - Medical triage and risk classification
- **Medical Care** (`atendimento-medico`) - Doctor consultation interface
- **Nursing** (`enfermagem`) - Nursing care management including vital signs and annotations

### Routing Strategy
- Uses lazy loading for all feature modules except the main dashboard
- Routes are configured in `src/app/app.routes.ts` with component imports
- Default route redirects to `/painel` (main dashboard)

### Component Architecture
- **Standalone components** pattern (Angular 19+) - all components are self-contained
- **Signal-based state management** using `signal()` and `computed()` for reactive state
- **OnPush change detection** strategy for optimal performance
- **Reactive Forms** with comprehensive validation and input masking (cadastro-paciente)
- Layout components: `TopbarComponent` and `SidebarComponent` with signal-based sidebar state

### Data Models
- TypeScript interfaces in `src/app/shared/models/`
- **Patient models**: `Paciente` (basic) and `PacienteCadastro` (comprehensive 80+ field registration)
- **Nursing models**: `SinaisVitais`, `AnotacaoEnfermagem`, `PacienteEnfermagem` for healthcare workflows
- **Utility classes**: `MaskUtils` for input formatting (CPF, phone, CEP)
- Risk classification system: `emergencia`, `muito_urgente`, `urgente`, `pouco_urgente`, `nao_urgente`

### Styling System
- Uses **TailwindCSS 4.x** as the primary CSS framework
- PostCSS configured with `@tailwindcss/postcss` plugin
- Global styles in `src/styles.css` import TailwindCSS
- PrimeNG provides pre-built components with Aura theme
- Color-coded risk classification system using TailwindCSS utilities

### Angular Configuration
- **Standalone components architecture** (Angular 19+)
- Application configuration in `src/app/app.config.ts`
- PrimeNG configured with Aura theme preset
- Async animations provider enabled
- **Strict TypeScript configuration** with enhanced type checking:
  - `strict: true`, `noImplicitReturns: true`, `noFallthroughCasesInSwitch: true`
  - Angular compiler options: `strictTemplates`, `strictInjectionParameters`

### File Structure
- `src/app/features/` - Feature modules organized by healthcare workflow:
  - `painel-atendimento/` - Main patient dashboard with queue management
  - `cadastro-paciente/` - Comprehensive patient registration (reactive forms, validations, masks)
  - `triagem/` - Triage and patient classification
  - `atendimento-medico/` - Medical consultation interface
  - `enfermagem/` - Nursing care (vital signs, annotations, patient monitoring)
- `src/app/layout/` - Layout components (topbar, sidebar)
- `src/app/shared/` - Shared models, utilities, and business logic:
  - `models/` - TypeScript interfaces for all domain entities
  - `utils/` - Helper classes (MaskUtils for input formatting)
- `src/app/app.config.ts` - Main application configuration with providers
- `src/app/app.routes.ts` - Application routing configuration
- `src/styles.css` - Global styles (TailwindCSS import)
- `.postcssrc.json` - PostCSS configuration for TailwindCSS

### Build Configuration
- Production builds have bundle size limits (500kB warning, 1MB error)
- Component styles limited to 4kB warning, 8kB error
- Development builds include source maps and disable optimization
- GitHub Pages deployment configured via `.github/workflows/static.yml` with automatic builds on main branch pushes

## Healthcare Domain Context

### Patient Data Management
- **PacienteCadastro**: Comprehensive 80+ field patient registration including:
  - Personal data (nome, nomeSocial, identidadeGenero, orientacaoSexual)
  - Complete document identification (CPF, RG, CNS, PIS, passport, etc.)
  - Detailed address with residency type and contact preferences
  - Socioeconomic data (profession, education, income, race/ethnicity)
  - Extensive medical history (allergies, medications, surgeries, family history)
  - Multiple emergency contacts and legal representative information

### Nursing Workflow Models
- **SinaisVitais**: Vital signs tracking (blood pressure, heart rate, temperature, oxygen saturation, pain level)
- **AnotacaoEnfermagem**: Legal nursing annotations with strict categorization and professional responsibility
- **PacienteEnfermagem**: Patient monitoring context for nursing care management

### Risk Classification System
- Five-level triage system: `emergencia`, `muito_urgente`, `urgente`, `pouco_urgente`, `nao_urgente`
- Color-coded visual indicators throughout the application

## Development Patterns

### Form Handling
- Reactive Forms with comprehensive validation
- Input masking utilities (`MaskUtils`) for Brazilian formats (CPF, phone, CEP)
- Real-time validation feedback with field-specific error messages
- Signal-based view state management (e.g., 'busca' vs 'cadastro' modes)

### Code Organization
- Feature-based modular architecture with lazy loading
- Shared utilities in `src/app/shared/utils/`
- Domain models in `src/app/shared/models/`
- Standalone components with explicit imports

## Project Configuration

### Claude Code Setup
- Project-specific MCP configuration in `.claude/config.json`
- Chrome DevTools MCP server enabled for debugging
- Configuration isolated from global desktop settings