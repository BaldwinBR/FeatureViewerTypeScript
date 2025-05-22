# FeatureViewerTypeScript

This project is the DescribePROT fork of the FeatureViewerTypeScript library.

A Library designed to visualize protein sequence features in Typescript using D3. This repository is based on calipho-sib/feature-viewer.

Their documentation is available at: http://protein.bio.unipd.it/feature-viewer

## Changes Made in This Fork

### Major Changes

- **Line Graph Support**
  - Supports multiple data series per graph
  - Allows multi-colored line segments    
  - Handles discontinuous data via `-1` value skipping

- **Sidebar Elements**
  - Transitioned to be a vertical legend layout
  - Adds scroll support for overflowing legend content
  - Toggle functionality for certain feature types using sidebar buttons

- **PTM Feature Type**
  - New triangle-based feature type for PTM data
 
### Minor Changes

- Removed fill under line graphs
- Line graph Y-scale fixed to `[0, 1]`
- Dynamic xAxis scaling
- xAxis duplicated to top of graphs
- yAxis added to curve features
- Curve lines switched from `d3.curveBasis` to `d3.curveMonotoneX`
  - Avoids data interpolation while preserving smoothness 
- Additional tooltip support via `FeatureData.title` and `FeatureData.type`


## How to Run

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application
