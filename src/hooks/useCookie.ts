import type { CookieSerializeOptions, CookieParseOptions } from 'cookie-es';
import destr from 'destr';
import { parse, serialize } from 'cookie-es';
import { ref, watch, type Ref } from 'vue';

type CookieRef<T> = Ref<T>;

type _CookieOptions = Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'>;

interface CookieOptions<T = any> extends _CookieOptions {
	decode?(value: string): T;
	encode?(value: T): string;
	default?: () => T | import('vue').Ref<T>;
}

const CookieDefaults: CookieOptions<any> = {
	path: '/',
	decode: (val) => destr(decodeURIComponent(val)),
	encode: (val) => encodeURIComponent(typeof val === 'string' ? val : JSON.stringify(val)),
};

export function useCookie<T = string | null>(name: string, _opts?: CookieOptions<T>): CookieRef<T> {
	const opts = {
		...CookieDefaults,
		..._opts,
	};
	const cookies = readRawCookies(opts) || {};

	const cookie = ref<T | undefined>((cookies[name] as any) ?? opts.default?.());

	watch(cookie, () => {
		writeClientCookie(name, cookie.value, opts as CookieSerializeOptions);
	});

	return cookie as CookieRef<T>;
}

function readRawCookies(opts: CookieOptions = {}): Record<string, string> | undefined {
	return parse(document.cookie, opts);
}

function writeClientCookie(name: string, value: any, opts: CookieSerializeOptions = {}) {
	document.cookie = serializeCookie(name, value, opts);
}

function serializeCookie(name: string, value: any, opts: CookieSerializeOptions = {}) {
	if (value === null || value === undefined) {
		return serialize(name, value, {
			...opts,
			maxAge: -1,
		});
	}

	return serialize(name, value, opts);
}
