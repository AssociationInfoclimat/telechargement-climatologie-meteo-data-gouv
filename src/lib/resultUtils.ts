export interface Ok<T> {
    ok: true;
    data: T;
}

export interface Ko<E extends Error = Error> {
    ok: false;
    error: E;
}

export function ok<T>(data: T): Ok<T> {
    return { ok: true, data };
}

export function ko<E extends Error = Error>(error: E): Ko<E> {
    return { ok: false, error };
}

export type Result<T, E extends Error = Error> = Ok<T> | Ko<E>;
