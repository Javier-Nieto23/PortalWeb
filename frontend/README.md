# 🎮 Portafolio Game Boy Scroll - Javier Nieto

Portafolio personal con diseño retro inspirado en las Game Boy de los 90's y **efecto de scroll interactivo único**.

## ✨ Características Principales

### 🎬 Efecto de Scroll Cinematográfico

Inspirado en portfolios modernos como [edh.dev](https://edh.dev), el sitio presenta:

1. **Pantalla LCD inicial** - Solo se muestra la pantalla de la Game Boy al cargar
2. **Revelación gradual** - Al hacer scroll se revela progresivamente toda la consola
3. **Transiciones suaves** - Animaciones fluidas basadas en la posición del scroll
4. **Contenido contextual** - La información aparece de forma elegante

### 🎮 Elementos Interactivos Game Boy

- **Pantalla LCD auténtica** con líneas de escaneo
- **Controles físicos** (D-Pad, botones A/B, Start/Select)
- **Efectos de reflejo** en la pantalla
- **Animaciones de estado** (indicador "READY" parpadeante)

### 🎨 Diseño Visual

- **Paleta Game Boy auténtica** con verdes clásicos
- **Tipografías retro** (Press Start 2P, VT323)
- **Efectos visuales nostálgicos** (líneas de escaneo, bordes biselados)
- **Scroll indicator** para guiar al usuario

## 🚀 Despliegue en Vercel

### Preparación para subir a Vercel:

1. **Archivos principales para el despliegue:**

   ```
   frontend/
   ├── src/
   │   ├── components/
   │   │   ├── Portfolio.jsx       # Componente principal con scroll logic
   │   │   ├── GameBoyScreen.jsx   # Efecto de scroll y Game Boy
   │   │   ├── Header.jsx          # Navegación
   │   │   └── Skills.jsx          # Habilidades técnicas
   │   ├── styles/
   │   │   └── Portfolio.css       # Estilos completos con animaciones
   │   ├── assets/
   │   │   └── perfil.jpg          # Imagen de perfil
   │   └── main.jsx
   ├── index.html
   ├── package.json
   └── vite.config.js
   ```

2. **Comandos de instalación:**

   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Configuración de Vercel:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🎯 Funcionalidades del Scroll

### Etapas del Scroll:

1. **0-100px**: Pantalla LCD centrada y fija
2. **100-300px**: Revelación del cuerpo de la Game Boy
3. **300-500px**: Aparición del contenido de información
4. **500px+**: Transición completa a la sección de habilidades

### Efectos Aplicados:

- `transform: scale()` - Escala de la pantalla inicial
- `opacity` gradual - Aparición/desaparición de elementos
- `translateY()` - Movimientos verticales suaves
- Scroll indicator - Guía visual para interactuar

## 🛠️ Tecnologías Utilizadas

- **React** con hooks (useState, useEffect)
- **Vite** como bundler
- **CSS3 Transforms** para animaciones
- **Scroll Events** nativos de JavaScript
- **Google Fonts** para tipografías retro

## 📱 Estructura del Scroll Component

```jsx
const GameBoyScreen = ({ scrollY, isLoaded }) => {
  // Cálculos de transformaciones basados en scroll
  const screenScale = Math.max(0.3, 1 - scrollY * 0.001);
  const gameboyReveal = Math.min(100, scrollY * 0.5);
  const contentOpacity = scrollY > 300 ? Math.min(1, (scrollY - 300) * 0.005) : 0;

  return (
    // Pantalla inicial que se transforma
    // Cuerpo de Game Boy que se revela
    // Contenido que aparece gradualmente
  );
};
```

## 🎨 Detalles Visuales Únicos

- **Scan lines** animadas en la pantalla LCD
- **Reflection effects** en la pantalla
- **Status indicator** parpadeante
- **3D beveled borders** en todos los elementos
- **Authentic Game Boy proportions** y colores

## 🎯 Próximas Mejoras

- Añadir sonidos retro en interacciones
- Implementar navegación funcional entre secciones
- Agregar más animaciones de carga estilo Game Boy
- Integrar descarga de CV funcional
- Añadir sección de proyectos con scroll horizontal

---

**Desarrollado con ❤️ y nostalgia por los 90's - Javier Nieto**

🎮 _"It's not just a portfolio, it's a Game Boy experience"_
