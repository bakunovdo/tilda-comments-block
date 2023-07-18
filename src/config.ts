export const APP_CONFIG = {
  STYLE_PREFIX: '__commentsplugin__',
  CONTAINER_ID: 'comments-block',
};

export const __IS_DEV__ = import.meta.env.DEV;
export const __IS_PROD__ = import.meta.env.PROD;

export const clxName = (name: string) => APP_CONFIG.STYLE_PREFIX + name;
