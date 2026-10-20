import * as migration_20261020_171524_add_vercel_blob_storage_fields from './20261020_171524_add_vercel_blob_storage_fields';

export const migrations = [
  {
    up: migration_20261020_171524_add_vercel_blob_storage_fields.up,
    down: migration_20261020_171524_add_vercel_blob_storage_fields.down,
    name: '20261020_171524_add_vercel_blob_storage_fields'
  },
];
