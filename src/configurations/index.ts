import {ServiceAccount} from "firebase-admin";
import * as nconf from "nconf";
import * as path from "path";
import {Dialect} from "sequelize";

// Read Configurations
const configs = new nconf.Provider({
    argv: true,
    env: true,
    store: {
        file: getPath(),
        type: "file",
    },
});

export function getPath(): string {
    return path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`);
}

export interface IServerConfigurations {
    port: number;
    plugins: Array<string>;
    routePrefix: string;
    firebase: ServiceAccount;
    pathFiles: string;
}

export interface IFirebaseConfig {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
}


export interface IDataConfiguration {
    mode: string;
    connection: {
        host: string;
        user: string;
        password: string;
        database: string;
        dialect: Dialect;
    };
}

export interface IEmailConfiguration{
    sender: string;
    api_key: string;
    dirIMG: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    return configs.get("database");
}

export function getEmailConfig(): IEmailConfiguration {
    return configs.get("email");
}

export function getServerConfigs(): IServerConfigurations {
    return configs.get("server");
}

