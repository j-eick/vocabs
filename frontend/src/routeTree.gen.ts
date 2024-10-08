/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AllVocabsImport } from './routes/allVocabs'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const AllVocabsRoute = AllVocabsImport.update({
  path: '/allVocabs',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/allVocabs': {
      id: '/allVocabs'
      path: '/allVocabs'
      fullPath: '/allVocabs'
      preLoaderRoute: typeof AllVocabsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/allVocabs': typeof AllVocabsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/allVocabs': typeof AllVocabsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/allVocabs': typeof AllVocabsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/allVocabs'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/allVocabs'
  id: '__root__' | '/' | '/allVocabs'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AllVocabsRoute: typeof AllVocabsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AllVocabsRoute: AllVocabsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/allVocabs"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/allVocabs": {
      "filePath": "allVocabs.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
