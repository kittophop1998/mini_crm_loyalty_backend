import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface AppConfig {
    port: number;
    nodeEnv: string;
    cors: {
        origin: string;
        credentials: boolean;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
    jwt: {
        secret: string;
        expiresIn: `${number}${'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'}`;
    };
    database: {
        url: string;
    };
    redis: {
        url: string;
        port: number;
        password?: string;
    };
}

class ConfigLoader {
    private static instance: AppConfig;

    public static load(): AppConfig {
        if (!ConfigLoader.instance) {
            ConfigLoader.instance = ConfigLoader.createConfig();
        }
        return ConfigLoader.instance;
    }

    private static createConfig(): AppConfig {
        const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'REDIS_HOST'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missingVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
        }

        return {
            port: Number(process.env.PORT) || 3000,
            nodeEnv: process.env.NODE_ENV || 'development',
            cors: {
                origin: process.env.CORS_ORIGIN || '*',
                credentials: true,
            },
            rateLimit: {
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: Number(process.env.RATE_LIMIT_MAX) || 100,
            },
            jwt: {
                secret: process.env.JWT_SECRET as string,
                expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as `${number}${'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'}`,
            },
            database: {
                url: process.env.DATABASE_URL!,
            },
            redis: {
                url: process.env.REDIS_HOST!,
                port: Number(process.env.REDIS_PORT) || 6379,
                password: process.env.REDIS_PASSWORD || undefined,
            },
        };
    }
}

export const config = ConfigLoader.load();