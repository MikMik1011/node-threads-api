import got from 'got';
import { BaseResource } from './base.js';
import {
    GetProfileParams,
    ProfileResponse,
    ErrorResponse,
    GetPublishingLimitParams,
    GetThreadsParams,
    PublishingLimitResponse,
    UserThreadsResponse,
    UserRepliesResponse,
} from './types';

export class User extends BaseResource {
    constructor() {
        super();
    }

    /**
     * Retrieve profile information about a user on Threads.
     * @param params
     * @returns
     */
    public getUserProfile = async (params: GetProfileParams): Promise<ProfileResponse> => {
        const { accessToken, username, fields } = params;

        const getUserDetailsUrl = this.buildGraphApiUrl(
            username,
            {
                fields: fields.join(','),
            },
            accessToken
        );

        const response = await got.get(getUserDetailsUrl, { responseType: 'json', throwHttpErrors: false });

        if (response.statusCode === 200) {
            return response.body as ProfileResponse;
        } else {
            throw new Error((response.body as ErrorResponse).error.message);
        }
    };

    /**
     * Retrieve a paginated list of all Threads posts created by a user.
     * @param params
     * @returns
     */
    public getUserThreads = async (params: GetThreadsParams): Promise<UserThreadsResponse> => {
        const { accessToken, threadsUserId, fields, since, until, limit, before, after } = params;

        const queryParams = {
            access_token: accessToken,
            ...(fields ? { fields: fields.join(',') } : {}),
            ...(since ? { since: since.toString() } : {}),
            ...(until ? { until: until.toString() } : {}),
            ...(limit ? { limit: limit.toString() } : {}),
            ...(before ? { before } : {}),
            ...(after ? { after } : {}),
        };

        const getUserThreadsUrl = this.buildGraphApiUrl(`${threadsUserId}/threads`, queryParams);

        const response = await got.get(getUserThreadsUrl, { responseType: 'json', throwHttpErrors: false });

        if (response.statusCode === 200) {
            return response.body as UserThreadsResponse;
        } else {
            throw new Error((response.body as ErrorResponse).error.message);
        }
    };

    /**
     * Retrieve a paginated list of all Threads replies created by a user.
     * @param params
     * @returns
     */
    public getUserReplies = async (params: GetThreadsParams): Promise<UserRepliesResponse> => {
        const { accessToken, threadsUserId, fields, since, until, limit, before, after } = params;

        const queryParams = {
            access_token: accessToken,
            ...(fields ? { fields: fields.join(',') } : {}),
            ...(since ? { since: since.toString() } : {}),
            ...(until ? { until: until.toString() } : {}),
            ...(limit ? { limit: limit.toString() } : {}),
            ...(before ? { before } : {}),
            ...(after ? { after } : {}),
        };

        const getUserRepliesUrl = this.buildGraphApiUrl(`${threadsUserId}/replies`, queryParams);

        const response = await got.get(getUserRepliesUrl, { responseType: 'json', throwHttpErrors: false });

        if (response.statusCode === 200) {
            return response.body as UserRepliesResponse;
        } else {
            throw new Error((response.body as ErrorResponse).error.message);
        }
    };

    /**
     * Check the app user's current publishing rate limit usage.
     * @param params
     * @returns
     */
    public getUserPublishingLimit = async (params: GetPublishingLimitParams): Promise<PublishingLimitResponse> => {
        const { accessToken, threadsUserId, fields } = params;

        const queryParams = { access_token: accessToken, ...(fields ? { fields: fields.join(',') } : {}) };

        const getUserPublishingLimitUrl = this.buildGraphApiUrl(
            `${threadsUserId}/threads_publishing_limit`,
            queryParams
        );

        const response = await got.get(getUserPublishingLimitUrl, { responseType: 'json', throwHttpErrors: false });

        if (response.statusCode === 200) {
            return response.body as PublishingLimitResponse;
        } else {
            throw new Error((response.body as ErrorResponse).error.message);
        }
    };
}
