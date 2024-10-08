export type AuthScopes =
    | 'threads_basic'
    | 'threads_content_publish'
    | 'threads_manage_insights'
    | 'threads_manage_replies'
    | 'threads_read_replies';

export interface AuthParams {
    clientId: string;
    redirectUri: string;
    scopes: AuthScopes[];
    state?: string;
}

export interface TokenParams {
    clientId: string;
    clientSecret: string;
    code: string;
    redirectUri: string;
}

export interface TokenResponse {
    access_token: string;
    user_id: string;
}

export interface ErrorResponse {
    error: {
        message: string;
        type: string;
        code: number;
        error_subcode: number;
        fbtrace_id: string;
    };
}

export interface GetProfileParams {
    accessToken: string;
    username: string;
    fields: ProfileFields[];
}

export interface GetMediaParams {
    accessToken: string;
    id: string;
    fields: ThreadsFields[];
}

export interface ProfileResponse {
    id: string;
    username: string;
    threads_profile_picture_url: string;
    threads_biography: string;
}

enum ProfileFieldsEnum {
    ID = 'id',
    NAME = 'name',
    USERNAME = 'username',
    BIOGRAPHY = 'threads_biography',
    PROFILE_PICTURE = 'threads_profile_picture_url',
}
// values of ProfileFieldsEnum
export type ProfileFields = `${ProfileFieldsEnum}`;

export type MetricTypes = 'likes' | 'replies' | 'reposts' | 'quotes';

export type AccountMetricTypes = MetricTypes | 'followers_count' | 'follower_demographics';

export interface GetUserInsightsParams {
    accessToken: string;
    userId: string;
    metric: string;
    since?: string;
    until?: string;
    breakdown?: 'country' | 'city' | 'age' | 'gender';
}

export interface UserInsightsResponse {
    data: (UserTimeSeriesMetricData | UserTotalValueMetricData)[];
}

export interface UserTimeSeriesMetricData {
    name: 'views';
    period: string;
    values: {
        value: number;
        end_time: string;
    }[];
    title: string;
    description: string;
    id: string;
}

export interface UserTotalValueMetricData {
    name: AccountMetricTypes;
    total_value: {
        value: number;
    };
    title: string;
    description: string;
    id: string;
}

export interface GetMediaInsightsParams {
    accessToken: string;
    mediaId: string;
    metric: MetricTypes;
}

export interface MediaInsightsResponse {
    data: MediaMetricData[];
}

export interface MediaMetricData {
    name: MetricTypes;
    period: string;
    values: {
        value: number;
    }[];
    title: string;
    description: string;
    id: string;
}

enum ThreadsFieldsEnum {
    ID = 'id',
    MEDIA_PRODUCT_TYPE = 'media_product_type',
    MEDIA_TYPE = 'media_type',
    MEDIA_URL = 'media_url',
    PERMALINK = 'permalink',
    OWNER = 'owner',
    USERNAME = 'username',
    TEXT = 'text',
    TIMESTAMP = 'timestamp',
    SHORTCODE = 'shortcode',
    THUMBNAIL_URL = 'thumbnail_url',
    CHILDREN = 'children',
    IS_QUOTE_POST = 'is_quote_post',
    HAS_REPLIES = 'has_replies',
    REPLY_AUDIENCE = 'reply_audience',
}

export type ThreadsFields = `${ThreadsFieldsEnum}`;

export interface GetThreadsParams {
    accessToken: string;
    threadsUserId: string;
    fields?: string[];
    since?: number | string;
    until?: number | string;
    limit?: number;
    before?: string;
    after?: string;
}

export interface ThreadData {
    id: string;
    media_product_type: string;
    media_type: 'TEXT_POST' | 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'AUDIO' | 'REPOST_FACADE';
    media_url?: string;
    permalink?: string;
    owner: string;
    username: string;
    text?: string;
    timestamp: string;
    shortcode: string;
    thumbnail_url?: string;
    children?: ThreadData[];
    is_quote_post?: boolean;
}

export interface UserThreadsResponse {
    data: ThreadData[];
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
}

export interface ReplyData {
    id: string;
    media_product_type: string;
    media_type: 'TEXT_POST' | 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'AUDIO';
    media_url?: string;
    permalink?: string;
    username: string;
    text?: string;
    timestamp: string;
    shortcode: string;
    thumbnail_url?: string;
    children?: ReplyData[];
    is_quote_post?: boolean;
    has_replies: boolean;
    root_post?: { id: string };
    replied_to?: { id: string };
    is_reply: boolean;
    is_reply_owned_by_me?: boolean;
    reply_audience?: 'EVERYONE' | 'ACCOUNTS_YOU_FOLLOW' | 'MENTIONED_ONLY';
}

export interface UserRepliesResponse {
    data: ReplyData[];
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
}

export interface GetPublishingLimitParams {
    accessToken: string;
    threadsUserId: string;
    fields?: string[];
}

export interface PublishingLimitData {
    quota_usage?: number;
    config?: {
        quota_total: number;
        quota_duration: number;
    };
    reply_quota_usage?: number;
    reply_config?: {
        quota_total: number;
        quota_duration: number;
    };
}

export interface PublishingLimitResponse {
    data: PublishingLimitData[];
}
