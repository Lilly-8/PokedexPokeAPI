# Mi Pokedex 🌸

Esta es una aplicacion web tipo Pokedex que desarrolle como actividad para la materia de Aplicaciones Web.
Durante esta practica aprendi sobre componentes, consumo de APIs y manejo de estados.

**Desarrolladora:** Fanny Lillian Mykytuk Ayvar
**Materia:** Aplicaciones Web

---
## Tecnologias usadas
- React (Vite)
- TypeScript
- React Router DOM (para la navegacion entre paginas)
- CSS (para el diseño)
- LocalStorage (para la persistencia de favoritos y temas)
- Fetch API (para el consumo de datos)

---
## Instalacion y Ejecucion
Para ejecutar el proyecto, sigue estos pasos:
### 1. Clonar el repositorio
```bash
git clone git@github.com:Lilly-8/PokedexPokeAPI.git
```
### 2. Entrar a la carpeta del proyecto
```bash
cd PokeAPI/Frontend
```
### 3. instalar las dependencias
```bash
pnpm install
```
### 4. Ejecutar el proyecto
```bash
pnpm run dev
```

Despues de ejecutar el comando abre en tu navegador la URL que aparece en la terminal.

---
## Funcionalidades implementadas
### RF01 - Listado de Pokemon
Se muestran tarjetas con:
- Nombre
- Imagen 
- Numero
- Tipo del pokemon

### RF02 - Detalle de Pokemon
Cada Pokemon tine una pantalla con informacion mas completa:
- Tipos
- Peso
- Altura
- Habilidades
- Estadisticas

### RF03 - Busqueda
Se puede buscar un Pokemon por nombre desde la pantalla principal.

### RF04 - Filtros
La aplicacion incluye un filtro por tipo de Pokemon.

### RF05 - Favoritos
Se puede agregar y quitar Pokemon favoritos.
Los favoritos se guardan usando LocalStorage para que no se pierdan al recargar la pagina.

### RF06 - Comparador
Se pueden seleccionar dos Pokémon para comparar sus estadísticas base.

### RF07 - Estados
La aplicación muestra mensajes cuando:

- Ocurre un error
- No se encuentran resultados

### Bonus - Modo oscuro
Se agregó un modo oscuro que también permanece guardado usando LocalStorage.

## Capturas de pantalla 
Las capturas de pantalla se encuentran en la carpeta **/evidencias**.

## Problemas encontrados y como los resolvi
### 1. El modo oscuro no se mantenia entre las paginas.
**Problema:**  
Cuando cambiaba de pantalla, el modo oscuro volvía al modo claro automáticamente.

**Solución:**  
Guardé la preferencia del usuario en LocalStorage y después la recuperé usando `useEffect` al cargar cada componente.

---
### 2. Algunos componentes no cambiaban correctamente al modo oscuro

**Problema:**  
Había partes de la aplicación que seguían con colores claros aunque el modo oscuro estuviera activado.

**Solución:**  
Tuve que crear estilos específicos en el CSS para asegurar que todos los componentes respondieran correctamente al cambio de tema.

---
### 3. El mensaje de “Pokémon no encontrado 🥀” se veía desalineado

**Problema:**  
El mensaje aparecía dentro del contenedor Grid y se veía mal acomodado.

**Solución:**  
Moví el mensaje fuera de la rejilla principal para que pudiera ocupar todo el ancho de la pantalla y centrarse correctamente.

---
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
