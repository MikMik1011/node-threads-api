import got from 'got';
import { BaseResource } from './base.js';
import {
    GetProfileParams,
    ProfileResponse,
    ErrorResponse,
    ThreadData,
    GetMediaParams,
} from './types.js';

export class Post extends BaseResource {
    constructor() {
        super();
    }

    /**
     * Retrieve profile information about a user on Threads.
     * @param params
     * @returns
     */
    public getMediaData = async (params: GetMediaParams): Promise<ThreadData> => {
        const { accessToken, id, fields } = params;

        const getUserDetailsUrl = this.buildGraphApiUrl(
            id,
            {
                fields: fields.join(','),
            },
            accessToken
        );

        const response = await got.get(getUserDetailsUrl, { responseType: 'json', throwHttpErrors: false });

        if (response.statusCode === 200) {
            return response.body as ThreadData;
        } else {
            throw new Error((response.body as ErrorResponse).error.message);
        }
    };
}
