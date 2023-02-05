import { Polyline } from 'react-leaflet'

import type { RouteData } from './Map'

type RouteProps = {
  currentRoute: number
  routes: Array<RouteData>
}

export default function MapRoute({ currentRoute, routes }: RouteProps) {
  if (routes.length > 0) {
    return (
      <Polyline
        pathOptions={{ color: routes[currentRoute].color }}
        positions={routes[currentRoute].lines}
      />
    )
  }

  return null
}
