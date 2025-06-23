declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_VERSION: string

  readonly VITE_API_BASE_URL: string
  readonly VITE_API_GET_ALL_BOOTH: string
  readonly VITE_REGISTRATION_EVENT_STT_API: string
  readonly VITE_SPIN_WHEEL_API: string
  readonly VITE_SPIN_WHEEL_SUBMIT_WINNER_API: string
  readonly VITE_EVENT_STT_PRESENCE_API: string
  readonly VITE_CHECK_IN_BOOTH_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}