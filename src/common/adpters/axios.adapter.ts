import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AxiosAdapter implements HttpAdapter{


    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string, options?: any): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url, options);
            return data;
        } catch (error) {
            throw new Error(`Error in GET request: ${error}`);
        }
    }
    post<T>(url: string, body?: any, options?: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    put<T>(url: string, body?: any, options?: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete<T>(url: string, options?: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    patch<T>(url: string, body?: any, options?: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    head<T>(url: string, options?: any): Promise<T> {
        throw new Error("Method not implemented.");
    }

}