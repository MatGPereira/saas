import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'staging', 'production']).default('local'),
  PRIVATE_RSA_KEY: z.string(),
  PUBLIC_RSA_KEY: z.string(),
  EMAIL_USERNAME: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number().default(25),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error('Invalid environment variables!');
  throw new Error('Invalid environment variables!');
}

let env = _env.data;

env = {
  ...env,
  PRIVATE_RSA_KEY: env.PRIVATE_RSA_KEY.replace(/\\n/g, '\n'),
  PUBLIC_RSA_KEY: env.PUBLIC_RSA_KEY.replace(/\\n/g, '\n'),
};

export { env };
