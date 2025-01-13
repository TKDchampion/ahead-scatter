# Scatter Plot Visualization Project

## Demo Link & Expected Result Image

Demo Link: [Scatter Plot Demo](https://ahead-scatter.vercel.app)

Expected Result:
<img src="https://ahead-scatter.vercel.app/result.png" alt="Example Image" style="width:50%;">

## Project Structure

### `app`

- **`page.tsx`**: Main entry point for the scatter plot page, rendering the scatter plot components and logic.

### `components/ScatterPlot`

- **`index.tsx`**: Entry point for exporting scatter plot-related components.
- **`ScatterPlot.tsx`**: Main component for rendering the scatter plot, integrating D3.js for visualizing data points.
- **`ScatterPlotCanvas.tsx`**: Manages canvas-based rendering for large datasets.
- **`PolygonControls.tsx`**: Provides controls for managing polygon-based interactions within the scatter plot.
- **`model.ts`**: Defines data models and types used in scatter plot components.

### `contexts`

- **`ScatterPlotContext.tsx`**: Implements a React Context for managing global scatter plot states and settings.
- **`model.tsx`**: Defines context-related types and models for state management.

### `hooks/scatterPlotHook`

- **`useFilteredData.tsx`**: Custom hook for filtering scatter plot data based on user interactions or conditions.
- **`useMouseMoveEvents.tsx`**: Handles mouse-related events, mouse moving on scatter plot points.
- **`useScatterPlotActions.tsx`**: Provides actions for managing scatter plot state and interactions.
- **`useScatterPlotEffects.tsx`**: Manages side effects related to scatter plot interactions.

### `utils/scatterPlotUtils`

- **`scatterPlot.ts`**: Utility functions for managing scatter plot rendering and data transformations.
- **`polygonDraw.ts`**: Provides helper functions for drawing and manipulating polygons within the scatter plot.

### `public`

- **`CD45_pos.csv`**: Data in assets

## Installation and Usage

### Environment file

- Add host in .env
  ```bash
  NEXT_PUBLIC_HOST=https://ahead-scatter.vercel.app
  ```

### Using Local

- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

### Using Docker

- Start the container:
  ```bash
  docker compose up
  ```
