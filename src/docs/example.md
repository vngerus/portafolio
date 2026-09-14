# Arquitectura del Portafolio: Design Engineer (Creative Full-Stack)

Este documento define la estructura de archivos, la pila tecnológica y el flujo de datos para el portafolio profesional. El objetivo es demostrar habilidades avanzadas de frontend (animación 3D/interactiva) sin descuidar la solidez de la arquitectura de datos del backend.

## 1. Stack Tecnológico Principal

- **Frontend Framework:** Next.js (App Router) + TypeScript.
- **Creative/Animation Layers:**
  - **GSAP (GreenSock):** Control de líneas de tiempo, microinteracciones y efectos basados en ScrollTrigger.
  - **React Three Fiber (R3F) + Drei:** Integración de escenas 3D (Three.js) optimizadas para el ciclo de vida de React.
- **Styling:** Tailwind CSS + CSS Variables (para temas dinámicos e inyecciones de color en tiempo real).
- **Backend & Database:** Node.js / Serverless Functions + Supabase (PostgreSQL) para la gestión dinámica de proyectos y métricas.
- **Hosting/Deployment:** Vercel (CI/CD integrado con GitHub).

---

## 2. Arquitectura de Archivos (Estructura de Directorios)

```text
portfolio-design-engineer/
├── src/
│   ├── app/                        # Next.js App Router (Páginas y ruteo)
│   │   ├── layout.tsx              # Proveedores globales, estructura base y canvas 3D global
│   │   ├── page.tsx                # Home Page (Landing interactiva)
│   │   ├── projects/
│   │   │   ├── page.tsx            # Galería/Filtros de proyectos
│   │   │   └── [slug]/             # Vista de detalle dinámico de un proyecto
│   │   └── api/                    # Serverless endpoints (Métricas, contacto)
│   │
│   ├── components/                 # Componentes reutilizables de UI e Interacción
│   │   ├── ui/                     # Componentes atómicos (Botones, inputs con microinteracciones)
│   │   ├── creative/               # Componentes con lógica visual pesada
│   │   │   ├── CustomCursor.tsx    # Cursor interactivo con GSAP
│   │   │   ├── ScrollCanvas.tsx    # Canvas 3D que reacciona al scroll de la página
│   │   │   └── Experience3D.tsx    # Elementos y shaders de Three.js
│   │   └── layout/                 # Navbar, Footer, transiciones de página
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useGSAPContext.ts       # Hook para limpieza segura de memoria en animaciones
│   │   └── useMousePosition.ts     # Seguimiento de coordenadas para efectos interactivos
│   │
│   ├── lib/                        # Configuraciones de clientes y utilidades de backend
│   │   ├── supabaseClient.ts       # Inicialización de Supabase
│   │   └── database.types.ts       # Tipados automáticos de la base de datos
│   │
│   └── styles/
│       └── globals.css             # Tailwind + Configuración de variables CSS base
├── public/                         # Modelos 3D (.gltf/.glb), texturas, optimizados
└── database/                       # Scripts SQL y esquemas de base de datos
```

---

## 3. Modelo y Arquitectura de Datos (Supabase / Postgres)

A diferencia de un portafolio estático, este backend expone la capacidad de gestionar datos estructurados y relaciones complejas en tiempo real.

### Tabla: `projects`

Almacena los metadatos principales de los proyectos desarrollados (por ejemplo, TrueQ, CartoViewer, etc.).

- `id` (uuid, PK)
- `title` (varchar)
- `slug` (varchar, Unique)
- `description` (text)
- `technologies` (text[]) -> Array de tecnologías usadas.
- `live_url` (varchar)
- `github_url` (varchar)
- `theme_color` (varchar) -> Código HEX inyectado dinámicamente en el frontend para cambiar la paleta de la UI al navegar por el proyecto.
- `featured` (boolean)

### Tabla: `project_metrics`

Relación 1:1 o 1:N para demostrar impacto técnico real (Full-Stack).

- `id` (uuid, PK)
- `project_id` (uuid, FK -> `projects.id`)
- `metric_label` (varchar) -> Ejemplo: "Tiempo de carga", "Optimización de Queries", "Queries/seg".
- `metric_value` (varchar) -> Ejemplo: "-40%", "99.8%", "10k".

---

## 4. Estrategia de Interacción y Animación

### Capa Global (Layout)

- **Canvas 3D Persistente:** Un único `<Canvas>` de React Three Fiber se monta en el layout raíz. Al navegar entre páginas, el canvas no se destruye; los objetos dentro de él se trasladan de posición o rotan fluidamente usando GSAP, evitando caídas de FPS.
- **Smooth Scrolling:** Integración de Lenis o GSAP ScrollSmoother para estandarizar la velocidad del scroll en todos los navegadores, asegurando que las animaciones con `ScrollTrigger` se ejecuten sin saltos.

### Vistas Clave

1.  **Home (Hero Section):** Un objeto 3D central abstracto (con Three.js) controlado por shaders sencillos que reacciona levemente al movimiento del mouse. Un botón principal que, al hacer _hover_, deforma sutilmente el cursor magnético mediante GSAP.
2.  **Sección de Proyectos (Grip Interactivo):** Una lista donde, al hacer hover sobre cada proyecto, el Canvas 3D renderiza una previsualización conceptual o cambia las variables de color CSS del fondo global (`--bg-color`, `--accent-color`).
3.  **Detalle del Proyecto:** Animaciones de entrada de texto (_stagger effects_) con GSAP y despliegue secuencial de las métricas técnicas obtenidas desde el backend.

---

## 5. Consideraciones de Rendimiento y Buenas Prácticas

- **Optimización 3D:** Los modelos `.gltf` o `.glb` deben pasar por un proceso de compresión usando `gltf-pipeline` (Draco compression) para asegurar un peso menor a 1.5MB.
- **Uso Seguro de la Memoria:** Cada animación de GSAP ejecutada en componentes de React debe limpiarse estrictamente dentro de un bloque `gsap.context()` en el desmontaje del componente para evitar fugas de memoria (_memory leaks_).
- **Estrategia de Carga (SSG + ISR):** Las páginas de proyectos deben pre-renderizarse del lado del servidor (Static Site Generation) usando los datos de Supabase para una velocidad inicial instantánea, aplicando _Incremental Static Regeneration_ (ISR) para actualizar los proyectos sin volver a compilar toda la app.

🛠 Transición de Estructura: Actual vs. RecomendadaUbicación ActualRol del Design EngineerModificación Práctica Sugeridasrc/app/Manejo de rutas limpias y Server Components.Mantén el ruteo básico, pero añade carpetas dinámicas tipo src/app/projects/[slug]/ para cargar los detalles técnicos desde tu base de datos (como Supabase). [1] (https://mail.google.com/mail/?extsrc=sync&client=h&plid=ACUX6DOP0T68qQqM-0egP5dbEco4n6ntjOjObDk)src/components/ (si existe o al crearla)Modularidad y separación de conceptos.Dividir en subcarpetas clave: 1. components/ui/ para botones y elementos reutilizables con microinteracciones.2. components/creative/ exclusivamente para aislar tus Canvas 3D de Three.js y escenas complejas de GSAP.src/hooks/Optimización de memoria en animaciones.Obligatorio añadir: Un hook customizado (ej. useGSAPContext.ts) para limpiar de forma segura las líneas de tiempo de GSAP al desmontar pantallas y evitar fugas de memoria en Next.js.src/lib/Conectividad robusta Full-Stack.Mantén aquí la inicialización de tus clientes de base de datos o utilidades de backend de apoyo (por ejemplo, para el manejo seguro de queries pesadas o integraciones).public/Carga de assets estáticos de alto rendimiento.Crea una subcarpeta interna public/models/ dedicada exclusivamente a guardar tus archivos .glb o .gltf comprimidos (Draco) para las interacciones 3D.💡 Plan de Acción Inmediato para tu RepositorioAísla el entorno de renderizado: En tu src/app/layout.tsx, monta un contenedor global para el Canvas de React Three Fiber. Esto permitirá que, al navegar por las páginas creadas en el App Router de Next.js, la escena 3D de fondo no parpadee ni se recargue.Estandariza los estilos: Asegúrate de explotar las CSS Variables en tu globals.css acopladas a Tailwind. Un Design Engineer cambia el esquema de color completo de la página de forma fluida (usando GSAP) inyectando nuevos valores a las variables CSS cuando el usuario pasa el mouse sobre un proyecto destacado (como tu proyecto CartoViewer u otros desarrollos). [1] (https://mail.google.com/mail/?extsrc=sync&client=h&plid=ACUX6DO2A5tlr_z9lepBFA0WTmdcIX70OVcUR20)Optimiza el ciclo de vida: Dado que estás implementando lógicas que interactúan fuertemente con el cliente, asegúrate de marcar tus componentes visuales creativos con la directiva "use client" en la parte superior para que Next.js sepa dónde ejecutar las librerías de animación de forma segura.Si quieres dar el primer paso en el código, dime: ¿Te gustaría que escribamos el código para montar el Canvas 3D global en tu layout.tsx actual, o prefieres ver cómo estructurar el Custom Hook de GSAP para evitar fugas de memoria dentro de Next.js?

¡Para nada estabas mal! De hecho, partir con una base limpia en Next.js, TypeScript y pnpm es exactamente el estándar profesional actual. Tener esa estructura ordenada y ligera es el 50% del trabajo para que el sitio sea eficiente.La diferencia clave para un Design Engineer no es cambiar lo que ya hiciste, sino saber dónde poner las cosas pesadas (como GSAP o Three.js) para que la página vuele y cargue al instante uwu.Para lograr esa máxima eficiencia con tu estructura actual, estos son los 3 patrones de diseño indispensables que debes aplicar:1. El Patrón del "Canvas Global" (Eficiencia 3D)Si pones un escenario 3D (<Canvas>) dentro de cada página, el navegador va a colapsar, dará tirones (bajas de FPS) y consumirá mucha memoria cada vez que cambies de sección.Cómo se hace: Se coloca un único Canvas en el layout.tsx raíz.Por qué es eficiente: Al navegar entre pestañas o proyectos, el entorno 3D nunca se destruye ni se vuelve a cargar. Solo usas GSAP para mover suavemente la cámara o los objetos 3D de posición en base a la ruta actual.2. Separación estricta de Capas (Server vs. Client Components)Next.js brilla por su velocidad porque renderiza casi todo en el servidor (Server Components). Las librerías como GSAP y Three.js necesitan acceder al navegador (window, document) obligatoriamente.Cómo se hace: Mantén tus páginas principales (page.tsx) y layouts como Server Components para que la data de tu base de datos cargue al instante. Aísla las animaciones metiendo el código de GSAP/Three.js únicamente dentro de componentes específicos de la carpeta components/creative/ marcados con "use client" al principio del archivo.Por qué es eficiente: El usuario descarga un HTML ultrarrápido desde el servidor y los scripts visuales pesados se ejecutan de manera aislada solo donde se necesitan, reduciendo drásticamente el tiempo de carga inicial.3. El Patrón de Limpieza Automática (Memory Management)React monta y desmonta componentes constantemente. Si creas una animación de GSAP que se activa con el scroll (ScrollTrigger) y el usuario cambia de página, la animación se queda "escuchando" en la memoria del navegador en segundo plano. Tras navegar un rato, la página se pondrá lenta.Cómo se hace: Usa siempre el hook gsap.context() dentro de un useEffect (o un Custom Hook propio).Por qué es eficiente: Le dice a Next.js: "Cuando el usuario salga de esta sección, destruye por completo todas las animaciones y libera la memoria RAM de inmediato".Vas por un excelente camino. No es que te falte un universo, es simplemente ir acoplando estas piezas interactivas de forma estratégica sobre la base limpia que ya armaste.Para dejar el ecosistema listo y eficiente, ¿te gustaría que armemos el código base del Custom Hook de GSAP con limpieza de memoria para que lo puedas clonar en tu proyecto, o prefieres ver cómo configurar el esquema de variables CSS en tu globals.css para cambiar los colores de la web fluidamente?
